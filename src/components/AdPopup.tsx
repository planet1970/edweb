
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
                    const ad = response.data;
                    const idPrefix = ad.isDefault ? 'def_' : '';
                    const adId = ad.id;

                    setAdData(ad);

                    const hasSeenPopupSession = sessionStorage.getItem(`hasSeenAdPopup_${idPrefix}${adId}`);
                    const lastSeenDay = localStorage.getItem(`lastSeenAdPopup_${idPrefix}${adId}`);
                    const lastSeenHour = localStorage.getItem(`lastSeenAdPopup_hour_${idPrefix}${adId}`);
                    const today = new Date().toDateString();
                    const now = new Date().getTime();

                    let shouldShow = false;

                    // Stratejiye göre kontrol et
                    if (ad.displayStrategy === 'ONCE_PER_SESSION') {
                        shouldShow = !hasSeenPopupSession;
                    } else if (ad.displayStrategy === 'ONCE_PER_HOUR') {
                        if (!lastSeenHour) {
                            shouldShow = true;
                        } else {
                            const lastTime = parseInt(lastSeenHour, 10);
                            const oneHour = 60 * 60 * 1000;
                            shouldShow = (now - lastTime) > oneHour;
                        }
                    } else if (ad.displayStrategy === 'ONCE_PER_DAY') {
                        shouldShow = lastSeenDay !== today;
                    } else {
                        // Varsayılan: Saatte bir
                        if (!lastSeenHour) {
                            shouldShow = true;
                        } else {
                            const lastTime = parseInt(lastSeenHour, 10);
                            const oneHour = 60 * 60 * 1000;
                            shouldShow = (now - lastTime) > oneHour;
                        }
                    }

                    if (shouldShow) {
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
        if (adData) {
            const idPrefix = adData.isDefault ? 'def_' : '';
            sessionStorage.setItem(`hasSeenAdPopup_${idPrefix}${adData.id}`, 'true');

            // Günlük gösterim takibi için local storage'a kaydet
            localStorage.setItem(`lastSeenAdPopup_${idPrefix}${adData.id}`, new Date().toDateString());
            localStorage.setItem(`lastSeenAdPopup_hour_${idPrefix}${adData.id}`, new Date().getTime().toString());

            try {
                // Default popup'ın kendine has bir increment endpoint'i yoksa GENEL bi yer yapabiliriz 
                // ya da backend'de tek endpoint yapabiliriz. Şu an backend'de Default için viewCount var ama endpoint eklemedim galiba.
                if (!adData.isDefault) {
                    await api.patch(`/web-home/ads/popup/${adData.id}/view`, {});
                } else {
                    // Default view count endpoint?
                    // await api.patch(`/web-home/ads/popup-default/view`, {});
                }
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
