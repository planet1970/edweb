
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import SocialBar from '../components/SocialBar';
import { api } from '../api';
import type { Category } from '../types';
import FullScreenLoader from '../components/FullScreenLoader';

import FeaturedBusinesses from '../components/FeaturedBusinesses';
import BusinessStories from '../components/BusinessStories';
import HomeCategories from '../components/HomeCategories';
import PopularPlaces from '../components/PopularPlaces';
import AboutEdirne from '../components/AboutEdirne';
import ContactSection from '../components/ContactSection';
import AdPopup from '../components/AdPopup';

const Home: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    // Section Visibility States - Toggle these to show/hide sections
    const [visibleSections] = useState({
        hero: true,
        socialBar: true,
        stories: true,
        categories: true,
        popularPlaces: true,
        featured: true,
        about: true,
        contact: true,
        adPopup: true
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get<Category[]>('/categories');
                setCategories(response.data.filter(c => c.isActive).sort((a, b) => (a.order || 0) - (b.order || 0)));
            } catch (error) {
                console.error("Kategoriler yüklenemedi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!loading) {
            // @ts-ignore
            if (window.AOS) {
                // @ts-ignore
                window.AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true,
                    mirror: false
                });
                // @ts-ignore
                window.AOS.refresh();
            }
        }
    }, [loading]);

    if (loading) return <FullScreenLoader />;

    return (
        <>
            {visibleSections.hero && <Hero />}
            {visibleSections.socialBar && <SocialBar />}
            {visibleSections.stories && <BusinessStories />}
            {visibleSections.categories && <HomeCategories categories={categories} />}
            {visibleSections.popularPlaces && <PopularPlaces />}
            {visibleSections.featured && <FeaturedBusinesses />}
            {visibleSections.about && <AboutEdirne />}
            {visibleSections.contact && <ContactSection />}
            {visibleSections.adPopup && <AdPopup />}
        </>
    );
};

export default Home;