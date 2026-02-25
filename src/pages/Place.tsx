
import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { api, getImageUrl } from '../api';
import type { Place as PlaceType } from '../types';
import FullScreenLoader from '../components/FullScreenLoader';

const Place: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [place, setPlace] = useState<PlaceType | null>(location.state?.place || null);
    const [loading, setLoading] = useState(!place);

    const fetchData = async () => {
        // Only set loading if we don't have data from state
        if (!place) setLoading(true);
        try {
            const res = await api.get<PlaceType>(`/places/${id}`);
            setPlace(res.data);
            console.log("[Place] Data loaded:", res.data);
        } catch (err) {
            console.error("[Place] Error loading data:", err);
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
            window.AOS.init({
                duration: 1000,
                once: true
            });
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

    const cardStyle = { color: '#FFF8F0', borderColor: '#FFE4CC', textColor: '#1A1A2E', iconColor: '#FF6B35' };
    const infoCards = [
        { icon: 'exclamation-triangle', title: place.title1, info: place.info1, ...cardStyle },
        { icon: 'info-circle', title: place.title2, info: place.info2, ...cardStyle },
        { icon: 'clock', title: place.title3, info: place.info3, ...cardStyle },
        { icon: 'building', title: place.title4, info: place.info4, ...cardStyle },
    ].filter(card => card.title && card.info);

    const areas = [
        place.area1, place.area2, place.area3, place.area4, place.area5,
        place.area6, place.area7, place.area8, place.area9, place.area10
    ].filter(a => a);

    return (
        <div className="place-detail-page" style={{ background: '#fff', minHeight: '100vh' }}>
            {/* Hero Section */}
            <header style={{
                height: '70vh',
                position: 'relative',
                overflow: 'hidden',
                background: '#1a1a1a'
            }}>
                <img
                    src={place.back_pic_url ? getImageUrl(place.back_pic_url) : '/images/placeholder.jpg'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                    alt={place.title}
                />
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '0 0 80px 0'
                }}>
                    <div className="container" data-aos="fade-up">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div style={{
                                background: '#FF6B35',
                                color: '#fff',
                                padding: '8px 20px',
                                borderRadius: '50px',
                                fontSize: '14px',
                                fontWeight: '700',
                                letterSpacing: '1px'
                            }}>
                                {place.source?.toUpperCase() || 'KEŞFET'}
                            </div>
                            {place.rating && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#FFB627', fontWeight: '700' }}>
                                    <i className="fas fa-star"></i>
                                    <span>{place.rating}</span>
                                </div>
                            )}
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(36px, 6vw, 72px)',
                            fontWeight: 800,
                            color: '#fff',
                            marginBottom: '20px',
                            fontFamily: "'Playfair Display', serif"
                        }}>
                            {place.title}
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '20px', maxWidth: '800px', lineHeight: '1.6' }}>
                            {place.description}
                        </p>
                    </div>
                </div>
            </header>

            {/* Content Section */}
            <main className="container" style={{ padding: '80px 15px', marginTop: '-40px', position: 'relative', zIndex: 10 }}>
                {/* Info Grid */}
                {infoCards.length > 0 && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '20px',
                        marginBottom: '60px'
                    }}>
                        {infoCards.map((card, idx) => (
                            <div key={idx} data-aos="zoom-in" data-aos-delay={idx * 100} style={{
                                background: card.color,
                                border: `2px solid ${card.borderColor}`,
                                padding: '30px 20px',
                                borderRadius: '24px',
                                textAlign: 'center',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.04)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    width: '60px', height: '60px',
                                    background: '#fff', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '28px', marginBottom: '20px', color: card.iconColor,
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                                }}>
                                    <i className={`fas fa-${card.icon || 'info-circle'}`}></i>
                                </div>
                                <h4 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px', color: '#666', letterSpacing: '1px' }}>
                                    {card.title}
                                </h4>
                                <p style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: card.textColor }}>
                                    {card.info}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div data-aos="fade-up">
                        {/* Panel 1 */}
                        {(place.panel1_title || place.panel1) && (
                            <section style={{ marginBottom: '20px', background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
                                {place.panel1_title && <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 15px 0', color: '#1A1A2E' }}>{place.panel1_title}</h3>}
                                {place.panel1_title && place.panel1 && <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '0 0 20px 0' }} />}
                                {place.panel1 && <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#444', margin: 0 }}>{place.panel1}</p>}
                            </section>
                        )}

                        {/* Panel 2 */}
                        {(place.panel2_title || place.panel2) && (
                            <section style={{ marginBottom: '20px', background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
                                {place.panel2_title && <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 15px 0', color: '#1A1A2E' }}>{place.panel2_title}</h3>}
                                {place.panel2_title && place.panel2 && <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '0 0 20px 0' }} />}
                                {place.panel2 && <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#444', margin: 0 }}>{place.panel2}</p>}
                            </section>
                        )}

                        {/* Highlight Panel 1 */}
                        {(place.panel_col_title || place.panel_col) && (
                            <div style={{
                                background: '#FFF5E6',
                                padding: '30px',
                                borderRadius: '16px',
                                borderLeft: '5px solid #FF6B35',
                                marginBottom: '20px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                            }}>
                                {place.panel_col_title && <h4 style={{ color: '#B45309', margin: '0 0 15px 0', fontSize: '20px' }}>{place.panel_col_title}</h4>}
                                {place.panel_col_title && place.panel_col && <div style={{ height: '1px', background: 'rgba(180,83,9,0.15)', margin: '0 0 20px 0' }} />}
                                {place.panel_col && <p style={{ margin: 0, fontSize: '17px', lineHeight: '1.6', color: '#92400E' }}>{place.panel_col}</p>}
                            </div>
                        )}

                        {/* Panel 3 */}
                        {(place.panel3_title || place.panel3) && (
                            <section style={{ marginBottom: '20px', background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
                                {place.panel3_title && <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 15px 0', color: '#1A1A2E' }}>{place.panel3_title}</h3>}
                                {place.panel3_title && place.panel3 && <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '0 0 20px 0' }} />}
                                {place.panel3 && <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#444', margin: 0 }}>{place.panel3}</p>}
                            </section>
                        )}

                        {/* Panel 4 */}
                        {(place.panel4_title || place.panel4) && (
                            <section style={{ marginBottom: '20px', background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
                                {place.panel4_title && <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 15px 0', color: '#1A1A2E' }}>{place.panel4_title}</h3>}
                                {place.panel4_title && place.panel4 && <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '0 0 20px 0' }} />}
                                {place.panel4 && <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#444', margin: 0 }}>{place.panel4}</p>}
                            </section>
                        )}

                        {/* Highlight Panel 2 */}
                        {(place.panel_col_title2 || place.panel_col2) && (
                            <div style={{
                                background: '#F0F9FF',
                                padding: '30px',
                                borderRadius: '16px',
                                borderLeft: '5px solid #0EA5E9',
                                marginBottom: '20px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                            }}>
                                {place.panel_col_title2 && <h4 style={{ color: '#0369A1', margin: '0 0 15px 0', fontSize: '20px' }}>{place.panel_col_title2}</h4>}
                                {place.panel_col_title2 && place.panel_col2 && <div style={{ height: '1px', background: 'rgba(3,105,161,0.15)', margin: '0 0 20px 0' }} />}
                                {place.panel_col2 && <p style={{ margin: 0, fontSize: '17px', lineHeight: '1.6', color: '#0C4A6E' }}>{place.panel_col2}</p>}
                            </div>
                        )}

                        {/* Specialized Areas (List) */}
                        {areas.length > 0 && (
                            <div style={{ marginBottom: '20px', background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
                                {place.panel5_title && <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 15px 0', color: '#1A1A2E' }}>{place.panel5_title}</h3>}
                                {place.panel5_title && <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '0 0 20px 0' }} />}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {areas.map((area, idx) => (
                                        <div key={idx} style={{
                                            padding: '20px', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #eee'
                                        }}>
                                            {area}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Place;
