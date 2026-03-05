
import React, { useState, useEffect } from 'react';
import { api, getImageUrl } from '../api';

const AdPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [adData, setAdData] = useState<any>(null);

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const response = await api.get('/web-home/ads/popup/active');
                if (response.data && response.data.imageUrl) {
                    setAdData(response.data);

                    const hasSeenPopup = sessionStorage.getItem('hasSeenAdPopup');
                    if (!hasSeenPopup) {
                        // Show popup with a slight delay after page load
                        setTimeout(() => {
                            setIsVisible(true);
                        }, 1500);
                    }
                }
            } catch (error) {
                console.error("Popup reklamı alınamadı:", error);
            }
        };

        fetchAd();
    }, []);

    const closePopup = async () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenAdPopup', 'true');

        // Gösterim sayısını artır
        if (adData && adData.id) {
            try {
                await api.patch(`/web-home/ads/popup/${adData.id}/view`, {});
            } catch (error) {
                console.error("View count increment failed:", error);
            }
        }
    };

    const handleLinkClick = () => {
        if (adData.linkUrl) {
            let targetUrl = adData.linkUrl.trim();
            // Eğer protokol (http/https) yoksa başına ekle
            if (!/^https?:\/\//i.test(targetUrl)) {
                targetUrl = 'https://' + targetUrl;
            }
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
        }
        closePopup();
    };

    if (!isVisible || !adData) return null;

    return (
        <div className="ad-popup-overlay" onClick={closePopup}>
            <div className="ad-popup-container" onClick={(e) => e.stopPropagation()}>
                <button className="ad-popup-close" onClick={closePopup} aria-label="Kapat">
                    <i className="fas fa-times"></i>
                </button>
                <div className="ad-popup-content">
                    {adData.linkUrl ? (
                        <div className="cursor-pointer" onClick={handleLinkClick}>
                            <img
                                src={getImageUrl(adData.imageUrl)}
                                alt={adData.title || "Özel Teklif"}
                                className="ad-popup-image"
                            />
                        </div>
                    ) : (
                        <img
                            src={getImageUrl(adData.imageUrl)}
                            alt={adData.title || "Özel Teklif"}
                            className="ad-popup-image"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdPopup;
