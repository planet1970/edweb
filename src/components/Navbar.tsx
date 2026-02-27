import React, { useEffect, useState, useRef } from 'react';
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

import { visitorService } from '../visitorService';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [navbarData, setNavbarData] = useState<NavbarData | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [visitorName, setVisitorName] = useState<string | null>(null);
    const [fullName, setFullName] = useState<string | null>(null);
    const [visitorEmail, setVisitorEmail] = useState<string | null>(null);
    const [userImage, setUserImage] = useState<string | null>(null);
    const location = useLocation();
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Get visitor name and image
        setVisitorName(visitorService.getUsername());
        setFullName(visitorService.getFullName());
        setVisitorEmail(visitorService.getEmail());
        setUserImage(visitorService.getUserImage());

        const fetchNavbarData = async () => {
            try {
                const response = await api.get('/web-home/navbar');
                setNavbarData(response.data);
            } catch (error) {
                console.error("Navbar data fetch error:", error);
            }
        };
        fetchNavbarData();

        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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

                            {visitorName && (
                                <div className="user-dropdown" ref={userMenuRef}>
                                    <div className="visitor-tag" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                                        <div className="visitor-image-wrapper">
                                            {userImage ? (
                                                <img
                                                    src={getImageUrl(userImage)}
                                                    alt="User"
                                                    className="navbar-profile-img"
                                                />
                                            ) : (
                                                <i className="fas fa-user-circle"></i>
                                            )}
                                        </div>
                                        <span>{visitorName}</span>
                                        <i className={`fas fa-chevron-down ${isUserMenuOpen ? 'fa-rotate-180' : ''}`} style={{ fontSize: '10px', marginLeft: '2px', transition: 'transform 0.3s' }}></i>
                                    </div>

                                    <div className={`dropdown-menu ${isUserMenuOpen ? 'active' : ''}`}>
                                        <div className="dropdown-header">
                                            <div className="dropdown-user-info">{fullName || 'Ziyaretçi'}</div>
                                            {visitorEmail && <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{visitorEmail}</div>}
                                        </div>
                                        <Link to="/profile" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                                            <i className="fas fa-user-cog"></i> Profilim
                                        </Link>
                                        <div className="dropdown-item" onClick={() => { setIsUserMenuOpen(false); alert('Mesajlarınız yakında burada olacak!'); }}>
                                            <i className="fas fa-envelope"></i> Mesajlarım
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <div className="dropdown-item" onClick={toggleTheme}>
                                            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                                            {theme === 'dark' ? 'Aydınlık Mod' : 'Karanlık Mod'}
                                        </div>
                                    </div>
                                </div>
                            )}

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
