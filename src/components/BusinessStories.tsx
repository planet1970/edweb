
import React from 'react';

const storiesData = [
    { id: 1, name: "Lalezar Restoran", image: "/images/featured/ciger.png", isNew: true, link: "#" },
    { id: 2, name: "Hilly Hotel", image: "/images/featured/hotel.png", isNew: false, link: "#" },
    { id: 3, name: "Meriç Cafe", image: "/images/featured/cafe.png", isNew: true, link: "#" },
    { id: 4, name: "Tarihi Arasta", image: "images/kategoriler/alisveris.png", isNew: false, link: "#" },
    { id: 5, name: "Selimiye Camii", image: "images/populer/selimiye.png", isNew: false, link: "#" },
    { id: 6, name: "Köfteci Osman", image: "images/kategoriler/yeme-icme.png", isNew: true, link: "#" }
];

const BusinessStories: React.FC = () => {
    return (
        <div className="business-stories-section">
            <div className="container">
                <div className="business-stories-wrapper">
                    <div className="stories-container">
                        {storiesData.map((story) => (
                            <a key={story.id} href={story.link} className="story-item">
                                <div className={`story-ring ${story.isNew ? 'new' : ''}`}>
                                    <div className="story-image">
                                        <img src={story.image} alt={story.name} />
                                    </div>
                                </div>
                                <span className="story-name">{story.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessStories;
