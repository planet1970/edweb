import React, { useState, useEffect } from 'react';
import { visitorService } from '../visitorService';

interface NotificationProps {
    title?: string;
    message?: string;
    icon?: string;
    duration?: number;
    delay?: number;
}

const NotificationToast: React.FC<NotificationProps> = ({
    title = "Edirne Rehberi",
    message: initialMessage,
    icon = "fas fa-user-circle",
    duration = 6000,
    delay = 3000
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(initialMessage || "Ramazan Çarşısı etkinliklerimizi kaçırmayın!");

    useEffect(() => {
        const checkAndShow = () => {
            const hasSeenSession = sessionStorage.getItem('hasSeenGlobalNotification');
            if (!hasSeenSession && !isVisible) {
                const username = visitorService.getUsername();
                if (username) {
                    const visitCount = visitorService.getVisitCount();
                    if (visitCount <= 1) {
                        setDisplayMessage(`Hoş geldin ${username}! Edirne Rehberi'ne ilk ziyaretin için teşekkürler.`);
                    } else {
                        setDisplayMessage(`Hoş geldin ${username}! Seni tekrar görmek güzel.`);
                    }
                    setIsVisible(true);
                }
            }
        };

        // Show after initial delay
        const showTimer = setTimeout(checkAndShow, delay);

        // Also listen for immediate updates (for first time visitors)
        const handleUpdate = () => {
            // Short delay after update to look better
            setTimeout(checkAndShow, 1000);
        };

        window.addEventListener('visitorUpdated', handleUpdate);

        return () => {
            clearTimeout(showTimer);
            window.removeEventListener('visitorUpdated', handleUpdate);
        };
    }, [delay, isVisible]);

    useEffect(() => {
        if (isVisible) {
            // Dismiss after duration
            const hideTimer = setTimeout(() => {
                handleClose();
            }, duration);

            return () => clearTimeout(hideTimer);
        }
    }, [isVisible, duration]);

    const handleClose = () => {
        setIsLeaving(true);
        setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem('hasSeenGlobalNotification', 'true');
        }, 500); // Match animation duration
    };

    if (!isVisible) return null;

    return (
        <div className={`notification-toast-wrapper ${isLeaving ? 'leaving' : ''}`} onClick={handleClose}>
            <div className="notification-toast-content">
                <div className="notification-icon-box">
                    <i className={icon}></i>
                </div>
                <div className="notification-text-box">
                    <div className="notification-header">
                        <span className="notification-title">{title}</span>
                        <span className="notification-time">şimdi</span>
                    </div>
                    <p className="notification-message">{displayMessage}</p>
                </div>
                <div className="notification-dismiss-bar"></div>
            </div>
        </div>
    );
};

export default NotificationToast;
