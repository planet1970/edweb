
import React from 'react';

const adData = [
    "Lalezar Restoran'da Edirne Rehberi kullanıcılarına özel %10 indirim!",
    "Hilly Hotel'de bahar fırsatlarını kaçırmayın - Erken rezervasyon başladı.",
    "Meriç Kenarı Kahve'de eşsiz manzara eşliğinde ikinci kahveniz %50 indirimli.",
    "Edirne'nin en iyi butik otellerinde konaklama fırsatları için kategorileri inceleyin.",
    "Şehrin en lezzetli duraklarını keşfetmeye hazır mısınız?"
];

const PromoTicker: React.FC = () => {
    // Duplicate data for infinite loop
    const displayData = [...adData, ...adData];

    return (
        <div className="promo-ticker-wrapper">
            <div className="container">
                <div className="promo-ticker-content">
                    <div className="promo-label">
                        <i className="fas fa-bullhorn"></i>
                        <span>DUYURULAR</span>
                    </div>
                    <div className="promo-items-container">
                        <div className="promo-items">
                            {displayData.map((text, index) => (
                                <div key={index} className="promo-item">
                                    <span className="dot"></span>
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromoTicker;
