
import React, { useEffect, useState, useCallback } from 'react';
import { api, getImageUrl } from '../api';
import type { WebHeroSlide } from '../types';

const Hero: React.FC = () => {
    const [slides, setSlides] = useState<WebHeroSlide[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchSlides = async () => {
        try {
            const response = await api.get('/web-home/hero');
            setSlides(response.data);
        } catch (error) {
            console.error('Hero slides fetch failed', error);
        }
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, [slides.length]);

    useEffect(() => {
        if (slides.length > 0) {
            const interval = setInterval(nextSlide, 8000);
            return () => clearInterval(interval);
        }
    }, [slides.length, nextSlide]);

    if (slides.length === 0) return null;

    return (
        <section className="hero" id="home">
            <div className="hero-slider">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
                        style={{ '--hero-bg': `url(${getImageUrl(slide.imageUrl)})` } as React.CSSProperties}
                    >
                        <div className="hero-overlay"></div>
                        <div className="container">
                            <div className="hero-content">
                                {slide.title && (
                                    <span
                                        className="hero-subtitle"
                                        style={{
                                            color: slide.titleColor || 'var(--accent-color)',
                                            textShadow: slide.titleShadowColor ? `2px 2px 10px ${slide.titleShadowColor}` : '2px 2px 10px rgba(0,0,0,0.9)'
                                        }}
                                    >
                                        {slide.title}
                                    </span>
                                )}
                                {slide.subtitle && (
                                    <h1
                                        className="hero-title"
                                        style={{
                                            color: slide.subtitleColor || 'var(--white)',
                                            textShadow: slide.titleShadowColor ? `2px 2px 20px ${slide.titleShadowColor}` : '2px 2px 20px rgba(0,0,0,0.9)'
                                        }}
                                        dangerouslySetInnerHTML={{ __html: slide.subtitle.replace(/\n/g, '<br>') }}
                                    />
                                )}
                                {slide.description && (
                                    <p
                                        className="hero-description"
                                        style={{
                                            color: slide.descriptionColor || 'rgba(255, 255, 255, 1)',
                                            textShadow: slide.titleShadowColor ? `1px 1px 10px ${slide.titleShadowColor}` : '1px 1px 10px rgba(0,0,0,0.9)'
                                        }}
                                    >
                                        {slide.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hero-controls">
                <button className="hero-prev" onClick={prevSlide}><i className="fas fa-chevron-left"></i></button>
                <button className="hero-next" onClick={nextSlide}><i className="fas fa-chevron-right"></i></button>
            </div>

            <div className="hero-dots">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default Hero;
