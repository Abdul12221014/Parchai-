import api from './api';

export const mentorService = {
    // Get all mentors with optional filters
    getAllMentors: async (filters = {}) => {
        const params = new URLSearchParams();

        if (filters.search) params.append('search', filters.search);
        if (filters.expertise) params.append('expertise', filters.expertise);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

        const response = await api.get(`/mentors?${params.toString()}`);
        return response.data;
    },

    // Get single mentor by ID
    getMentorById: async (id) => {
        const response = await api.get(`/mentors/${id}`);
        return response.data;
    },

    // Update mentor profile (for mentors)
    updateProfile: async (data) => {
        const response = await api.put('/mentors/me', data);
        return response.data;
    },

    // Get dashboard stats
    getDashboardStats: async () => {
        const response = await api.get('/mentors/me/dashboard-stats');
        return response.data;
    }
};
