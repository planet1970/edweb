
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { visitorService } from '../visitorService';
import { api, getImageUrl } from '../api';
import { toast } from 'react-hot-toast';

const Profile: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        imageUrl: '',
        isEdirnelim: false
    });
    const [originalUsername, setOriginalUsername] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        const name = visitorService.getUsername();
        setOriginalUsername(name);

        // Fetch current profile data
        const loadProfile = async () => {
            const fingerprint = visitorService.getVisitorId();
            try {
                const response = await api.get(`/visitors/${fingerprint}`);
                if (response.data) {
                    setProfile({
                        name: response.data.name || '',
                        username: response.data.username || '',
                        email: response.data.email || '',
                        password: '', // Don't load password
                        phone: response.data.phone || '',
                        imageUrl: response.data.imageUrl || '',
                        isEdirnelim: response.data.isEdirnelim || false
                    });
                }
            } catch (error) {
                console.error("Failed to load profile", error);
            }
        };
        loadProfile();

        // Refresh AOS for navigation
        // @ts-ignore
        if (window.AOS) {
            // @ts-ignore
            window.AOS.refresh();
        }

        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const fingerprint = visitorService.getVisitorId();
            const formData = new FormData();
            formData.append('name', profile.name);
            formData.append('username', profile.username);
            formData.append('email', profile.email);
            if (profile.password) {
                formData.append('password', profile.password);
            }
            formData.append('phone', profile.phone);
            formData.append('isEdirnelim', String(profile.isEdirnelim));
            formData.append('visitorId', fingerprint);
            if (selectedFile) {
                formData.append('file', selectedFile);
            }

            const response = await api.post('/visitors/upgrade', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data) {
                // Persistent Identity Update
                visitorService.setDisplayName(profile.username);
                visitorService.setFullName(profile.name);
                visitorService.setEmail(profile.email);

                // Also update the visitor name to ensure identity remembered across sessions
                localStorage.setItem('edn_visitor_name', profile.username);

                if (response.data.imageUrl) {
                    visitorService.setUserImage(response.data.imageUrl);
                }
                toast.success('Profiliniz başarıyla kaydedildi!');
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 1000);
            }
        } catch (error: any) {
            console.error("Profile update failed", error);
            const errorMsg = error.response?.data?.message || 'Güncelleme sırasında bir hata oluştu.';
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const isRegistered = originalUsername && !originalUsername.startsWith('EDN-');

    return (
        <div className="profile-container">
            <div className="container">
                <div className="profile-card" data-aos="fade-up">
                    <div className="profile-header">
                        <h2>Profilim</h2>
                        {!isRegistered && (
                            <>
                                <p><strong>{originalUsername}</strong> kimliği ile anonim olarak göz atıyorsunuz. Bilgilerinizi doldurarak kalıcı üye olabilirsiniz.</p>
                                <div className="profile-login-box">
                                    <span>Zaten bir hesabınız var mı?</span>
                                    <Link to="/login" className="login-link-btn">Giriş Yap</Link>
                                </div>
                            </>
                        )}
                    </div>

                    <form className="profile-form" onSubmit={handleSubmit}>
                        <div className="profile-image-section">
                            <div className="profile-image-wrapper">
                                <img
                                    src={previewUrl || (profile.imageUrl ? getImageUrl(profile.imageUrl) : 'https://cdn-icons-png.flaticon.com/512/149/149071.png')}
                                    alt="Profile"
                                    className="profile-image"
                                />
                                <label htmlFor="image-upload" className="image-upload-btn">
                                    <i className="fas fa-camera"></i>
                                    <input
                                        type="file"
                                        id="image-upload"
                                        hidden
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Kullanıcı Adı</label>
                            <div className="input-wrapper">
                                <i className="fas fa-at"></i>
                                <input
                                    type="text"
                                    placeholder="kullanici_adi"
                                    value={profile.username}
                                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                    required
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>E-Posta</label>
                            <div className="input-wrapper">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    placeholder="e-posta@adresiniz.com"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Şifre</label>
                            <div className="input-wrapper">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    value={profile.password}
                                    onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                                    placeholder="Şifrenizi belirleyin"
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Ad Soyad</label>
                            <div className="input-wrapper">
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    placeholder="Adınız Soyadınız"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Telefon</label>
                            <div className="input-wrapper">
                                <i className="fas fa-phone"></i>
                                <input
                                    type="tel"
                                    placeholder="05XX XXX XX XX"
                                    value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="profile-footer-row">
                            <div className="edirneliyim-switch">
                                <span>Edirneliyim</span>
                                <label className="switch-toggle">
                                    <input
                                        type="checkbox"
                                        checked={profile.isEdirnelim}
                                        onChange={(e) => setProfile({ ...profile, isEdirnelim: e.target.checked })}
                                    />
                                    <span className="switch-slider"></span>
                                </label>
                            </div>

                            <div className="profile-actions">
                                <Link to="/" className="profile-cancel-btn">İptal</Link>
                                <button type="submit" className="profile-save-btn" disabled={loading}>
                                    {loading ? <i className="fas fa-spinner fa-spin"></i> : (isRegistered ? 'Güncelle' : 'Kaydet ve Üye Ol')}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
