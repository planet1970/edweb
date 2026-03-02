import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, getImageUrl } from '../api';

const BusinessStories: React.FC = () => {
    const [stories, setStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await api.get('/web-home/ads/story');
                const sortedStories = Array.isArray(response.data)
                    ? response.data
                        .filter((s: any) => s.isActive)
                        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                    : [];
                setStories(sortedStories);
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
                        {stories.map((story) => {
                            const isExternal = story.link?.startsWith('http');
                            const isValidLink = story.link && story.link !== '#';

                            const StoryContent = (
                                <>
                                    <div className={`story-ring ${story.isNew ? 'new' : ''}`}>
                                        <div className="story-image">
                                            <img src={getImageUrl(story.imageUrl)} alt={story.title} />
                                        </div>
                                    </div>
                                    <span className="story-name">{story.title}</span>
                                </>
                            );

                            if (!isValidLink) {
                                return (
                                    <div key={story.id} className="story-item opacity-80 cursor-default">
                                        {StoryContent}
                                    </div>
                                );
                            }

                            return isExternal ? (
                                <a key={story.id} href={story.link} className="story-item" target="_blank" rel="noopener noreferrer">
                                    {StoryContent}
                                </a>
                            ) : (
                                <Link key={story.id} to={story.link} className="story-item">
                                    {StoryContent}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessStories;
