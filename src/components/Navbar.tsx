import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api, getImageUrl } from '../api';

import WeatherWidget from './WeatherWidget';

interface NavbarData {
    logoUrl?: string;
    title?: string;
    titleColor?: string;
    fontFamily?: string;
    fontSize?: number;
    bgColor?: string;
    iconColor?: string;
}

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [navbarData, setNavbarData] = useState<NavbarData | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetchNavbarData = async () => {
            try {
                const response = await api.get('/web-home/navbar');
                setNavbarData(response.data);
            } catch (error) {
                console.error("Navbar data fetch error:", error);
            }
        };
        fetchNavbarData();
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <header
            className={`header ${scrolled ? 'scrolled' : ''}`}
            id="header"
            style={{
                backgroundColor: !scrolled && navbarData?.bgColor ? navbarData.bgColor : undefined
            }}
        >
            <nav className="navbar">
                <div className="container">
                    <div className="nav-wrapper">
                        <Link to="/" className="logo">
                            {navbarData?.logoUrl ? (
                                <img src={getImageUrl(navbarData.logoUrl)} alt="Logo" style={{ height: '40px', width: 'auto' }} />
                            ) : (
                                <i className="fas fa-landmark" style={{ color: !scrolled ? navbarData?.iconColor : undefined }}></i>
                            )}
                            <span
                                style={{
                                    color: navbarData?.titleColor ?? (!scrolled ? '#ffffff' : undefined),
                                    fontFamily: navbarData?.fontFamily ?? undefined,
                                    fontSize: navbarData?.fontSize ? `${navbarData.fontSize}px` : undefined,
                                    fontWeight: 'bold'
                                }}
                            >
                                {navbarData?.title || 'Edirne Rehberi'}
                            </span>
                        </Link>

                        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="navMenu">
                            <button className="close-menu" onClick={() => setIsMenuOpen(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                            <li><Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Ana Sayfa</Link></li>
                            <li><a href="/#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>Edirne</a></li>
                            <li><a href="/#categories" className="nav-link" onClick={() => setIsMenuOpen(false)}>Kategoriler</a></li>
                            <li><a href="/#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>İletişim</a></li>
                        </ul>

                        <div className="nav-actions">
                            <WeatherWidget />
                            <button
                                id="themeToggle"
                                className="theme-toggle"
                                title="Koyu/Açık Mod"
                                onClick={toggleTheme}
                            >
                                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                            </button>
                            <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
