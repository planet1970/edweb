
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, getImageUrl } from '../api';
import type { SubCategory, Place, FoodPlace } from '../types';

const SubCategoryItems: React.FC = () => {
    const { subCategoryId } = useParams<{ subCategoryId: string }>();
    const [subCategory, setSubCategory] = useState<SubCategory | null>(null);
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        console.log(`[SubCategoryItems] Veri çekiliyor: ${subCategoryId}`);
        try {
            const subRes = await api.get<SubCategory>(`/subcategories/${subCategoryId}`);
            setSubCategory(subRes.data);

            const [placesRes, foodRes] = await Promise.all([
                api.get<Place[]>(`/places?subCategoryId=${subCategoryId}`),
                api.get<FoodPlace[]>(`/food-places?subCategoryId=${subCategoryId}`)
            ]);

            const places = Array.isArray(placesRes.data) ? placesRes.data : [];
            const foods = Array.isArray(foodRes.data) ? foodRes.data : [];

            const combined = [
                ...places.map(p => ({ ...p, _cardType: 'PLACE' })),
                ...foods.map(f => ({ ...f, _cardType: 'FOOD_PLACE' }))
            ].filter(item => item.isActive !== false);

            setItems(combined);
        } catch (err: any) {
            console.error("[SubCategoryItems] Hata:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, [subCategoryId]);

    if (loading) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
                <div className="spinner"></div>
                <p style={{ marginLeft: '15px', color: '#666' }}>Yükleniyor...</p>
            </div>
        );
    }

    return (
        <div className="subcategory-items-page" style={{ background: '#f8f9fa', minHeight: '100vh', opacity: 1, visibility: 'visible' }}>
            {/* Header Section */}
            <section style={{
                padding: '100px 0 20px',
                background: '#1A1A2E',
                color: '#fff',
                textAlign: 'center',
                position: 'relative'
            }}>
                <div className="container">
                    <div style={{ marginBottom: '20px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Ana Sayfa</Link>
                        <span style={{ margin: '0 10px' }}>/</span>
                        <span style={{ color: '#FFB627' }}>{subCategory?.title}</span>
                    </div>
                    <h1 style={{
                        fontSize: 'max(32px, 4vw)',
                        fontWeight: 800,
                        marginBottom: '10px',
                        fontFamily: "'Playfair Display', serif",
                        color: '#fff'
                    }}>
                        {subCategory?.title}
                    </h1>
                    <p style={{ fontSize: '18px', opacity: 0.8, maxWidth: '700px', margin: '0 auto' }}>
                        {subCategory?.description || "Edirne'nin saklı güzelliklerini keşfedin."}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section style={{ padding: '80px 0' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', opacity: 1 }}>
                        {items.length > 0 ? (
                            items.map((item) => {
                                const isFood = item._cardType === 'FOOD_PLACE';
                                const imageUrl = isFood ? item.imageUrl : item.pic_url;
                                const description = isFood ? (item.frontContent || item.storyTitle) : item.description;

                                return (
                                    <div
                                        key={`${item._cardType}-${item.id}`}
                                        className="rectangular-card"
                                        style={{
                                            display: 'flex',
                                            background: '#fff',
                                            borderRadius: '20px',
                                            overflow: 'hidden',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                            border: '1px solid rgba(0,0,0,0.05)',
                                            opacity: 1,
                                            visibility: 'visible',
                                            transition: 'transform 0.3s ease'
                                        }}
                                    >
                                        {/* Left Side: Image */}
                                        <div style={{ width: '350px', minWidth: '350px', height: '180px', overflow: 'hidden' }}>
                                            <img
                                                src={imageUrl ? getImageUrl(imageUrl) : '/images/placeholder.jpg'}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                alt={item.title}
                                            />
                                        </div>

                                        {/* Right Side: Content */}
                                        <div style={{
                                            padding: '24px 40px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            flexGrow: 1,
                                            background: '#fff'
                                        }}>
                                            <h3 style={{
                                                fontSize: '24px',
                                                fontWeight: 800,
                                                marginBottom: '4px',
                                                color: '#1A1A2E',
                                                fontFamily: "'Playfair Display', serif"
                                            }}>
                                                {item.title}
                                            </h3>
                                            <div style={{
                                                fontSize: '15px',
                                                color: '#666',
                                                lineHeight: '1.5',
                                                marginBottom: '12px',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}>
                                                {description || 'Bu mekan için henüz bir açıklama eklenmemiş.'}
                                            </div>
                                            <div>
                                                <Link
                                                    to={isFood ? `/detail/food_place/${item.id}` : `/detail/place/${item.id}`}
                                                    state={{ place: item }}
                                                    className="btn btn-primary"
                                                    style={{
                                                        padding: '12px 30px',
                                                        borderRadius: '50px',
                                                        fontSize: '14px',
                                                        display: 'inline-block'
                                                    }}
                                                >
                                                    İncele
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ textAlign: 'center', padding: '100px 0' }}>
                                <i className="fas fa-search" style={{ fontSize: '48px', color: '#ccc', marginBottom: '20px' }}></i>
                                <p>Bu alt kategoride henüz içerik bulunmuyor.</p>
                                <Link to="/" className="btn btn-secondary" style={{ marginTop: '20px' }}>Geri Dön</Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <style>{`
                .rectangular-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 40px rgba(0,0,0,0.15) !important;
                }
                @media (max-width: 768px) {
                    .rectangular-card { flex-direction: column !important; }
                    .rectangular-card > div:first-child { width: 100% !important; min-width: 100% !important; height: 180px !important; }
                    .rectangular-card > div:last-child { padding: 24px !important; }
                }
            `}</style>
        </div>
    );
};

export default SubCategoryItems;
