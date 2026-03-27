import React, { useEffect, useState, useRef } from 'react';
import { api } from '../api';

const NewsTicker: React.FC = () => {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedNews, setSelectedNews] = useState<any | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await api.get('/web-home/news');
                setNews(response.data || []);
            } catch (error) {
                console.error("Haberler yüklenemedi:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // Handle smooth dragging for ticker or just let CSS do its thing
    if (loading || news.length === 0) return null;

    return (
        <>
            <div className="nt-wrapper" title="Edirne'den Haberler">
                <div className="nt-label">
                    <i className="fas fa-bolt mr-2 text-amber-500 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></i>
                    SON DAKİKA
                </div>

                <div className="nt-container" ref={scrollContainerRef}>
                    <div className="nt-scroll-wrapper">
                        <div className="nt-track">
                            {news.slice(0, 10).map((item, index) => (
                                <div
                                    key={`news-a-${index}`}
                                    className="nt-item"
                                    onClick={() => setSelectedNews(item)}
                                >
                                    <span className="nt-time">
                                        {new Date(item.pubDate).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <span className="nt-title">
                                        {(() => {
                                            const lastDashIndex = item.title.lastIndexOf(' - ');
                                            if (lastDashIndex === -1) return item.title;
                                            const title = item.title.substring(0, lastDashIndex);
                                            const source = item.title.substring(lastDashIndex + 3);
                                            return `${title} (${source})`;
                                        })()}
                                    </span>
                                    <span className="nt-divider">|</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedNews && (
                <div className="nt-modal-overlay">
                    <div
                        className="nt-modal-backdrop"
                        onClick={() => setSelectedNews(null)}
                    ></div>
                    <div className="nt-modal-content">
                        <button
                            onClick={() => setSelectedNews(null)}
                            className="nt-modal-close"
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        <div className="nt-modal-meta">
                            <span className="nt-modal-source">
                                <i className="fas fa-newspaper"></i>
                                {selectedNews.source}
                            </span>
                            <span className="nt-modal-date">
                                <i className="far fa-clock"></i>
                                {new Date(selectedNews.pubDate).toLocaleDateString('tr-TR', {
                                    day: 'numeric', month: 'long', year: 'numeric',
                                    hour: '2-digit', minute: '2-digit'
                                })}
                            </span>
                        </div>

                        <h2 className="nt-modal-title">
                            {selectedNews.title}
                        </h2>

                        {selectedNews.contentSnippet && (
                            <div
                                className="nt-modal-body"
                                dangerouslySetInnerHTML={{ __html: selectedNews.contentSnippet }}
                            />
                        )}

                        <div className="nt-modal-footer">
                            <a
                                href={selectedNews.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="nt-modal-btn"
                            >
                                Haberin Tamamı <i className="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewsTicker;
