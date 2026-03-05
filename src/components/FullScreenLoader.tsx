import React, { useEffect, useState } from 'react';
import { api, getImageUrl } from '../api';

const FullScreenLoader: React.FC = () => {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchNavbarData = async () => {
            try {
                const response = await api.get('/web-home/navbar');
                if (response.data?.logoUrl) {
                    setLogoUrl(getImageUrl(response.data.logoUrl));
                }
            } catch (error) {
                console.error("Loader logo fetch error:", error);
            }
        };
        fetchNavbarData();
    }, []);

    return (
        <div className="loader-overlay">
            {/* Ambient Background Glows */}
            <div className="loader-glow-1"></div>
            <div className="loader-glow-2"></div>

            {/* Stylized Background Watermark */}
            {logoUrl && (
                <div className="loader-bg-watermark">
                    <img src={logoUrl} alt="" />
                </div>
            )}

            <div className="loader-glass-container">
                {/* Large Prominent Central Logo */}
                {logoUrl && (
                    <div className="loader-hero-logo">
                        <img src={logoUrl} alt="Edirne Rehberi" />
                        <div className="logo-glimmer"></div>
                    </div>
                )}

                <div className="loader-status-wrapper">
                    {/* Minimalist Spinner */}
                    <div className="spinner-minimal">
                        <div className="spinner-inner"></div>
                    </div>

                    <div className="loader-text-block">
                        <h2 className="brand-title">EDİRNE REHBERİ</h2>
                        <div className="loading-meter">
                            <div className="meter-bar"></div>
                            <span className="meter-text">HAZIRLANIYOR</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .loader-overlay {
                    position: fixed;
                    inset: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #fcfcfd;
                    z-index: 99999;
                    overflow: hidden;
                    font-family: 'Poppins', sans-serif;
                }

                .loader-glow-1, .loader-glow-2 {
                    position: absolute;
                    width: 500px;
                    height: 500px;
                    border-radius: 50%;
                    filter: blur(100px);
                    z-index: 1;
                    opacity: 0.15;
                    animation: float-glow 20s ease-in-out infinite;
                }

                .loader-glow-1 {
                    top: -100px;
                    right: -100px;
                    background: var(--primary-color, #ff6b35);
                }

                .loader-glow-2 {
                    bottom: -100px;
                    left: -100px;
                    background: var(--secondary-color, #004e89);
                    animation-delay: -10s;
                }

                .loader-bg-watermark {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    opacity: 0.02;
                    filter: grayscale(1) invert(0.1);
                    z-index: 0;
                    pointer-events: none;
                }

                .loader-bg-watermark img {
                    width: 140%;
                    max-width: 1200px;
                    transform: rotate(-10deg);
                    animation: subtle-zoom 30s ease-in-out infinite;
                }

                .loader-glass-container {
                    position: relative;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 50px;
                    padding: 60px 80px;
                    background: rgba(255, 255, 255, 0.5);
                    backdrop-filter: blur(20px) saturate(1.8);
                    -webkit-backdrop-filter: blur(20px) saturate(1.8);
                    border-radius: 50px;
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    box-shadow: 
                        0 20px 60px rgba(0, 0, 0, 0.04),
                        inset 0 0 0 1px rgba(255, 255, 255, 0.2);
                }

                .loader-hero-logo {
                    position: relative;
                    width: 280px;
                    height: 140px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.06));
                    animation: hero-logo-float 4s ease-in-out infinite;
                }

                .loader-hero-logo img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                .logo-glimmer {
                    position: absolute;
                    top: 0;
                    left: -150%;
                    width: 60%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.6),
                        transparent
                    );
                    transform: skewX(-20deg);
                    animation: shimmer 4s infinite cubic-bezier(0.4, 0, 0.2, 1) 1s;
                }

                .loader-status-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 25px;
                }

                .spinner-minimal {
                    width: 32px;
                    height: 32px;
                    position: relative;
                }

                .spinner-inner {
                    width: 100%;
                    height: 100%;
                    border: 3px solid rgba(255, 107, 53, 0.1);
                    border-top-color: var(--primary-color, #ff6b35);
                    border-radius: 50%;
                    animation: spin-precise 0.8s linear infinite;
                }

                .loader-text-block {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .brand-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 22px;
                    font-weight: 800;
                    color: #1a1a2e;
                    letter-spacing: 1px;
                    margin: 0;
                }

                .loading-meter {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .meter-bar {
                    width: 100px;
                    height: 3px;
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 10px;
                    position: relative;
                    overflow: hidden;
                }

                .meter-bar::after {
                    content: '';
                    position: absolute;
                    left: -100%;
                    top: 0;
                    height: 100%;
                    width: 100%;
                    background: var(--primary-color, #ff6b35);
                    animation: meter-fill 2s ease-in-out infinite;
                }

                .meter-text {
                    font-size: 11px;
                    font-weight: 700;
                    color: var(--text-muted, #7f8c8d);
                    letter-spacing: 2px;
                    white-space: nowrap;
                }

                /* Animations */
                @keyframes spin-precise {
                    to { transform: rotate(360deg); }
                }

                @keyframes hero-logo-float {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-15px) scale(1.02); }
                }

                @keyframes float-glow {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-50px, 50px) scale(1.1); }
                }

                @keyframes shimmer {
                    from { left: -150%; }
                    to { left: 250%; }
                }

                @keyframes meter-fill {
                    0% { left: -100%; width: 0%; }
                    50% { left: 0%; width: 100%; }
                    100% { left: 100%; width: 0%; }
                }

                @keyframes subtle-zoom {
                    0%, 100% { transform: scale(1) rotate(-10deg); }
                    50% { transform: scale(1.1) rotate(-8deg); }
                }

                /* Mobile Adaptations */
                @media (max-width: 600px) {
                    .loader-glass-container {
                        padding: 40px 30px;
                        width: 85%;
                        border-radius: 30px;
                    }
                    .loader-hero-logo {
                        width: 200px;
                        height: 100px;
                    }
                    .brand-title {
                        font-size: 18px;
                    }
                }

                /* Dark Theme */
                [data-theme="dark"] .loader-overlay {
                    background-color: #0d0d0f;
                }
                [data-theme="dark"] .loader-glass-container {
                    background: rgba(25, 25, 30, 0.6);
                    border-color: rgba(255, 255, 255, 0.05);
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
                }
                [data-theme="dark"] .brand-title {
                    color: #ffffff;
                }
                [data-theme="dark"] .loader-bg-watermark {
                    opacity: 0.03;
                    filter: invert(1) brightness(0.5);
                }
                [data-theme="dark"] .meter-bar {
                    background: rgba(255, 255, 255, 0.05);
                }
            `}</style>
        </div>
    );
};

export default FullScreenLoader;
