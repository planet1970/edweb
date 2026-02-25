
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SubCategories from './pages/SubCategories';
import SubCategoryItems from './pages/SubCategoryItems';
import Place from './pages/Place';
import FoodPlace from './pages/FoodPlace';
import './style.css';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Init AOS
    // @ts-ignore
    if (window.AOS) {
      // @ts-ignore
      window.AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<SubCategories />} />
            <Route path="/subcategory/:subCategoryId" element={<SubCategoryItems />} />
            <Route path="/detail/place/:id" element={<Place />} />
            <Route path="/detail/food_place/:id" element={<FoodPlace />} />
            {/* Placeholder for future routes */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />

        {/* Scroll to Top Button */}
        <button
          className={`scroll-top ${scrolled ? 'active' : ''}`}
          onClick={scrollToTop}
          style={{ display: scrolled ? 'flex' : 'none' }}
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>
    </Router>
  );
};

export default App;
