
import React, { useState, useEffect } from 'react';

const AdPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show popup with a slight delay after page load
        const timer = setTimeout(() => {
            const hasSeenPopup = sessionStorage.getItem('hasSeenAdPopup');
            if (!hasSeenPopup) {
                setIsVisible(true);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const closePopup = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenAdPopup', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="ad-popup-overlay" onClick={closePopup}>
            <div className="ad-popup-container" onClick={(e) => e.stopPropagation()}>
                <button className="ad-popup-close" onClick={closePopup} aria-label="Kapat">
                    <i className="fas fa-times"></i>
                </button>
                <div className="ad-popup-content">
                    <a href="/" onClick={closePopup}>
                        <img
                            src="/images/ads/special-offer.png"
                            alt="Edirne Ramazan Çarşısı"
                            className="ad-popup-image"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdPopup;
