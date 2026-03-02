import React, { useEffect, useState } from 'react';
import { api, getImageUrl } from '../api';

const AdBanner: React.FC = () => {
    const [ads, setAds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await api.get<any[]>('/web-home/ads/google');
                setAds(Array.isArray(response.data) ? response.data.filter(a => a.isActive) : []);
            } catch (error) {
                console.error("Reklamlar yüklenemedi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAds();
    }, []);

    if (loading || ads.length === 0) return null;

    const leftAd = ads.find(a => a.areaName === 'HOME_LEFT');
    const rightAd = ads.find(a => a.areaName === 'HOME_RIGHT');

    if (!leftAd && !rightAd) return null;

    const renderAd = (ad: any) => {
        if (!ad) return null;

        if (ad.type === 'SCRIPT') {
            return (
                <div
                    className="ad-content-wrapper"
                    dangerouslySetInnerHTML={{ __html: ad.scriptCode || '' }}
                />
            );
        } else if (ad.type === 'IMAGE') {
            return (
                <a href={ad.linkUrl || '#'} target="_blank" rel="noopener noreferrer" className="ad-image-link">
                    <img src={getImageUrl(ad.imageUrl)} alt="Advertisement" className="ad-banner-img" />
                </a>
            );
        }
        return null;
    };

    return (
        <div className="ad-banner-section">
            <div className="container">
                <div className="ad-wrapper">
                    {/* Sol Reklam Alanı */}
                    <div className="ad-box">
                        <div className="ad-box-inner ad-banner-wrapper">
                            {leftAd ? (
                                renderAd(leftAd)
                            ) : (
                                <div className="ad-banner-inner">
                                    <span className="ad-banner-tag">
                                        <i className="fas fa-ad"></i>
                                        Google Ads
                                    </span>
                                    <p className="ad-banner-desc">Sponsorlu Alan</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sağ Reklam Alanı */}
                    <div className="ad-box">
                        <div className="ad-box-inner ad-banner-wrapper">
                            {rightAd ? (
                                renderAd(rightAd)
                            ) : (
                                <div className="ad-banner-inner">
                                    <span className="ad-banner-tag">
                                        <i className="fas fa-ad"></i>
                                        Google Ads
                                    </span>
                                    <p className="ad-banner-desc">Sponsorlu Alan</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdBanner;
