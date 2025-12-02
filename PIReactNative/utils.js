import { Alert } from 'react-native';

// ===== Utility Functions =====

// Show toast/alert notification
export const showToast = (message, type = 'info') => {
    // In React Native, we use Alert instead of toast
    // For a better toast experience, consider using react-native-toast-message
    Alert.alert(
        type === 'error' ? 'Error' : type === 'success' ? 'Success' : 'Info',
        message
    );
};

// Format numbers with commas
export const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Get difficulty color class
export const getDifficultyClass = (difficulty) => {
    const map = {
        'Easy': 'badge-easy',
        'Medium': 'badge-medium',
        'Hard': 'badge-hard',
        'Expert': 'badge-expert',
        'Beginner': 'badge-easy',
        'Intermediate': 'badge-medium',
        'Advanced': 'badge-hard',
    };
    return map[difficulty] || 'badge-easy';
};

// Get difficulty color
export const getDifficultyColor = (difficulty) => {
    const map = {
        'Easy': '#4ade80',
        'Medium': '#fbbf24',
        'Hard': '#ef4444',
        'Expert': '#a855f7',
        'Beginner': '#4ade80',
        'Intermediate': '#fbbf24',
        'Advanced': '#ef4444',
    };
    return map[difficulty] || '#4ade80';
};

// Get avatar URL
export const getAvatarUrl = (name) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
};

// Get color by name
export const getColor = (colorName) => {
    const colors = {
        primary: '#24eef7',
        success: '#4ade80',
        warning: '#fbbf24',
        danger: '#ef4444',
        muted: '#8b8b8b',
        foreground: '#e5e5e5',
        background: '#0a0a0a',
    };
    return colors[colorName] || '#24eef7';
};

// Get color with opacity
export const getColorWithOpacity = (colorName, opacity) => {
    const colors = {
        primary: `rgba(36, 238, 247, ${opacity})`,
        success: `rgba(74, 222, 128, ${opacity})`,
        warning: `rgba(251, 191, 36, ${opacity})`,
        danger: `rgba(239, 68, 68, ${opacity})`,
        muted: `rgba(139, 139, 139, ${opacity})`,
        foreground: `rgba(229, 229, 229, ${opacity})`,
        background: `rgba(10, 10, 10, ${opacity})`,
    };
    return colors[colorName] || `rgba(36, 238, 247, ${opacity})`;
};

// Validate email
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Validate password strength
export const validatePassword = (password) => {
    return {
        isValid: password.length >= 8,
        hasMinLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
};

// Format duration (seconds to minutes/hours)
export const formatDuration = (seconds) => {
    if (seconds < 60) {
        return `${seconds}s`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} min`;
    } else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
};

// Format date
export const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - d);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else {
        return d.toLocaleDateString();
    }
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
};

// Debounce function
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function
export const throttle = (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

// Simple event emitter for app state
export class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach((callback) => callback(data));
        }
    }

    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter((cb) => cb !== callback);
        }
    }

    removeAllListeners(event) {
        if (event) {
            delete this.events[event];
        } else {
            this.events = {};
        }
    }
}

// Storage utilities (using AsyncStorage)
export const storage = {
    setItem: async (key, value) => {
        try {
            const { AsyncStorage } = require('@react-native-async-storage/async-storage');
            await AsyncStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage setItem error:', error);
            return false;
        }
    },

    getItem: async (key) => {
        try {
            const { AsyncStorage } = require('@react-native-async-storage/async-storage');
            const value = await AsyncStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Storage getItem error:', error);
            return null;
        }
    },

    removeItem: async (key) => {
        try {
            const { AsyncStorage } = require('@react-native-async-storage/async-storage');
            await AsyncStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage removeItem error:', error);
            return false;
        }
    },

    clear: async () => {
        try {
            const { AsyncStorage } = require('@react-native-async-storage/async-storage');
            await AsyncStorage.clear();
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    },
};

// API utilities
export const api = {
    baseUrl: 'https://api.example.com',

    request: async (endpoint, options = {}) => {
        try {
            const url = `${api.baseUrl}${endpoint}`;
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    },

    get: (endpoint, options) => api.request(endpoint, { method: 'GET', ...options }),
    post: (endpoint, data, options) =>
        api.request(endpoint, { method: 'POST', body: JSON.stringify(data), ...options }),
    put: (endpoint, data, options) =>
        api.request(endpoint, { method: 'PUT', body: JSON.stringify(data), ...options }),
    delete: (endpoint, options) => api.request(endpoint, { method: 'DELETE', ...options }),
};

// Generate random ID
export const generateId = () => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Deep clone object
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// Check if object is empty
export const isEmpty = (obj) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

// Shuffle array
export const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// Group array by key
export const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
};
