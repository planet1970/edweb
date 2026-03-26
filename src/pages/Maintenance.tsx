
import React from 'react';

const Maintenance: React.FC = () => {
    const handleRetry = () => {
        // Just reload the page or navigate home to try again
        window.location.href = '/';
    };

    return (
        <div className="maintenance-page">
            <div className="maintenance-container" data-aos="zoom-in">
                <div className="maintenance-icon">
                    <i className="fas fa-server"></i>
                    <div className="gear-spin">
                        <i className="fas fa-cog"></i>
                    </div>
                </div>
                <h1 className="maintenance-title">Bakım Modu</h1>
                <p className="maintenance-text">
                    Şu anda sistemlerimizde bir iyileştirme yapıyoruz veya geçici bir bağlantı sorunu yaşıyoruz. 
                    Lütfen kısa bir süre sonra tekrar deneyin.
                </p>
                <div className="maintenance-status">
                    <span className="pulse"></span>
                    Sunucuya bağlanılamıyor
                </div>
                <button className="retry-button" onClick={handleRetry}>
                    <i className="fas fa-sync-alt"></i> Tekrar Dene
                </button>
            </div>

            <style>{`
                .maintenance-page {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    color: white;
                    text-align: center;
                    padding: 20px;
                    z-index: 9999;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                }

                .maintenance-container {
                    max-width: 500px;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    padding: 50px 40px;
                    border-radius: 30px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
                }

                .maintenance-icon {
                    font-size: 60px;
                    color: #ffb627;
                    margin-bottom: 30px;
                    position: relative;
                    display: inline-block;
                }

                .gear-spin {
                    position: absolute;
                    top: -10px;
                    right: -20px;
                    font-size: 30px;
                    animation: spin 4s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .maintenance-title {
                    font-size: 32px;
                    font-weight: 800;
                    margin-bottom: 20px;
                    background: linear-gradient(to right, #ffffff, #ffb627);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .maintenance-text {
                    font-size: 16px;
                    color: rgba(255, 255, 255, 0.7);
                    line-height: 1.6;
                    margin-bottom: 35px;
                }

                .maintenance-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(211, 47, 47, 0.15);
                    color: #ff5252;
                    padding: 8px 16px;
                    border-radius: 50px;
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 30px;
                }

                .pulse {
                    width: 8px;
                    height: 8px;
                    background: #ff5252;
                    border-radius: 50%;
                    box-shadow: 0 0 0 rgba(255, 82, 82, 0.4);
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(255, 82, 82, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(255, 82, 82, 0); }
                }

                .retry-button {
                    background: #ffb627;
                    color: #1a1a2e;
                    border: none;
                    padding: 14px 28px;
                    border-radius: 15px;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin: 0 auto;
                }

                .retry-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(255, 182, 39, 0.3);
                    background: #ffc34d;
                }

                .retry-button:active {
                    transform: translateY(-1px);
                }
            `}</style>
        </div>
    );
};

export default Maintenance;
