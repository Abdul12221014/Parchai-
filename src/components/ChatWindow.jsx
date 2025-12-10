import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../store/authStore';
import { getSocket } from '../services/socket.service';
import '../styles/chat.css';

export default function ChatWindow({ chat, onClose }) {
    const { user } = useAuthStore();
    const [messages, setMessages] = useState(chat?.messages || []);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const socket = getSocket();

    const recipient = user.role === 'MENTOR' ? chat.user : chat.mentor.user;

    useEffect(() => {
        if (socket && chat) {
            socket.emit('join_chat', chat.id);

            socket.on('receive_message', (message) => {
                if (message.chatId === chat.id) {
                    setMessages((prev) => [...prev, message]);
                    scrollToBottom();
                }
            });
        }

        return () => {
            if (socket) {
                socket.off('receive_message');
            }
        };
    }, [chat, socket]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !socket) return;

        const messageData = {
            chatId: chat.id,
            senderId: user.id,
            recipientId: recipient.id, // Assuming recipient ID is available
            content: newMessage,
        };

        socket.emit('send_message', messageData);
        setNewMessage('');
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <div className="chat-user-info">
                    <img src={recipient?.profileImage || 'https://via.placeholder.com/40'} alt={recipient?.fullName} />
                    <h4>{recipient?.fullName || 'Chat'}</h4>
                </div>
                <button onClick={onClose} className="close-btn">×</button>
            </div>

            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.senderId === user.id ? 'sent' : 'received'}`}
                    >
                        <p>{msg.content}</p>
                        <span className="timestamp">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="chat-input-area">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit" className="btn btn--primary btn--sm">Send</button>
            </form>
        </div>
    );
}
