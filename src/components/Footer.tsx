import React, { useEffect, useState } from 'react';
import { api, getImageUrl } from '../api';

interface NavbarData {
    logoUrl?: string;
    title?: string;
    titleColor?: string;
    fontFamily?: string;
    fontSize?: number;
    bgColor?: string;
    iconColor?: string;
}

const Footer: React.FC = () => {
    const [footerData, setFooterData] = useState<NavbarData | null>(null);

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const response = await api.get('/web-home/navbar');
                setFooterData(response.data);
            } catch (error) {
                console.error("Footer data fetch error:", error);
            }
        };
        fetchFooterData();
    }, []);

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-col">
                        <div className="footer-logo">
                            {footerData?.logoUrl ? (
                                <img src={getImageUrl(footerData.logoUrl)} alt="Logo" style={{ height: '40px', width: 'auto' }} />
                            ) : (
                                <i className="fas fa-landmark" style={{ color: footerData?.iconColor || 'var(--primary-color)' }}></i>
                            )}
                            <span
                                style={{
                                    color: footerData?.titleColor ?? '#ffffff',
                                    fontFamily: footerData?.fontFamily ?? undefined,
                                    fontSize: footerData?.fontSize ? `${footerData.fontSize}px` : undefined,
                                    fontWeight: 'bold'
                                }}
                            >
                                {footerData?.title || 'Edirne Rehberi'}
                            </span>
                        </div>
                        <p>Edirne'nin tarihi, kültürel ve eşsiz lezzetlerini keşfetmeniz için hazırlanan en kapsamlı şehir
                            rehberi. Osmanlı'nın eski başkentini bizimle tanıyın.</p>
                        <div className="footer-social">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-youtube"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h3>Hızlı Linkler</h3>
                        <ul>
                            <li><a href="#home">Ana Sayfa</a></li>
                            <li><a href="#about">Edirne Hakkında</a></li>
                            <li><a href="#categories">Kategoriler</a></li>
                            <li><a href="#tours">Gezilecek Yerler</a></li>
                            <li><a href="#contact">İletişim</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3>Popüler Mekanlar</h3>
                        <ul>
                            <li><a href="pages/selimiye-camii.html">Selimiye Camii</a></li>
                            <li><a href="#">Eski Cami</a></li>
                            <li><a href="#">Üç Şerefeli Cami</a></li>
                            <li><a href="#">Meriç Köprüsü</a></li>
                            <li><a href="#">Ali Paşa Çarşısı</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3>Bülten</h3>
                        <p>En son güncellemelerden haberdar olmak için bültenimize abone olun!</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="E-posta adresiniz" />
                            <button type="submit"><i className="fas fa-paper-plane"></i></button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} {footerData?.title || 'Edirne Rehberi'}. Tüm hakları saklıdır.</p>
                    <div className="footer-links">
                        <a href="#">Gizlilik Politikası</a>
                        <a href="#">Kullanım Şartları</a>
                        <a href="#">Çerez Politikası</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
