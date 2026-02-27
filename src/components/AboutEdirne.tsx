
import React from 'react';

const AboutEdirne: React.FC = () => {
    return (
        <section className="features" id="about">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <span className="section-subtitle">HADRİANOUPOLİS'TEN EDİRNE'YE</span>
                    <h2 className="section-title">İlginç Bilgiler</h2>
                </div>

                <div className="features-grid">
                    <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
                        <div className="feature-icon">
                            <i className="fas fa-landmark"></i>
                        </div>
                        <h3>Edirne Adı Tarihçesi</h3>
                        <p>Roma İmparatoru Hadrianus tarafından kurulan şehir, Hadrianopolis adından evrilerek günümüzdeki Edirne adını almıştır.</p>
                    </div>

                    <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
                        <div className="feature-icon">
                            <i className="fas fa-crown"></i>
                        </div>
                        <h3>Başkent Edirne</h3>
                        <p>1361 yılında fethedilen Edirne, İstanbul'un fethine kadar 92 yıl boyunca Osmanlı Devleti'nin başkenti olmuştur.</p>
                    </div>

                    <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
                        <div className="feature-icon">
                            <i className="fas fa-mosque"></i>
                        </div>
                        <h3>Sinan'ın Ustalığı</h3>
                        <p>Mimar Sinan, "ustalık eserim" dediği Selimiye Camii ile dünya mimarlık tarihine silinmez bir imza atmıştır.</p>
                    </div>

                    <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
                        <div className="feature-icon">
                            <i className="fas fa-trophy"></i>
                        </div>
                        <h3>Yağlı Güreş Tarihi</h3>
                        <p>1361'den beri aralıksız düzenlenen Tarihi Kırkpınar Yağlı Güreşleri, dünyanın en eski spor organizasyonlarından biridir.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutEdirne;
