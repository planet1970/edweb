
import React from 'react';

interface AdBannerProps {
    /** Reklam alanının yüksekliği (varsayılan: 90px) */
    height?: number;
    /** Reklam etiket metni (varsayılan: "Reklam Alanı") */
    label?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ height = 90, label = 'Reklam Alanı' }) => {
    return (
        <div className="ad-banner-section">
            <div className="container">
                <div className="ad-banner-wrapper" style={{ minHeight: `${height}px` }}>
                    <div className="ad-banner-inner">
                        <span className="ad-banner-tag">
                            <i className="fas fa-ad"></i>
                            {label}
                        </span>
                        <p className="ad-banner-desc">
                            970 × 90 — Yatay Banner (Leaderboard)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdBanner;
