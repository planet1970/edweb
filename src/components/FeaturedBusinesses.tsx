import React, { useEffect, useState } from 'react';
import { api, getImageUrl } from '../api';

const FeaturedBusinesses: React.FC = () => {
    const [featuredData, setFeaturedData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await api.get('/web-home/ads/featured');
                setFeaturedData(response.data);
            } catch (error) {
                console.error("Öne çıkanlar yüklenemedi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    if (loading || featuredData.length === 0) return null;

    return (
        <section className="featured-businesses-section">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <span className="section-subtitle">ÖNE ÇIKAN İŞLETMELER</span>
                    <h2 className="section-title">Şehrin Seçkin Mekanları</h2>
                    <p className="section-desc">Edirne Rehberi kullanıcılarına özel avantajlar sunan, şehrin en sevilen noktaları.</p>
                </div>

                <div className="featured-grid">
                    {featuredData.map((item) => (
                        <div key={item.id} className="featured-business-card" data-aos="fade-up" data-aos-delay={100}>
                            <div className="card-image-wrapper">
                                <img src={getImageUrl(item.imageUrl)} alt={item.title} />
                                <div className="card-badges">
                                    <span className="badge-featured">Sponsorlu</span>
                                    {item.discount && <span className="badge-promo">{item.discount}</span>}
                                </div>
                                <div className="card-overlay">
                                    <a href={item.link} className="btn btn-outline-white">İncele</a>
                                </div>
                            </div>
                            <div className="card-content">
                                <div className="card-top">
                                    <span className="card-category">{item.category}</span>
                                    <div className="card-rating">
                                        <i className="fas fa-star"></i>
                                        <span>{item.rating}</span>
                                    </div>
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedBusinesses;
