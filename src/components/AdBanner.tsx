import React from 'react';

const AdBanner: React.FC = () => {
    return (
        <div className="ad-banner-section">
            <div className="container">
                <div className="ad-wrapper">
                    {/* Sol Reklam Alanı */}
                    <div className="ad-box">
                        <div className="ad-box-inner ad-banner-wrapper">
                            <div className="ad-banner-inner">
                                <span className="ad-banner-tag">
                                    <i className="fas fa-ad"></i>
                                    Google Ads
                                </span>
                                <p className="ad-banner-desc">Responsive Ad Unit</p>
                            </div>
                        </div>
                    </div>

                    {/* Sağ Reklam Alanı */}
                    <div className="ad-box">
                        <div className="ad-box-inner ad-banner-wrapper">
                            <div className="ad-banner-inner">
                                <span className="ad-banner-tag">
                                    <i className="fas fa-ad"></i>
                                    Google Ads
                                </span>
                                <p className="ad-banner-desc">Responsive Ad Unit</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdBanner;
