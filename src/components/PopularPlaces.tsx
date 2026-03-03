import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, getImageUrl } from '../api';

interface PopularPlaceAd {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    rating: number;
    visitCount: number;
    link: string;
    badge: string;
    hours: string;
    location: string;
    icon1?: string;
    info1?: string;
    icon2?: string;
    info2?: string;
    mainCategory?: string;
    category?: string;
    isActive: boolean;
}

const PopularPlaces: React.FC = () => {
    const [places, setPlaces] = useState<PopularPlaceAd[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await api.get<PopularPlaceAd[]>('/web-home/ads/popular');
                const activePlaces = response.data.filter(p => p.isActive);
                setPlaces(activePlaces);
            } catch (error) {
                console.error('Error fetching popular places:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, []);

    if (loading) return null;

    // Fallback data if DB is empty
    const displayPlaces = places.length > 0 ? places : [
        {
            id: 1,
            title: "Selimiye Camii",
            description: "Mimar Sinan'ın ustalık eseri, UNESCO Dünya Mirası Listesi'nde yer alan muhteşem cami",
            imageUrl: "/images/populer/selimiye.png",
            rating: 5,
            visitCount: 1245,
            link: "#",
            badge: "UNESCO",
            hours: "09:00 - 18:00",
            location: "Merkez",
            mainCategory: "Gezilecek Yerler",
            category: "Camiler",
            isActive: true
        },
        {
            id: 2,
            title: "Eski Cami",
            description: "Edirne'nin en eski camisi, benzersiz hat sanatı ve dokuz kubbeli mimarisiyle ünlü",
            imageUrl: "/images/populer/eskicamii.png",
            rating: 5,
            visitCount: 892,
            link: "#",
            badge: "",
            hours: "09:00 - 17:30",
            location: "Merkez",
            mainCategory: "Gezilecek Yerler",
            category: "Camiler",
            isActive: true
        },
        {
            id: 3,
            title: "Üç Şerefeli Cami",
            description: "Üç şerefeli minaresi ve görkemli kubbesiyle Osmanlı mimarisinin önemli eseri",
            imageUrl: "/images/populer/ucserefeli.png",
            rating: 4.5,
            visitCount: 756,
            link: "#",
            badge: "",
            hours: "09:00 - 18:00",
            location: "Merkez",
            mainCategory: "Gezilecek Yerler",
            category: "Camiler",
            isActive: true
        }
    ];

    return (
        <section className="tours" id="tours">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">Görülecek Yerler</span>
                    <h2 className="section-title">Popüler Mekanlar</h2>
                </div>

                <div className="featured-grid">
                    {displayPlaces.map((place) => {
                        const CardContent = (
                            <>
                                <div className="card-image-wrapper">
                                    <img src={place.imageUrl.startsWith('/images') ? place.imageUrl : getImageUrl(place.imageUrl)} alt={place.title} />
                                    <div className="card-badges">
                                        <span className="badge-featured">{place.mainCategory || 'Mekan'}</span>
                                    </div>
                                    <div className="card-overlay">
                                        <span className="btn btn-outline-white">İncele</span>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <div className="card-top">
                                        <span className="card-category">{place.category || 'Mekan Bilgisi'}</span>
                                        <div className="card-rating">
                                            <i className="fas fa-star"></i>
                                            <span>{place.rating || '5.0'}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-gray-900" style={{ fontSize: '22px', marginBottom: '10px', fontWeight: 'bold' }}>{place.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>{place.description}</p>
                                </div>
                            </>
                        );

                        if (!place.link || place.link === '#') {
                            return (
                                <div key={place.id} className="featured-business-card opacity-80 decoration-none cursor-default">
                                    {CardContent}
                                </div>
                            );
                        }

                        return place.link.startsWith('http') ? (
                            <a href={place.link} key={place.id} className="featured-business-card block no-underline" target="_blank" rel="noopener noreferrer">
                                {CardContent}
                            </a>
                        ) : (
                            <Link to={place.link} key={place.id} className="featured-business-card block no-underline">
                                {CardContent}
                            </Link>
                        );
                    })}
                </div>

                <div className="text-center">
                    <a href="#" className="btn btn-primary btn-lg">Tüm Mekanları Görüntüle</a>
                </div>
            </div>
        </section>
    );
};

export default PopularPlaces;
