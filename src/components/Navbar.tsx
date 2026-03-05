
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api, getImageUrl } from '../api';
import WeatherWidget from './WeatherWidget';
import { visitorService } from '../visitorService';

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
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [visitorName, setVisitorName] = useState<string | null>(null);
    const [fullName, setFullName] = useState<string | null>(null);
    const [visitorEmail, setVisitorEmail] = useState<string | null>(null);
    const [userImage, setUserImage] = useState<string | null>(null);
    const location = useLocation();
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial load
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

        const handleVisitorUpdate = () => {
            setVisitorName(visitorService.getUsername());
            setFullName(visitorService.getFullName());
            setVisitorEmail(visitorService.getEmail());
            setUserImage(visitorService.getUserImage());
        };

        window.addEventListener('visitorUpdated', handleVisitorUpdate);

        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener('visitorUpdated', handleVisitorUpdate);
        };
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Menü açıkken body scroll'u kilitle
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header
            className={`header ${scrolled ? 'scrolled' : ''}`}
            id="header"
            style={{ backgroundColor: !scrolled && navbarData?.bgColor ? navbarData.bgColor : undefined }}
        >
            <nav className="navbar">
                <div className="container">
                    <div className="nav-wrapper">

                        {/* Logo */}
                        <Link to="/" className="logo">
                            {navbarData?.logoUrl ? (
                                <img src={getImageUrl(navbarData.logoUrl)} alt="Logo" className="logo-img" />
                            ) : (
                                <i className="fas fa-landmark" style={{ color: !scrolled ? navbarData?.iconColor : undefined }}></i>
                            )}
                            <span style={{
                                color: navbarData?.titleColor ?? (!scrolled ? '#ffffff' : undefined),
                                fontFamily: navbarData?.fontFamily ?? undefined,
                                fontSize: navbarData?.fontSize ? `${navbarData.fontSize}px` : '24px',
                                fontWeight: 'bold'
                            }}>
                                {navbarData?.title || 'Edirne Rehberi'}
                            </span>
                        </Link>

                        {/* Desktop Nav Menu */}
                        <ul className="nav-menu" id="navMenu">
                            <li><Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Ana Sayfa</Link></li>
                            <li><a href="/#about" className="nav-link">Edirne</a></li>
                            <li><a href="/#categories" className="nav-link">Kategoriler</a></li>
                            <li><a href="/#contact" className="nav-link">İletişim</a></li>
                        </ul>

                        {/* Desktop Right Actions */}
                        <div className="nav-actions">
                            <WeatherWidget />

                            {/* Desktop/Tablet kullanıcı dropdown - 768px üzerinde görünür */}
                            {visitorName && (
                                <div className="user-dropdown hide-mobile" ref={userMenuRef}>
                                    <div className="visitor-tag" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                                        <div className="visitor-image-wrapper">
                                            {userImage ? (
                                                <img src={getImageUrl(userImage)} alt="User" className="navbar-profile-img" />
                                            ) : (
                                                <i className="fas fa-user-circle"></i>
                                            )}
                                        </div>
                                        <span>{visitorName}</span>
                                        <i className={`fas fa-chevron-down ${isUserMenuOpen ? 'fa-rotate-180' : ''}`}
                                            style={{ fontSize: '10px', marginLeft: '2px', transition: 'transform 0.3s' }}></i>
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

                            {/* Hamburger butonu */}
                            <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menü">
                                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>

            {/* Mobile Slide Panel */}
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>

                {/* Kullanıcı Profil Alanı */}
                {visitorName ? (
                    <div className="mobile-user-section">
                        <div className="mobile-user-avatar">
                            {userImage ? (
                                <img src={getImageUrl(userImage)} alt="User" className="mobile-user-img" />
                            ) : (
                                <div className="mobile-user-avatar-placeholder">
                                    <i className="fas fa-user"></i>
                                </div>
                            )}
                        </div>
                        <div className="mobile-user-name">{fullName || visitorName}</div>
                        {visitorEmail && <div className="mobile-user-email">{visitorEmail}</div>}
                    </div>
                ) : (
                    <div className="mobile-user-section mobile-guest-section">
                        <div className="mobile-user-avatar-placeholder">
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="mobile-user-name">Hoş Geldiniz</div>
                        <div className="mobile-user-email">Edirne Rehberi</div>
                    </div>
                )}

                {/* Menü Öğeleri */}
                <div className="mobile-divider"></div>
                <ul className="mobile-nav-list">
                    <li>
                        <Link to="/" className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
                            <span className="mobile-nav-icon"><i className="fas fa-home"></i></span>
                            Ana Sayfa
                        </Link>
                    </li>
                    <li>
                        <a href="/#about" className="mobile-nav-link" onClick={closeMenu}>
                            <span className="mobile-nav-icon"><i className="fas fa-city"></i></span>
                            Edirne
                        </a>
                    </li>
                    <li>
                        <a href="/#categories" className="mobile-nav-link" onClick={closeMenu}>
                            <span className="mobile-nav-icon"><i className="fas fa-th-large"></i></span>
                            Kategoriler
                        </a>
                    </li>
                    <li>
                        <a href="/#contact" className="mobile-nav-link" onClick={closeMenu}>
                            <span className="mobile-nav-icon"><i className="fas fa-envelope"></i></span>
                            İletişim
                        </a>
                    </li>

                    {visitorName && (
                        <>
                            <div className="mobile-divider"></div>
                            <li>
                                <Link to="/profile" className="mobile-nav-link" onClick={closeMenu}>
                                    <span className="mobile-nav-icon"><i className="fas fa-user-cog"></i></span>
                                    Profilim
                                </Link>
                            </li>
                            <li>
                                <div className="mobile-nav-link" onClick={() => { closeMenu(); alert('Mesajlarınız yakında burada olacak!'); }}>
                                    <span className="mobile-nav-icon"><i className="fas fa-envelope"></i></span>
                                    Mesajlarım
                                </div>
                            </li>
                        </>
                    )}

                    {!visitorName && (
                        <>
                            <div className="mobile-divider"></div>
                            <li>
                                <Link to="/login" className="mobile-nav-link" onClick={closeMenu}>
                                    <span className="mobile-nav-icon"><i className="fas fa-sign-in-alt"></i></span>
                                    Giriş Yap
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Alt - Tema Değiştirici */}
                <div className="mobile-menu-footer">
                    <button className="mobile-theme-toggle" onClick={toggleTheme}>
                        <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                        {theme === 'dark' ? 'Aydınlık Mod' : 'Karanlık Mod'}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
