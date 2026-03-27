import React from 'react';
import './PolicyPages.css';

const TermsOfService: React.FC = () => {
    return (
        <div className="policy-page">
            <div className="policy-hero">
                <h1>Kullanım Şartları</h1>
                <p>Edirne Rehberi platformunun kullanımına dair bilgilendirmeler.</p>
            </div>
            
            <div className="container policy-content">
                <section>
                    <h2>1. Kabul</h2>
                    <p>
                        Web sitemizi ziyaret ederek veya kullanarak, bu Kullanım Şartları’nı kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız, lütfen sitemizi kullanmayı durdurun.
                    </p>
                </section>

                <section>
                    <h2>2. İçerik ve Hizmetler</h2>
                    <p>
                        Edirne Rehberi, Edirne'deki tarihi yerler, lezzet durakları ve etkinlikler hakkında bilgi sunmak amacıyla tasarlanmış bir platformdur. Amacımız sadece rehberlik ve tanıtımdır. Sitedeki bilgileri güncel tutmak için gayret ediyoruz, ancak mekanların çalışma saatleri veya menülerindeki ani değişikliklerden dolayı sorumluluk kabul edilmez.
                    </p>
                </section>

                <section>
                    <h2>3. Fikri Mülkiyet</h2>
                    <p>
                        Web sitemizde yer alan tüm metinler, görseller, logolar ve yazılımlar Edirne Rehberi’ne veya lisans verenlerine aittir. Yazılı onayımız olmadan bu içeriklerin ticari amaçlarla kopyalanması, çoğaltılması veya dağıtılması yasaktır. 
                    </p>
                </section>

                <section>
                    <h2>4. Kullanıcı Sorumluluğu</h2>
                    <p>
                        Kullanıcılar, sitemizi yasalara ve genel ahlak kurallarına aykırı bir amaçla kullanamazlar. Sitemizin sunucularına veya işleyişine zarar verecek girişimlerde bulunmak (sızma girişimleri vb.) yasal işlem başlatılmasına yol açabilir.
                    </p>
                </section>

                <section>
                    <h2>5. Dış Bağlantılar</h2>
                    <p>
                        Sitemiz, sosyal medya hesapları veya Google Haritalar gibi üçüncü taraf bağlantıları içerebilir. Bu dış sitelerin içeriğinden veya gizlilik uygulamalarından Edirne Rehberi sorumlu tutulamaz.
                    </p>
                </section>

                <section>
                    <h2>6. Sorumluluk Sınırı</h2>
                    <p>
                        Edirne Rehberi, sitemizin kullanımından kaynaklanabilecek doğrudan veya dolaylı herhangi bir zarardan dolayı sorumlu tutulamaz. Platformun kesintisiz ve hatasız çalışacağına dair bir garanti verilmez.
                    </p>
                </section>

                <section>
                    <h2>7. Değişiklikler</h2>
                    <p>
                        Bu Kullanım Şartları önceden haber verilmeksizin güncellenebilir. Değişiklikler yayınlandığı an itibarıyla geçerli olur.
                    </p>
                </section>
                
                <p className="last-updated" style={{ textAlign: 'right', marginTop: '2rem', fontStyle: 'italic', opacity: 0.7 }}>Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
            </div>
        </div>
    );
};

export default TermsOfService;
