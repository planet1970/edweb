
import React, { useEffect, useState } from 'react';
import { api } from '../api';
import type { WebSocialInfo } from '../types';

interface NavbarColors {
    bgColor?: string;
    iconColor?: string;
}

const SocialBar: React.FC = () => {
    const [info, setInfo] = useState<WebSocialInfo | null>(null);
    const [colors, setColors] = useState<NavbarColors | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [socialRes, navbarRes] = await Promise.all([
                    api.get('/web-home/social'),
                    api.get('/web-home/navbar')
                ]);
                setInfo(socialRes.data);
                setColors(navbarRes.data);
            } catch (error) {
                console.error('Data fetch failed', error);
            }
        };
        fetchData();
    }, []);

    if (!info) return null;

    return (
        <section className="social-bar" style={{ backgroundColor: colors?.bgColor || '#1A1A2E' }}>
            <div className="container">
                <div className="social-bar-content">
                    <div className="social-bar-left">
                        {info.phone && (
                            <div className="social-bar-item">
                                <i className="fas fa-phone-alt" style={{ color: colors?.iconColor || '#FFB627' }}></i>
                                <span>{info.phone}</span>
                            </div>
                        )}
                        {info.email && (
                            <div className="social-bar-item">
                                <i className="fas fa-envelope" style={{ color: colors?.iconColor || '#FFB627' }}></i>
                                <span>{info.email}</span>
                            </div>
                        )}
                        {info.address && (
                            <div className="social-bar-item">
                                <i className="fas fa-map-marker-alt" style={{ color: colors?.iconColor || '#FFB627' }}></i>
                                <span>{info.address}</span>
                            </div>
                        )}
                    </div>
                    <div className="social-bar-right">
                        <span className="social-bar-text">Bizi Takip Edin:</span>
                        <div className="social-bar-links">
                            {info.facebook && <a href={info.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>}
                            {info.instagram && <a href={info.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>}
                            {info.twitter && <a href={info.twitter} target="_blank" rel="noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>}
                            {info.youtube && <a href={info.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialBar;
