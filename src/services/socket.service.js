import { io } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

let socket;

export const connectSocket = () => {
    if (socket) return socket;

    const user = useAuthStore.getState().user;

    if (!user) return null;

    socket = io(SOCKET_URL, {
        withCredentials: true,
    });

    socket.on('connect', () => {
        console.log('Connected to socket server');
        socket.emit('join_room', user.id);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
    });

    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const getSocket = () => socket;
