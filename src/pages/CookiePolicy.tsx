import React from 'react';
import './PolicyPages.css';

const CookiePolicy: React.FC = () => {
    return (
        <div className="policy-page">
            <div className="policy-hero">
                <h1>Çerez Politikası</h1>
                <p>Web sitemizdeki çerezlerin nasıl çalıştığı ve bunları nasıl yönetebileceğiniz hakkında bilgi edinin.</p>
            </div>
            
            <div className="container policy-content">
                <section>
                    <h2>1. Çerez Nedir?</h2>
                    <p>
                        Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, sitenin daha verimli çalışmasını sağlamak veya site sahiplerine bilgi iletmek için kullanılır.
                    </p>
                </section>

                <section>
                    <h2>2. Kullandığımız Çerez Türleri</h2>
                    <p>Edirne Rehberi üzerinde şu tür çerezleri kullanabiliriz:</p>
                    <ul>
                        <li><strong>Zorunlu Çerezler:</strong> Sitemizin temel fonksiyonlarının çalışması için gereklidir (örneğin oturum yönetimi).</li>
                        <li><strong>Performans Çerezleri:</strong> Sitemizin ne kadar verimli kullanıldığını (örneğin hangi sayfaların daha çok tıklandığı) analiz etmemize yardımcı olur.</li>
                        <li><strong>İşlevsel Çerezler:</strong> Dil tercihlerinizi veya kişiselleştirilmiş ayarlarınızı hatırlar.</li>
                        <li><strong>Hedefleme Çerezleri:</strong> Size ilgi alanlarınıza uygun içerikler veya reklamlar sunmak için kullanılır.</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Çerezleri Neden Kullanıyoruz?</h2>
                    <p>
                        Çerezler, web sitemizin performansını ölçmek, kullanıcı deneyimini kişiselleştirmek ve sitemizin güvenliğini artırmak amacıyla kullanılmaktadır.
                    </p>
                </section>

                <section>
                    <h2>4. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
                    <p>
                        Web sitemizi ziyaret ederek çerez kullanımını kabul etmiş sayılırsınız. Ancak çerezleri tarayıcı ayarlarınız üzerinden istediğiniz zaman silebilir veya engelleyebilirsiniz. Ayarlarınızı nasıl değiştireceğiniz, kullandığınız tarayıcıya göre değişiklik gösterir:
                    </p>
                    <ul>
                        <li><strong>Google Chrome:</strong> Ayarlar {'>'} Gizlilik ve Güvenlik {'>'} Çerezler ve Diğer Site Verileri.</li>
                        <li><strong>Microsoft Edge:</strong> Ayarlar {'>'} Tanımlama Bilgileri ve Site İzinleri.</li>
                        <li><strong>Safari:</strong> Tercihler {'>'} Gizlilik {'>'} Çerezleri ve Web Sitesi Verilerini Engelle.</li>
                    </ul>
                </section>

                <section>
                    <h2>5. Politika Güncellemeleri</h2>
                    <p>
                        Çerez kullanımımızdaki değişikliklere bağlı olarak bu politikayı zaman zaman güncelleyebiliriz. Değişiklikler yayınlandığı an itibarıyla geçerli olur.
                    </p>
                </section>
                
                <p className="last-updated" style={{ textAlign: 'right', marginTop: '2rem', fontStyle: 'italic', opacity: 0.7 }}>Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
            </div>
        </div>
    );
};

export default CookiePolicy;
