import React from 'react';

const FullScreenLoader: React.FC = () => {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'var(--bg-color, #fdfdfd)',
            zIndex: 99999
        }}>
            <div className="fullscreen-spinner"></div>
            <h3 style={{
                marginTop: '20px',
                color: 'var(--primary-color, #ff6c2f)',
                fontFamily: 'var(--font-primary, sans-serif)',
                fontWeight: 600,
                letterSpacing: '1px'
            }}>
                Yükleniyor...
            </h3>
            <style>{`
                .fullscreen-spinner {
                    width: 60px;
                    height: 60px;
                    border: 4px solid rgba(255, 108, 47, 0.2);
                    border-radius: 50%;
                    border-top-color: var(--primary-color, #ff6c2f);
                    animation: fs-spin 1s linear infinite;
                }
                @keyframes fs-spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default FullScreenLoader;
