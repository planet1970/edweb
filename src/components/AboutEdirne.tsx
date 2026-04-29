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
        
        // Handle full FontAwesome classes
        if (iconName.startsWith('fa')) return iconName;
        if (iconName.includes('fas fa-')) return iconName;

        // Map Lucide icons to FontAwesome
        const map: { [key: string]: string } = {
            'Landmark': 'landmark',
            'Mosque': 'mosque',
            'Star': 'star',
            'Crown': 'crown',
            'Trophy': 'trophy',
            'History': 'history',
            'MapPin': 'map-marker-alt',
            'Info': 'info-circle',
            'Heart': 'heart',
            'Camera': 'camera',
            'Utensils': 'utensils',
            'Coffee': 'coffee',
            'Settings': 'cog',
            'Search': 'search',
            'User': 'user',
            'Bell': 'bell',
            'Home': 'home',
            'Calendar': 'calendar',
            'Mail': 'envelope',
            'Phone': 'phone',
            'Shield': 'shield-halved',
            'Users': 'users',
            'Clock': 'clock',
            'Building': 'building',
            'ShoppingBag': 'shopping-bag',
            'Dumbbell': 'dumbbell',
            'Zap': 'bolt',
            'HelpCircle': 'question-circle',
            'CheckCircle': 'check-circle'
        };

        const faIcon = map[iconName] || iconName.toLowerCase().replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        return `fas fa-${faIcon}`;
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
