
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, getImageUrl } from '../api';
import type { Category, SubCategory } from '../types';

const SubCategories: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [category, setCategory] = useState<Category | null>(null);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        console.log(`[SubCategories] Veriler çekiliyor... CategoryID: ${categoryId}`);
        try {
            // Fetch category details
            const catRes = await api.get<Category>(`/categories/${categoryId}`);
            console.log(`[SubCategories] Ana Kategori:`, catRes.data);
            // Removed: if (!catRes.data) throw new Error("Kategori datası boş geldi.");
            setCategory(catRes.data);

            // Fetch subcategories
            const subRes = await api.get<SubCategory[]>(`/subcategories?categoryId=${categoryId}`);
            console.log(`[SubCategories] Gelen Alt Kategoriler (Ham):`, subRes.data);

            // Filtreleme: isActive false olmayanları al
            const filtered = subRes.data
                .filter(s => s.isActive !== false)
                .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

            console.log(`[SubCategories] Filtrelenmiş Liste (${filtered.length} adet):`, filtered);
            setSubCategories(filtered);
        } catch (err: any) {
            console.error("[SubCategories] Hata:", err);
            setError(err.response?.data?.message || err.message || "Veriler alınamadı.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        // @ts-ignore
        if (typeof window !== 'undefined' && window.AOS) {
            // @ts-ignore
            window.AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
        }
    }, [categoryId]);

    useEffect(() => {
        // İçerik değiştiğinde AOS'u yenile
        // @ts-ignore
        if (typeof window !== 'undefined' && window.AOS) {
            // @ts-ignore
            window.AOS.refresh();
        }
    }, [subCategories, loading]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryId]);

    if (loading) {
        return (
            <div className="loading-state" style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
                <div className="spinner"></div>
                <p style={{ marginLeft: '15px', fontWeight: '500', color: '#666' }}>Veriler Hazırlanıyor...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container" style={{ padding: '150px 20px', textAlign: 'center', minHeight: '80vh' }}>
                <div className="container">
                    <div className="error-card" style={{
                        background: '#fff',
                        padding: '50px',
                        borderRadius: '20px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        <i className="fas fa-exclamation-circle" style={{ fontSize: '60px', color: '#ff4757', marginBottom: '20px' }}></i>
                        <h2 style={{ marginBottom: '15px' }}>Bağlantı Sorunu</h2>
                        <p style={{ color: '#666', marginBottom: '30px' }}>{error}</p>
                        <button onClick={fetchData} className="btn btn-primary">Tekrar Dene</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="subcategories-page">
            {/* Header / Breadcrumb */}
            <section className="page-header">
                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/">Ana Sayfa</Link>
                        <i className="fas fa-chevron-right"></i>
                        <span>{category?.title}</span>
                    </div>
                    <h1 className="page-title">
                        {category?.title}
                    </h1>
                    <p className="page-subtitle">
                        {category?.description || 'Edirne\'nin keşfedilmeyi bekleyen eşsiz mekanları.'}
                    </p>
                </div>
            </section>

            {/* Subcategories Grid */}
            <section className="subcategories-list section-padding">
                <div className="container">
                    {subCategories.length > 0 ? (
                        <div className="subcat-grid">
                            {subCategories.map((sub) => (
                                <div key={sub.id} className="subcat-card">
                                    <div className="subcat-image">
                                        <img
                                            src={sub.imageUrl ? getImageUrl(sub.imageUrl) : '/images/placeholder.jpg'}
                                            alt={sub.title}
                                        />
                                        <div className="subcat-overlay">
                                            <Link to={`/subcategory/${sub.id}`} className="btn btn-white btn-sm">İncele</Link>
                                        </div>
                                    </div>
                                    <div className="subcat-info">
                                        <h3>{sub.title}</h3>
                                        <p>{sub.description}</p>
                                        <Link to={`/subcategory/${sub.id}`} className="read-more">
                                            Detaylar <i className="fas fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <i className="fas fa-folder-open"></i>
                            <p>Bu kategoride henüz alt kategori bulunmuyor.</p>
                            <Link to="/" className="btn btn-primary">Geri Dön</Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default SubCategories;
