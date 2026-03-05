
import React, { useState, useEffect } from 'react';
import { api } from '../api';

const ContactSection: React.FC = () => {
    const [contactInfo, setContactInfo] = useState({
        phone: '',
        email: '',
        address: '',
        workingHours: '',
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: ''
    });

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await api.get('/web-home/social');
                if (response.data) {
                    setContactInfo(response.data);
                }
            } catch (error) {
                console.error('İletişim bilgileri alınamadı:', error);
            }
        };
        fetchContactInfo();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.post('/contact-messages', formData);
            setStatus('success');
            setMessage('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            setMessage('Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
    };

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
                                <p style={{ whiteSpace: 'pre-wrap' }}>{contactInfo.address || 'Adres bilgisi girilmemiş'}</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-phone"></i>
                            </div>
                            <div>
                                <h4>Telefon</h4>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{contactInfo.phone || 'Telefon bilgisi girilmemiş'}</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div>
                                <h4>E-posta</h4>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{contactInfo.email || 'E-posta bilgisi girilmemiş'}</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-clock"></i>
                            </div>
                            <div>
                                <h4>Çalışma Saatleri</h4>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{contactInfo.workingHours || 'Çalışma saati bilgisi girilmemiş'}</p>
                            </div>
                        </div>

                        <div className="social-links">
                            {contactInfo.facebook && <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>}
                            {contactInfo.instagram && <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>}
                            {contactInfo.twitter && <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>}
                            {contactInfo.youtube && <a href={contactInfo.youtube} target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>}
                        </div>
                    </div>

                    <form className="contact-form" data-aos="fade-left" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Adınız *"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="E-posta *"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group" style={{ width: '100%' }}>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Konu"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={6}
                                placeholder="Mesajınız *"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                        </button>

                        {status === 'success' && (
                            <div className="form-message success" style={{ color: '#28a745', marginTop: '15px' }}>
                                {message}
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="form-message error" style={{ color: '#dc3545', marginTop: '15px' }}>
                                {message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
