
import React from 'react';

const ContactSection: React.FC = () => {
    return (
        <section className="contact" id="contact">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <span className="section-subtitle">İletişim</span>
                    <h2 className="section-title">Bizimle İletişime Geçin</h2>
                </div>

                <div className="contact-wrapper">
                    <div className="contact-info" data-aos="fade-right">
                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div>
                                <h4>Adres</h4>
                                <p>Meydan Mah. Mimar Sinan Cad.<br />Merkez, Edirne</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-phone"></i>
                            </div>
                            <div>
                                <h4>Telefon</h4>
                                <p>+90 284 225 18 26<br />+90 532 123 45 67</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div>
                                <h4>E-posta</h4>
                                <p>info@edirnerehberi.com<br />destek@edirnerehberi.com</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-clock"></i>
                            </div>
                            <div>
                                <h4>Çalışma Saatleri</h4>
                                <p>Pazartesi - Cuma: 09:00 - 18:00<br />Cumartesi: 10:00 - 16:00</p>
                            </div>
                        </div>

                        <div className="social-links">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    <form className="contact-form" data-aos="fade-left">
                        <div className="form-row">
                            <div className="form-group">
                                <input type="text" placeholder="Adınız *" required />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="E-posta *" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <input type="tel" placeholder="Telefon *" required />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Konu" />
                            </div>
                        </div>

                        <div className="form-group">
                            <textarea rows={6} placeholder="Mesajınız *" required></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg">Mesaj Gönder</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
