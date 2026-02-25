
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-col">
                        <div className="footer-logo">
                            <i className="fas fa-landmark"></i>
                            <span>Edirne Rehberi</span>
                        </div>
                        <p>Edirne'nin tarihi, kültürel ve eşsiz lezzetlerini keşfetmeniz için hazırlanan en kapsamlı şehir rehberi.</p>
                    </div>
                    <div className="footer-col" style={{ marginLeft: 'auto' }}>
                        <h3>Hızlı Linkler</h3>
                        <ul>
                            <li><Link to="/">Ana Sayfa</Link></li>
                            <li><a href="/#about">Edirne Hakkında</a></li>
                            <li><a href="/#categories">Kategoriler</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Edirne Rehberi. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
