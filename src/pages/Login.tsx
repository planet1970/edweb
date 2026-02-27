
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, getImageUrl } from '../api';
import { visitorService } from '../visitorService';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [navbarData, setNavbarData] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNavbarData = async () => {
            try {
                const response = await api.get('/web-home/navbar');
                setNavbarData(response.data);
            } catch (error) {
                console.error("Navbar data fetch error:", error);
            }
        };
        fetchNavbarData();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const visitorId = visitorService.getVisitorId();
            const response = await api.post('/visitors/login', {
                email,
                password,
                visitorId
            });

            if (response.data) {
                visitorService.setDisplayName(response.data.username || response.data.name);
                visitorService.setFullName(response.data.name);
                visitorService.setEmail(response.data.email);

                if (response.data.imageUrl) {
                    visitorService.setUserImage(response.data.imageUrl);
                }
                navigate('/');
                window.location.reload();
            }
        } catch (error: any) {
            console.error("Login failed", error);
            alert(error.response?.data?.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card" data-aos="zoom-in">
                <div className="login-header">
                    <Link to="/" className="login-logo-centered">
                        {navbarData?.logoUrl ? (
                            <img src={getImageUrl(navbarData.logoUrl)} alt="Logo" />
                        ) : (
                            <i className="fas fa-landmark"></i>
                        )}
                        <span>{navbarData?.title || 'Edirne Rehberi'}</span>
                    </Link>
                    <div className="login-title-small">Tekrar Hoş Geldiniz</div>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>E-Posta</label>
                        <div className="input-with-icon">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                placeholder="E-posta adresiniz"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Şifre</label>
                        <div className="input-with-icon">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                placeholder="Şifreniz"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Giriş Yap'}
                    </button>
                </form>

                <div className="login-footer-box">
                    <span>Henüz üye değil misiniz?</span>
                    <Link to="/profile" className="register-link-btn">Hemen Kayıt Ol</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
