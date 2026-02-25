
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import SocialBar from '../components/SocialBar';
import { api } from '../api';
import type { Category } from '../types';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

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
            }
        };
        fetchCategories();

        // @ts-ignore
        if (window.AOS) {
            // @ts-ignore
            window.AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
        }
    }, []);

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
                                <p className="tour-description">Mimar Sinan'ın ustalık eseri, UNESCO Dünya Mirası Listesi'nde yer alan muhteşem cami</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center" data-aos="fade-up" style={{ marginTop: '40px' }}>
                        <a href="#" className="btn btn-primary btn-lg">Tüm Mekanları Görüntüle</a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features" id="about">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <span className="section-subtitle">HADRİANOUPOLİS'TEN EDİRNE'YE</span>
                        <h2 className="section-title">İlginç Bilgiler</h2>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="feature-icon"><i className="fas fa-landmark"></i></div>
                            <h3>Edirne Adı Tarihçesi</h3>
                            <p>Roma İmparatoru Hadrianus tarafından kurulan şehir, Hadrianopolis adından evrilerek günümüzdeki Edirne adını almıştır.</p>
                        </div>
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="feature-icon"><i className="fas fa-crown"></i></div>
                            <h3>Başkent Edirne</h3>
                            <p>1361 yılında fethedilen Edirne, İstanbul'un fethine kadar 92 yıl boyunca Osmanlı Devleti'nin başkenti olmuştur.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
