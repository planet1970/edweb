
import React from 'react';
import { Link } from 'react-router-dom';
import type { Category } from '../types';

interface HomeCategoriesProps {
    categories: Category[];
}

const HomeCategories: React.FC<HomeCategoriesProps> = ({ categories }) => {
    const getIconClass = (category: Category) => {
        return category.webIcon || 'fas fa-map-marked-alt';
    };

    return (
        <section className="categories" id="categories">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <span className="section-subtitle">Kategorilere Göz Atın</span>
                    <h2 className="section-title">Edirne'yi Keşfedin</h2>
                </div>

                <div className="categories-grid">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className="category-card"
                            data-aos="fade-up"
                            data-aos-delay={100 + (index * 50)}
                        >
                            <div className="category-icon">
                                <i className={getIconClass(category)}></i>
                            </div>
                            <h3>{category.title}</h3>
                            <p>{category.description}</p>
                            <Link to={`/category/${category.id}`} className="category-link">
                                <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    ))}
                    {categories.length === 0 && (
                        <p className="text-center w-full text-gray-400">Kategoriler yükleniyor...</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HomeCategories;
