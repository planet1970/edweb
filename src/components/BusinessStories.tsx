import React, { useEffect, useState } from 'react';
import { api, getImageUrl } from '../api';

const BusinessStories: React.FC = () => {
    const [stories, setStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await api.get('/web-home/ads/story');
                setStories(Array.isArray(response.data) ? response.data.filter((s: any) => s.isActive) : []);
            } catch (error) {
                console.error("Hikayeler yüklenemedi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, []);

    if (loading || stories.length === 0) return null;

    return (
        <div className="business-stories-section">
            <div className="container">
                <div className="business-stories-wrapper">
                    <div className="stories-container">
                        {stories.map((story) => (
                            <a key={story.id} href={story.link} className="story-item">
                                <div className={`story-ring ${story.isNew ? 'new' : ''}`}>
                                    <div className="story-image">
                                        <img src={getImageUrl(story.imageUrl)} alt={story.title} />
                                    </div>
                                </div>
                                <span className="story-name">{story.title}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessStories;
