import React, { useEffect, useState } from 'react';
import { api } from '../api';

interface AboutCard {
    id: number;
    icon: string;
    title: string;
    summary: string;
    content: string;
    isActive: boolean;
}

interface AboutSection {
    title: string;
    description: string;
    cards: AboutCard[];
}

const AboutEdirne: React.FC = () => {
    const [section, setSection] = useState<AboutSection | null>(null);
    const [selectedCard, setSelectedCard] = useState<AboutCard | null>(null);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await api.get('/web-home/about');
                setSection(response.data);
            } catch (error) {
                console.error("About verisi yüklenemedi", error);
            }
        };
        fetchAbout();
    }, []);

    // Refresh AOS whenever data changes
    useEffect(() => {
        if (section) {
            const refreshAOS = () => {
                // @ts-ignore
                if (window.AOS) {
                    // @ts-ignore
                    window.AOS.refresh();
                }
            };

            // Multiple refreshes to catch DOM updates
            refreshAOS();
            const t1 = setTimeout(refreshAOS, 100);
            const t2 = setTimeout(refreshAOS, 500);
            const t3 = setTimeout(refreshAOS, 1000);

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
            };
        }
    }, [section]);

    if (!section) return null;

    const activeCards = section.cards?.filter(c => c.isActive) || [];

    const getIconClass = (iconName: string) => {
        if (!iconName) return 'fas fa-info-circle';
        if (iconName.startsWith('fa')) return iconName;

        // Basic mapping for common Lucide icons to FontAwesome
        const map: { [key: string]: string } = {
            'Landmark': 'fas fa-landmark',
            'Mosque': 'fas fa-mosque',
            'Star': 'fas fa-star',
            'Crown': 'fas fa-crown',
            'Trophy': 'fas fa-trophy',
            'History': 'fas fa-history',
            'MapPin': 'fas fa-map-marker-alt',
            'Info': 'fas fa-info-circle',
            'Heart': 'fas fa-heart',
            'Camera': 'fas fa-camera',
            'Utensils': 'fas fa-utensils',
            'Coffee': 'fas fa-coffee',
            'Settings': 'fas fa-cog',
            'Search': 'fas fa-search',
            'User': 'fas fa-user',
            'Bell': 'fas fa-bell',
            'Home': 'fas fa-home',
            'Calendar': 'fas fa-calendar',
            'Mail': 'fas fa-envelope',
            'Phone': 'fas fa-phone'
        };

        const faName = map[iconName] || `fas fa-${iconName.toLowerCase().replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;
        return faName;
    };

    return (
        <section className="features" id="about">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">{section.title}</span>
                    <h2 className="section-title">{section.description}</h2>
                </div>

                <div className="features-grid dinamik-grid">
                    {activeCards.map((card) => (
                        <div
                            key={card.id}
                            className="feature-card-premium"
                        >
                            <div className="feature-icon-wrapper">
                                <i className={getIconClass(card.icon || '')}></i>
                            </div>
                            <h3>{card.title}</h3>
                            <p>{card.summary}</p>
                            <div className="feature-card-footer">
                                <button
                                    className="read-more-link"
                                    onClick={() => setSelectedCard(card)}
                                    aria-label={`Devamını Oku: ${card.title}`}
                                >
                                    <span>Devamını Oku</span>
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedCard && (
                <div className="about-modal-overlay" onClick={() => setSelectedCard(null)}>
                    <div className="about-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="about-modal-close" onClick={() => setSelectedCard(null)}>
                            <i className="fas fa-times"></i>
                        </button>
                        <div className="about-modal-header">
                            <div className="about-modal-icon">
                                <i className={getIconClass(selectedCard.icon || '')}></i>
                            </div>
                            <h3>{selectedCard.title}</h3>
                        </div>
                        <div className="about-modal-body">
                            <p className="modal-summary">{selectedCard.summary}</p>
                            <div className="modal-divider"></div>
                            <p className="modal-content">{selectedCard.content}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AboutEdirne;
