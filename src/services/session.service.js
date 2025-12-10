import api from './api';

export const sessionService = {
    // Book a new session
    bookSession: async (bookingData) => {
        const response = await api.post('/sessions/book', bookingData);
        return response.data;
    },

    // Get sessions for mentor
    getMentorSessions: async () => {
        const response = await api.get('/sessions/mentor-sessions');
        return response.data;
    },

    // Get user's sessions
    getMySessions: async () => {
        const response = await api.get('/sessions/my-sessions');
        return response.data;
    },

    // Get session details
    getSessionById: async (id) => {
        const response = await api.get(`/sessions/${id}`);
        return response.data;
    }
};
