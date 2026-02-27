
import React from 'react';

const storiesData = [
    { id: 1, name: "Ciğerci Lale", image: "/images/featured/ciger.png", isNew: true },
    { id: 2, name: "Hilly Hotel", image: "/images/featured/hotel.png", isNew: false },
    { id: 3, name: "Meriç Cafe", image: "/images/featured/cafe.png", isNew: true },
    { id: 4, name: "Tarihi Arasta", image: "images/kategoriler/alisveris.png", isNew: false },
    { id: 5, name: "Selimiye", image: "images/populer/selimiye.png", isNew: false },
    { id: 6, name: "Köfteci Osman", image: "images/kategoriler/yeme-icme.png", isNew: true },
    { id: 7, name: "Zindan Han", image: "images/kategoriler/tarihi-yerler.png", isNew: false },
    { id: 8, name: "Kırkpınar", image: "images/kategoriler/kultur-sanat.png", isNew: false },
];

const BusinessStories: React.FC = () => {
    return (
        <div className="business-stories-wrapper">
            <div className="container">
                <div className="stories-container">
                    {storiesData.map((story) => (
                        <div key={story.id} className="story-item">
                            <div className={`story-ring ${story.isNew ? 'new' : ''}`}>
                                <div className="story-image">
                                    <img src={story.image} alt={story.name} />
                                </div>
                            </div>
                            <span className="story-name">{story.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BusinessStories;
