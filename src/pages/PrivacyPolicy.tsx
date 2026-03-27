import React from 'react';
import './PolicyPages.css';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="policy-page">
            <div className="policy-hero">
                <h1>Gizlilik Politikası</h1>
                <p>Edirne Rehberi olarak verilerinizin güvenliğini önemsiyoruz.</p>
            </div>
            
            <div className="container policy-content">
                <section>
                    <h2>1. Giriş</h2>
                    <p>
                        Edirne Rehberi ("biz", "tarafımız", "sitemiz") olarak, ziyaretçilerimizin ve kullanıcılarımızın gizliliğini en üst düzeyde korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, web sitemizi kullandığınızda verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
                    </p>
                </section>

                <section>
                    <h2>2. Topladığımız Bilgiler</h2>
                    <p>Web sitemizi ziyaret ettiğinizde aşağıdaki veriler toplanabilir:</p>
                    <ul>
                        <li><strong>Kişisel Bilgiler:</strong> İletişim formlarını doldurduğunuzda veya kayıt olduğunuzda sağladığınız ad, e-posta adresi ve telefon numarası.</li>
                        <li><strong>Kullanım Verileri:</strong> IP adresiniz, tarayıcı türünüz, ziyaret ettiğiniz sayfalar ve platformda geçirdiğiniz süre gibi anonim teknik veriler.</li>
                        <li><strong>Konum Bilgileri:</strong> Yakındaki mekanları önermek amacıyla, izniniz dahilinde sağlanan coğrafi konum verileri.</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Bilgilerin Kullanım Amacı</h2>
                    <p>Toplanan bilgiler şu amaçlarla kullanılır:</p>
                    <ul>
                        <li>Size özel bir içerik ve mekan deneyimi sunmak.</li>
                        <li>Web sitemizin performansını analiz etmek ve geliştirmek.</li>
                        <li>Sorularınıza yanıt vermek ve müşteri desteği sağlamak.</li>
                        <li>Önemli güncellemeler ve duyurular hakkında sizi bilgilendirmek (izniniz dahilinde).</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Veri Güvenliği</h2>
                    <p>
                        Verileriniz, yetkisiz erişime veya değiştirilmeye karşı endüstri standardı güvenlik protokolleri (SSL gibi) kullanılarak korunmaktadır. Fiziksel ve dijital tüm önlemler alınmıştır.
                    </p>
                </section>

                <section>
                    <h2>5. Üçüncü Taraflar ile Paylaşım</h2>
                    <p>
                        Kişisel bilgileriniz, yasal zorunluluklar haricinde asla üçüncü şahıslara satılmaz veya kiralanmaz. Analitik verileri toplamak için Google Analytics gibi güvenilir iş ortaklarıyla çalışabiliriz.
                    </p>
                </section>

                <section>
                    <h2>6. Haklarınız</h2>
                    <p>
                        KVKK kapsamında verilerinize erişme, düzeltilmesini isteme veya silinmesini talep etme hakkına sahipsiniz. Talepleriniz için bizimle iletişime geçebilirsiniz.
                    </p>
                </section>

                <section>
                    <h2>7. İletişim</h2>
                    <p>
                        Bu politika hakkında sorularınız varsa lütfen <a href="/#contact">İletişim</a> sayfasından bize ulaşın.
                    </p>
                </section>
                
                <p className="last-updated" style={{ textAlign: 'right', marginTop: '2rem', fontStyle: 'italic', opacity: 0.7 }}>Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
