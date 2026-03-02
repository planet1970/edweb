import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, getImageUrl } from '../api';

const FeaturedBusinesses: React.FC = () => {
    const [featuredData, setFeaturedData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await api.get('/web-home/ads/featured');
                const sortedFeatured = Array.isArray(response.data)
                    ? response.data
                        .filter((f: any) => f.isActive)
                        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                    : [];

                setFeaturedData(sortedFeatured);
            } catch (error) {
                console.error("Öne çıkanlar yüklenemedi:", error);
                setFeaturedData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    if (loading || featuredData.length === 0) return null;

    return (
        <section className="featured-businesses-section" id="featured">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">ÖNE ÇIKANLAR</span>
                    <h2 className="section-title">Şehrin Seçkin Mekanları</h2>
                    <p className="section-desc">Edirne Rehberi kullanıcılarına özel avantajlar sunan, şehrin en sevilen noktaları.</p>
                </div>

                <div className="featured-grid">
                    {featuredData.map((item) => {
                        const isExternal = item.link?.startsWith('http');
                        const isValidLink = item.link && item.link !== '#';

                        const CardContent = (
                            <>
                                <div className="card-image-wrapper">
                                    <img src={getImageUrl(item.imageUrl)} alt={item.title} />
                                    <div className="card-badges">
                                        <span className="badge-featured">{item.mainCategory || item.category || 'Mekan'}</span>
                                        {item.discount && <span className="badge-promo">{item.discount}</span>}
                                    </div>
                                    <div className="card-overlay">
                                        <span className="btn btn-outline-white">İncele</span>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <div className="card-top">
                                        <span className="card-category">{item.category}</span>
                                        <div className="card-rating">
                                            <i className="fas fa-star"></i>
                                            <span>{item.rating || '5.0'}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-gray-900">{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </>
                        );

                        if (!isValidLink) {
                            return (
                                <div key={item.id} className="featured-business-card opacity-80 decoration-none cursor-default">
                                    {CardContent}
                                </div>
                            );
                        }

                        return isExternal ? (
                            <a href={item.link} key={item.id} className="featured-business-card block no-underline" target="_blank" rel="noopener noreferrer">
                                {CardContent}
                            </a>
                        ) : (
                            <Link to={item.link} key={item.id} className="featured-business-card block no-underline">
                                {CardContent}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedBusinesses;
