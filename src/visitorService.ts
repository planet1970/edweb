
import { api } from './api';

const VISITOR_ID_KEY = 'edn_visitor_id';

export const visitorService = {
    getVisitorId(): string {
        let id = localStorage.getItem(VISITOR_ID_KEY);
        if (!id) {
            id = Date.now().toString(36) + Math.random().toString(36).substring(2);
            localStorage.setItem(VISITOR_ID_KEY, id);
        }
        return id;
    },

    async trackVisitor() {
        try {
            const fingerprint = this.getVisitorId();
            const response = await api.post('/visitors/track', { fingerprint });
            if (response.data) {
                if (response.data.username) {
                    localStorage.setItem('edn_visitor_name', response.data.username);
                }
                if (response.data.name) {
                    localStorage.setItem('edn_user_full_name', response.data.name);
                }
                if (response.data.imageUrl) {
                    localStorage.setItem('edn_user_image', response.data.imageUrl);
                }
                if (response.data.email) {
                    localStorage.setItem('edn_user_email', response.data.email);
                }
            }
            return response.data;
        } catch (error) {
            console.error('Visitor tracking failed:', error);
            return null;
        }
    },

    getUsername(): string | null {
        return localStorage.getItem('edn_visitor_name');
    },

    getFullName(): string | null {
        return localStorage.getItem('edn_user_full_name');
    },

    getEmail(): string | null {
        return localStorage.getItem('edn_user_email');
    },

    // Legacy method for backward compatibility
    getDisplayName(): string | null {
        return this.getUsername();
    },

    getUserImage(): string | null {
        return localStorage.getItem('edn_user_image');
    },

    setDisplayName(username: string) {
        localStorage.setItem('edn_visitor_name', username);
    },

    setFullName(name: string) {
        localStorage.setItem('edn_user_full_name', name);
    },

    setEmail(email: string) {
        localStorage.setItem('edn_user_email', email);
    },

    setUserImage(url: string) {
        localStorage.setItem('edn_user_image', url);
    }
};
