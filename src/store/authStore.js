import { create } from 'zustand';
import { authService } from '../services/auth.service';

export const useAuthStore = create((set) => ({
    user: authService.getStoredUser(),
    isAuthenticated: authService.isAuthenticated(),
    isLoading: false,
    error: null,

    // Register
    register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authService.register(userData);
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
            });
            return response;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Registration failed',
                isLoading: false,
            });
            throw error;
        }
    },

    // Login
    login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authService.login(credentials);
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
            });
            return response;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Login failed',
                isLoading: false,
            });
            throw error;
        }
    },

    // Logout
    logout: () => {
        authService.logout();
        set({
            user: null,
            isAuthenticated: false,
            error: null,
        });
    },

    // Clear error
    clearError: () => set({ error: null }),
}));
