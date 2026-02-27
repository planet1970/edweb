
import React from 'react';

const PopularPlaces: React.FC = () => {
    return (
        <section className="tours" id="tours">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <span className="section-subtitle">Görülecek Yerler</span>
                    <h2 className="section-title">Popüler Mekanlar</h2>
                </div>

                <div className="tours-grid">
                    <div className="tour-card" data-aos="fade-up" data-aos-delay="100">
                        <div className="tour-image">
                            <img src="/images/populer/selimiye.png" alt="Selimiye Camii" />
                            <div className="tour-badge popular">UNESCO</div>
                            <div className="tour-overlay"><a href="#" className="btn btn-white">Detayları Gör</a></div>
                        </div>
                        <div className="tour-content">
                            <div className="tour-meta">
                                <span><i className="fas fa-clock"></i> 09:00 - 18:00</span>
                                <span><i className="fas fa-map-marker-alt"></i> Merkez</span>
                            </div>
                            <h3 className="tour-title">Selimiye Camii</h3>
                            <p className="tour-description">Mimar Sinan'ın ustalık eseri, UNESCO Dünya Mirası Listesi'nde yer alan muhteşem cami</p>
                            <div className="tour-footer">
                                <div className="tour-rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <span>(1.245 Ziyaretçi)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tour-card" data-aos="fade-up" data-aos-delay="200">
                        <div className="tour-image">
                            <img src="/images/populer/eskicamii.png" alt="Eski Cami" />
                            <div className="tour-overlay">
                                <a href="#" className="btn btn-white">Detayları Gör</a>
                            </div>
                        </div>
                        <div className="tour-content">
                            <div className="tour-meta">
                                <span><i className="fas fa-clock"></i> 09:00 - 17:30</span>
                                <span><i className="fas fa-map-marker-alt"></i> Merkez</span>
                            </div>
                            <h3 className="tour-title">Eski Cami</h3>
                            <p className="tour-description">Edirne'nin en eski camisi, benzersiz hat sanatı ve dokuz kubbeli mimarisiyle ünlü</p>
                            <div className="tour-footer">
                                <div className="tour-rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <span>(892 Ziyaretçi)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tour-card" data-aos="fade-up" data-aos-delay="300">
                        <div className="tour-image">
                            <img src="images/populer/ucserefeli.png" alt="Üç Şerefeli Cami" />
                            <div className="tour-overlay">
                                <a href="#" className="btn btn-white">Detayları Gör</a>
                            </div>
                        </div>
                        <div className="tour-content">
                            <div className="tour-meta">
                                <span><i className="fas fa-clock"></i> 09:00 - 18:00</span>
                                <span><i className="fas fa-map-marker-alt"></i> Merkez</span>
                            </div>
                            <h3 className="tour-title">Üç Şerefeli Cami</h3>
                            <p className="tour-description">Üç şerefeli minaresi ve görkemli kubbesiyle Osmanlı mimarisinin önemli eseri</p>
                            <div className="tour-footer">
                                <div className="tour-rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                    <span>(756 Ziyaretçi)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tour-card" data-aos="fade-up" data-aos-delay="100">
                        <div className="tour-image">
                            <img src="images/populer/sarayici.png" alt="Tarihi Kırkpınar Meydanı" />
                            <div className="tour-badge">Tarihi</div>
                            <div className="tour-overlay">
                                <a href="#" className="btn btn-white">Detayları Gör</a>
                            </div>
                        </div>
                        <div className="tour-content">
                            <div className="tour-meta">
                                <span><i className="fas fa-clock"></i> 24 Saat</span>
                                <span><i className="fas fa-map-marker-alt"></i> Sarayiçi</span>
                            </div>
                            <h3 className="tour-title">Tarihi Kırkpınar Meydanı</h3>
                            <p className="tour-description">Kırkpınar Yağlı Güreşleri'nin yapıldığı tarihi meydan ve çevresi</p>
                            <div className="tour-footer">
                                <div className="tour-rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <span>(1.089 Ziyaretçi)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tour-card" data-aos="fade-up" data-aos-delay="200">
                        <div className="tour-image">
                            <img src="images/populer/meric.png" alt="Meriç Nehri" />
                            <div className="tour-overlay">
                                <a href="#" className="btn btn-white">Detayları Gör</a>
                            </div>
                        </div>
                        <div className="tour-content">
                            <div className="tour-meta">
                                <span><i className="fas fa-clock"></i> 24 Saat</span>
                                <span><i className="fas fa-map-marker-alt"></i> Şehir Geneli</span>
                            </div>
                            <h3 className="tour-title">Meriç Nehri ve Köprüleri</h3>
                            <p className="tour-description">Tarihi köprüler ve nehir kenarı yürüyüş parkurları ile doğa ve tarih bir arada</p>
                            <div className="tour-footer">
                                <div className="tour-rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <span>(2.134 Ziyaretçi)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tour-card" data-aos="fade-up" data-aos-delay="300">
                        <div className="tour-image">
                            <img src="images/populer/edirnesarayi.png" alt="Edirne Sarayı" />
                            <div className="tour-badge">Müze</div>
                            <div className="tour-overlay">
                                <a href="#" className="btn btn-white">Detayları Gör</a>
                            </div>
                        </div>
                        <div className="tour-content">
                            <div className="tour-meta">
                                <span><i className="fas fa-clock"></i> 09:00 - 17:00</span>
                                <span><i className="fas fa-map-marker-alt"></i> Sarayiçi</span>
                            </div>
                            <h3 className="tour-title">Edirne Sarayı (Sarayiçi)</h3>
                            <p className="tour-description">Osmanlı padişahlarının kullandığı tarihi saray kalıntıları ve müze kompleksi</p>
                            <div className="tour-footer">
                                <div className="tour-rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                    <span>(678 Ziyaretçi)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center" data-aos="fade-up">
                    <a href="#" className="btn btn-primary btn-lg">Tüm Mekanları Görüntüle</a>
                </div>
            </div>
        </section>
    );
};

export default PopularPlaces;
