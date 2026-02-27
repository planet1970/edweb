
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import SocialBar from '../components/SocialBar';
import { api } from '../api';
import type { Category } from '../types';
import { Link } from 'react-router-dom';
import FullScreenLoader from '../components/FullScreenLoader';

const Home: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const getIconClass = (category: Category) => {
        return category.webIcon || 'fas fa-map-marked-alt';
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get<Category[]>('/categories');
                setCategories(response.data.filter(c => c.isActive).sort((a, b) => (a.order || 0) - (b.order || 0)));
            } catch (error) {
                console.error("Kategoriler yüklenemedi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!loading) {
            // @ts-ignore
            if (window.AOS) {
                // @ts-ignore
                window.AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true,
                    mirror: false
                });
                // @ts-ignore
                window.AOS.refresh();
            }
        }
    }, [loading]);

    if (loading) return <FullScreenLoader />;

    return (
        <>
            <Hero />
            <SocialBar />

            {/* Browse By Category */}
            <section className="categories" id="categories">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <span className="section-subtitle">Kategorilere Göz Atın</span>
                        <h2 className="section-title">Edirne'yi Keşfedin</h2>
                    </div>

                    <div className="categories-grid">
                        {categories.map((category, index) => (
                            <div
                                key={category.id}
                                className="category-card"
                                data-aos="fade-up"
                                data-aos-delay={100 + (index * 50)}
                            >
                                <div className="category-icon">
                                    <i className={getIconClass(category)}></i>
                                </div>
                                <h3>{category.title}</h3>
                                <p>{category.description}</p>
                                <Link to={`/category/${category.id}`} className="category-link">
                                    <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                        ))}
                        {categories.length === 0 && (
                            <p className="text-center w-full text-gray-400">Kategoriler yükleniyor...</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Popular Places Section */}
            <section className="tours" id="tours">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <span className="section-subtitle">Görülecek Yerler</span>
                        <h2 className="section-title">Popüler Mekanlar</h2>
                    </div>

                    <div className="tours-grid">
                        <div className="tour-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="tour-image">
                                <img src="/images/populer/selimiye.png" alt="Selimiye Camii" />
                                <div className="tour-badge popular">UNESCO</div>
                                <div className="tour-overlay"><a href="#" className="btn btn-white">Detayları Gör</a></div>

                            </div>
                            <div className="tour-content">
                                <div className="tour-meta">
                                    <span><i className="fas fa-clock"></i> 09:00 - 18:00</span>
                                    <span><i className="fas fa-map-marker-alt"></i> Merkez</span>
                                </div>
                                <h3 className="tour-title">Selimiye Camii</h3>
                                <p className="tour-description">Mimar Sinan'ın ustalık eseri, UNESCO Dünya Mirası Listesi'nde yer
                                    alan muhteşem cami</p>
                                <div className="tour-footer">
                                    <div className="tour-rating">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <span>(1.245 Ziyaretçi)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tour-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="tour-image">
                                <img src="/images/populer/eskicamii.png" alt="Eski Cami" />
                                <div className="tour-overlay">
                                    <a href="#" className="btn btn-white">Detayları Gör</a>
                                </div>
                            </div>
                            <div className="tour-content">
                                <div className="tour-meta">
                                    <span><i className="fas fa-clock"></i> 09:00 - 17:30</span>
                                    <span><i className="fas fa-map-marker-alt"></i> Merkez</span>
                                </div>
                                <h3 className="tour-title">Eski Cami</h3>
                                <p className="tour-description">Edirne'nin en eski camisi, benzersiz hat sanatı ve dokuz kubbeli
                                    mimarisiyle ünlü</p>
                                <div className="tour-footer">
                                    <div className="tour-rating">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <span>(892 Ziyaretçi)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tour-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="tour-image">
                                <img src="images/populer/ucserefeli.png" alt="Üç Şerefeli Cami" />
                                <div className="tour-overlay">
                                    <a href="#" className="btn btn-white">Detayları Gör</a>
                                </div>
                            </div>
                            <div className="tour-content">
                                <div className="tour-meta">
                                    <span><i className="fas fa-clock"></i> 09:00 - 18:00</span>
                                    <span><i className="fas fa-map-marker-alt"></i> Merkez</span>
                                </div>
                                <h3 className="tour-title">Üç Şerefeli Cami</h3>
                                <p className="tour-description">Üç şerefeli minaresi ve görkemli kubbesiyle Osmanlı mimarisinin
                                    önemli eseri</p>
                                <div className="tour-footer">
                                    <div className="tour-rating">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                        <span>(756 Ziyaretçi)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tour-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="tour-image">
                                <img src="images/populer/sarayici.png" alt="Tarihi Kırkpınar Meydanı" />
                                <div className="tour-badge">Tarihi</div>
                                <div className="tour-overlay">
                                    <a href="#" className="btn btn-white">Detayları Gör</a>
                                </div>
                            </div>
                            <div className="tour-content">
                                <div className="tour-meta">
                                    <span><i className="fas fa-clock"></i> 24 Saat</span>
                                    <span><i className="fas fa-map-marker-alt"></i> Sarayiçi</span>
                                </div>
                                <h3 className="tour-title">Tarihi Kırkpınar Meydanı</h3>
                                <p className="tour-description">Kırkpınar Yağlı Güreşleri'nin yapıldığı tarihi meydan ve çevresi</p>
                                <div className="tour-footer">
                                    <div className="tour-rating">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <span>(1.089 Ziyaretçi)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tour-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="tour-image">
                                <img src="images/populer/meric.png" alt="Meriç Nehri" />
                                <div className="tour-overlay">
                                    <a href="#" className="btn btn-white">Detayları Gör</a>
                                </div>
                            </div>
                            <div className="tour-content">
                                <div className="tour-meta">
                                    <span><i className="fas fa-clock"></i> 24 Saat</span>
                                    <span><i className="fas fa-map-marker-alt"></i> Şehir Geneli</span>
                                </div>
                                <h3 className="tour-title">Meriç Nehri ve Köprüleri</h3>
                                <p className="tour-description">Tarihi köprüler ve nehir kenarı yürüyüş parkurları ile doğa ve tarih
                                    bir arada</p>
                                <div className="tour-footer">
                                    <div className="tour-rating">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <span>(2.134 Ziyaretçi)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tour-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="tour-image">
                                <img src="images/populer/edirnesarayi.png" alt="Edirne Sarayı" />
                                <div className="tour-badge">Müze</div>
                                <div className="tour-overlay">
                                    <a href="#" className="btn btn-white">Detayları Gör</a>
                                </div>
                            </div>
                            <div className="tour-content">
                                <div className="tour-meta">
                                    <span><i className="fas fa-clock"></i> 09:00 - 17:00</span>
                                    <span><i className="fas fa-map-marker-alt"></i> Sarayiçi</span>
                                </div>
                                <h3 className="tour-title">Edirne Sarayı (Sarayiçi)</h3>
                                <p className="tour-description">Osmanlı padişahlarının kullandığı tarihi saray kalıntıları ve müze
                                    kompleksi</p>
                                <div className="tour-footer">
                                    <div className="tour-rating">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                        <span>(678 Ziyaretçi)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center" data-aos="fade-up">
                        <a href="#" className="btn btn-primary btn-lg">Tüm Mekanları Görüntüle</a>
                    </div>
                </div>
            </section>

            {/* Features Section (Interesting Facts) */}
            <section className="features" id="about">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <span className="section-subtitle">HADRİANOUPOLİS'TEN EDİRNE'YE</span>
                        <h2 className="section-title">İlginç Bilgiler</h2>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="feature-icon">
                                <i className="fas fa-landmark"></i>
                            </div>
                            <h3>Edirne Adı Tarihçesi</h3>
                            <p>Roma İmparatoru Hadrianus tarafından kurulan şehir, Hadrianopolis adından evrilerek günümüzdeki
                                Edirne adını almıştır.</p>
                        </div>

                        <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="feature-icon">
                                <i className="fas fa-crown"></i>
                            </div>
                            <h3>Başkent Edirne</h3>
                            <p>1361 yılında fethedilen Edirne, İstanbul'un fethine kadar 92 yıl boyunca Osmanlı Devleti'nin
                                başkenti olmuştur.</p>
                        </div>

                        <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="feature-icon">
                                <i className="fas fa-mosque"></i>
                            </div>
                            <h3>Sinan'ın Ustalığı</h3>
                            <p>Mimar Sinan, "ustalık eserim" dediği Selimiye Camii ile dünya mimarlık tarihine silinmez bir imza
                                atmıştır.</p>
                        </div>

                        <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
                            <div className="feature-icon">
                                <i className="fas fa-trophy"></i>
                            </div>
                            <h3>Yağlı Güreş Tarihi</h3>
                            <p>1361'den beri aralıksız düzenlenen Tarihi Kırkpınar Yağlı Güreşleri, dünyanın en eski spor
                                organizasyonlarından biridir.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact" id="contact">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <span className="section-subtitle">İletişim</span>
                        <h2 className="section-title">Bizimle İletişime Geçin</h2>
                    </div>

                    <div className="contact-wrapper">
                        <div className="contact-info" data-aos="fade-right">
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div>
                                    <h4>Adres</h4>
                                    <p>Meydan Mah. Mimar Sinan Cad.<br />Merkez, Edirne</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fas fa-phone"></i>
                                </div>
                                <div>
                                    <h4>Telefon</h4>
                                    <p>+90 284 225 18 26<br />+90 532 123 45 67</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div>
                                    <h4>E-posta</h4>
                                    <p>info@edirnerehberi.com<br />destek@edirnerehberi.com</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fas fa-clock"></i>
                                </div>
                                <div>
                                    <h4>Çalışma Saatleri</h4>
                                    <p>Pazartesi - Cuma: 09:00 - 18:00<br />Cumartesi: 10:00 - 16:00</p>
                                </div>
                            </div>

                            <div className="social-links">
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-youtube"></i></a>
                            </div>
                        </div>

                        <form className="contact-form" data-aos="fade-left">
                            <div className="form-row">
                                <div className="form-group">
                                    <input type="text" placeholder="Adınız *" required />
                                </div>
                                <div className="form-group">
                                    <input type="email" placeholder="E-posta *" required />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <input type="tel" placeholder="Telefon *" required />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Konu" />
                                </div>
                            </div>

                            <div className="form-group">
                                <textarea rows={6} placeholder="Mesajınız *" required></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg">Mesaj Gönder</button>
                        </form>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Home;