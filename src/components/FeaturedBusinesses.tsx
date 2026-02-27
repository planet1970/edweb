
import React from 'react';

const featuredData = [
    {
        id: 1,
        name: "Lalezar Restoran",
        category: "Yeme - İçme",
        image: "/images/featured/ciger.png",
        discount: "%10 İndirim",
        description: "Edirne'nin en meşhur yaprak ciğeri ve Osmanlı mutfağı lezzetleri.",
        rating: 4.9,
        link: "#"
    },
    {
        id: 2,
        name: "Hilly Hotel",
        category: "Konaklama",
        image: "/images/featured/hotel.png",
        discount: "Erken Rezervasyon",
        description: "Şehrin kalbinde, modern konfor ve tarihi dokunun buluşma noktası.",
        rating: 4.8,
        link: "#"
    },
    {
        id: 3,
        name: "Meriç Kenarı Kahve",
        category: "Cafe & Bar",
        image: "/images/featured/cafe.png",
        discount: "2. Kahve %50",
        description: "Meriç Nehri kıyısında, huzurlu bir atmosfer ve eşsiz manzara.",
        rating: 4.7,
        link: "#"
    }
];

const FeaturedBusinesses: React.FC = () => {
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
                        <div key={item.id} className="featured-business-card" data-aos="fade-up" data-aos-delay={item.id * 100}>
                            <div className="card-image-wrapper">
                                <img src={item.image} alt={item.name} />
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
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Optional: Small Sponsor Bar */}
                <div className="sponsor-bar" data-aos="fade-up">
                    <span className="sponsor-title">İş Ortaklarımız:</span>
                    <div className="sponsor-logos">
                        <div className="sponsor-logo">LOGO 1</div>
                        <div className="sponsor-logo">LOGO 2</div>
                        <div className="sponsor-logo">LOGO 3</div>
                        <div className="sponsor-logo">LOGO 4</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedBusinesses;
