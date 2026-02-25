
import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { api, getImageUrl } from '../api';
import type { FoodPlace as FoodPlaceType } from '../types';
import FullScreenLoader from '../components/FullScreenLoader';

const FoodPlace: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [place, setPlace] = useState<FoodPlaceType | null>(location.state?.place || null);
    const [loading, setLoading] = useState(!place);

    const fetchData = async () => {
        if (!place) setLoading(true);
        try {
            const res = await api.get<FoodPlaceType>(`/food-places/${id}`);
            setPlace(res.data);
        } catch (err) {
            console.error("[FoodPlace] Error loading data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        // @ts-ignore
        if (typeof window !== 'undefined' && window.AOS) {
            // @ts-ignore
            window.AOS.init({ duration: 1000, once: true });
            // @ts-ignore
            window.AOS.refresh();
        }
    }, [place]);

    if (loading) return <FullScreenLoader />;

    if (!place) {
        return (
            <div style={{ padding: '200px 20px', textAlign: 'center' }}>
                <h2>Mekan bulunamadı.</h2>
                <Link to="/" className="btn btn-primary">Ana Sayfaya Dön</Link>
            </div>
        );
    }

    const menuItems = [];
    for (let i = 1; i <= 10; i++) {
        const name = (place as any)[`menuItem${i}`];
        const desc = (place as any)[`menuDesc${i}`];
        const price = (place as any)[`menuPrice${i}`];
        if (name) menuItems.push({ name, desc, price });
    }

    const days = [
        { label: 'Pazartesi', value: place.hoursMon },
        { label: 'Salı', value: place.hoursTue },
        { label: 'Çarşamba', value: place.hoursWed },
        { label: 'Perşembe', value: place.hoursThu },
        { label: 'Cuma', value: place.hoursFri },
        { label: 'Cumartesi', value: place.hoursSat },
        { label: 'Pazar', value: place.hoursSun },
    ];

    const features = place.features ? place.features.split(',').map(f => f.trim()) : [];

    return (
        <div className="food-detail-page" style={{ background: '#fff', minHeight: '100vh' }}>
            {/* Hero Section */}
            <header style={{
                height: '60vh',
                position: 'relative',
                background: '#000',
                overflow: 'hidden'
            }}>
                <img
                    src={
                        place.backImageUrl
                            ? getImageUrl(place.backImageUrl)
                            : place.imageUrl
                                ? getImageUrl(place.imageUrl)
                                : '/images/placeholder.jpg'
                    }
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                    alt={place.title}
                />
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))',
                    display: 'flex', alignItems: 'flex-end', paddingBottom: '60px'
                }}>
                    <div className="container" data-aos="fade-up">
                        <div style={{
                            background: '#FFB627', color: '#000', padding: '5px 15px',
                            borderRadius: '5px', display: 'inline-block', fontWeight: 'bold',
                            marginBottom: '15px', fontSize: '12px', letterSpacing: '1px'
                        }}>
                            {place.badge || 'POPÜLER LEZZET'}
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(32px, 5vw, 60px)', color: '#fff',
                            fontWeight: 800, marginBottom: '10px', fontFamily: "'Playfair Display', serif"
                        }}>
                            {place.title}
                        </h1>
                        <p style={{ color: '#FFB627', fontSize: '20px', fontWeight: '600' }}>{place.subtitle}</p>
                    </div>
                </div>
            </header>

            <main className="container" style={{ padding: '60px 15px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '50px' }}>

                    {/* Left Side: Content */}
                    <div>
                        {/* Story / Description */}
                        <section data-aos="fade-up" style={{ marginBottom: '50px' }}>
                            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '20px', fontFamily: "'Playfair Display', serif" }}>
                                {place.storyTitle || 'Hakkımızda'}
                            </h2>
                            <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#444' }}>{place.frontContent}</p>
                            {place.backContent && (
                                <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#444', marginTop: '20px' }}>{place.backContent}</p>
                            )}
                        </section>

                        {/* Menu Section */}
                        {menuItems.length > 0 && (
                            <section data-aos="fade-up" style={{
                                background: '#FFFDF5', border: '1px solid #FEF3C7',
                                padding: '40px', borderRadius: '30px', marginBottom: '50px'
                            }}>
                                <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '30px', textAlign: 'center' }}>
                                    <i className="fas fa-utensils" style={{ marginRight: '10px', color: '#EA580C' }}></i>
                                    Menüden Seçmeler
                                </h2>
                                <div style={{ display: 'grid', gap: '20px' }}>
                                    {menuItems.map((item, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex', justifyContent: 'space-between',
                                            alignItems: 'center', paddingBottom: '15px',
                                            borderBottom: '1px dashed #ddd'
                                        }}>
                                            <div>
                                                <div style={{ fontWeight: '700', fontSize: '18px' }}>{item.name}</div>
                                                {item.desc && <div style={{ fontSize: '14px', color: '#666' }}>{item.desc}</div>}
                                            </div>
                                            <div style={{ fontWeight: '800', fontSize: '18px', color: '#EA580C' }}>{item.price}₺</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Features */}
                        {features.length > 0 && (
                            <section data-aos="fade-up">
                                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Olanaklar</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {features.map((f, i) => (
                                        <div key={i} style={{
                                            padding: '10px 20px', background: '#F0F9FF',
                                            color: '#0369A1', borderRadius: '50px',
                                            fontWeight: '600', fontSize: '14px', border: '1px solid #BAE6FD'
                                        }}>
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Side: Sidebar */}
                    <aside>
                        <div style={{ position: 'sticky', top: '100px' }} data-aos="fade-left">
                            {/* Contact Card */}
                            <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '25px', marginBottom: '30px' }}>
                                <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '25px' }}>İletişim & Konum</h4>

                                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                                    <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EA580C' }}>
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '13px', color: '#666' }}>Telefon</div>
                                        <div style={{ fontWeight: '700' }}>{place.phone || 'Belirtilmemiş'}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                                    <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '13px', color: '#666' }}>Adres</div>
                                        <div style={{ fontWeight: '700', fontSize: '14px' }}>{place.address}</div>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '15px', borderRadius: '15px', backgroundColor: '#111827', border: 'none' }}
                                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address || place.title)}`, '_blank')}
                                >
                                    Yol Tarifi Al
                                </button>
                            </div>

                            {/* Hours Card */}
                            <div style={{ background: '#fff', border: '1px solid #eee', padding: '30px', borderRadius: '25px' }}>
                                <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Çalışma Saatleri</h4>
                                {place.hoursEveryday ? (
                                    <div style={{ padding: '15px', background: '#ECFDF5', borderRadius: '12px', color: '#059669', fontWeight: '700', textAlign: 'center' }}>
                                        Hergün: {place.hoursEveryday}
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gap: '10px' }}>
                                        {days.map((d, i) => (
                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: d.value ? '#333' : '#999' }}>
                                                <span>{d.label}</span>
                                                <span style={{ fontWeight: '600' }}>{d.value || 'Kapalı'}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default FoodPlace;
