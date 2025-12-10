import api from './api';

export const paymentService = {
    // Create payment intent
    createPaymentIntent: async (data) => {
        const response = await api.post('/payments/create-intent', data);
        return response.data;
    },

    // Confirm payment
    confirmPayment: async (data) => {
        const response = await api.post('/payments/confirm', data);
        return response.data;
    },

    // Get payment history
    getHistory: async () => {
        const response = await api.get('/payments/history');
        return response.data;
    }
};
