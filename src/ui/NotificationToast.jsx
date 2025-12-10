import React, { useEffect, useState } from 'react';
import { connectSocket, disconnectSocket } from '../services/socket.service';
import { useAuthStore } from '../store/authStore';

export default function NotificationToast() {
    const { user } = useAuthStore();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (user) {
            const socket = connectSocket();

            if (socket) {
                socket.on('notification', (data) => {
                    addNotification(data);
                });
            }
        }

        return () => {
            disconnectSocket();
        };
    }, [user]);

    const addNotification = (notification) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { ...notification, id }]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeNotification(id);
        }, 5000);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    if (notifications.length === 0) return null;

    return (
        <div className="notification-container">
            {notifications.map(n => (
                <div key={n.id} className={`notification-toast ${n.type?.toLowerCase() || 'info'}`}>
                    <div className="notification-content">
                        <strong>{n.type === 'SUCCESS' ? '✅' : n.type === 'ERROR' ? '❌' : 'ℹ️'}</strong>
                        <span>{n.message}</span>
                    </div>
                    <button onClick={() => removeNotification(n.id)} className="close-toast">×</button>
                </div>
            ))}
        </div>
    );
}
