
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SubCategories from './pages/SubCategories';
import SubCategoryItems from './pages/SubCategoryItems';
import Place from './pages/Place';
import FoodPlace from './pages/FoodPlace';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { visitorService } from './visitorService';
import { Toaster } from 'react-hot-toast';
import './style.css';

const AppContent: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Visitor Tracking
    visitorService.trackVisitor();

    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Init/Refresh AOS on route change
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
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-wrapper">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            color: '#fff',
            padding: '12px 20px',
          },
          success: {
            style: {
              background: '#2e7d32', // Professional neutral green
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#2e7d32',
            },
          },
          error: {
            style: {
              background: '#d32f2f', // Soft professional red
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#d32f2f',
            },
          },
        }}
      />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<SubCategories />} />
          <Route path="/subcategory/:subCategoryId" element={<SubCategoryItems />} />
          <Route path="/detail/place/:id" element={<Place />} />
          <Route path="/detail/food_place/:id" element={<FoodPlace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <button
        className={`scroll-top ${scrolled ? 'active' : ''}`}
        onClick={scrollToTop}
        style={{ display: scrolled ? 'flex' : 'none' }}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
