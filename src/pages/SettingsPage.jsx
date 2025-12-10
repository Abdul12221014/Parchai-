import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile'); // profile, password, notifications

    // Profile State
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.mentor?.bio || '', // If mentor
    });

    // Password State
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        }, 1000);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }
        setLoading(true);
        setMessage(null);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setMessage({ type: 'success', text: 'Password changed successfully!' });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        }, 1000);
    };

    return (
        <div className="page-container">
            <div className="container">
                <button onClick={() => navigate(-1)} className="btn btn--text" style={{ marginBottom: '1rem' }}>
                    ← Back
                </button>

                <h1 style={{ marginBottom: '2rem' }}>Settings</h1>

                <div className="settings-layout" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>

                    {/* Sidebar */}
                    {/* Sidebar */}
                    <div className="settings-sidebar">
                        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                            <button
                                className={`list-group-item ${activeTab === 'profile' ? 'active' : ''}`}
                                onClick={() => setActiveTab('profile')}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    textAlign: 'left',
                                    border: 'none',
                                    background: activeTab === 'profile' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                    color: activeTab === 'profile' ? 'var(--color-accent)' : 'var(--color-grey-400)',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    fontWeight: activeTab === 'profile' ? '600' : '400'
                                }}
                            >
                                Edit Profile
                            </button>
                            <button
                                className={`list-group-item ${activeTab === 'password' ? 'active' : ''}`}
                                onClick={() => setActiveTab('password')}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    textAlign: 'left',
                                    border: 'none',
                                    background: activeTab === 'password' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                    color: activeTab === 'password' ? 'var(--color-accent)' : 'var(--color-grey-400)',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    fontWeight: activeTab === 'password' ? '600' : '400'
                                }}
                            >
                                Change Password
                            </button>
                            <button
                                className={`list-group-item ${activeTab === 'notifications' ? 'active' : ''}`}
                                onClick={() => setActiveTab('notifications')}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    textAlign: 'left',
                                    border: 'none',
                                    background: activeTab === 'notifications' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                    color: activeTab === 'notifications' ? 'var(--color-accent)' : 'var(--color-grey-400)',
                                    cursor: 'pointer',
                                    fontWeight: activeTab === 'notifications' ? '600' : '400'
                                }}
                            >
                                Notifications
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="settings-content">
                        {message && (
                            <div className={`alert ${message.type === 'error' ? 'alert-danger' : 'alert-success'}`} style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '8px', background: message.type === 'error' ? '#fee2e2' : '#dcfce7', color: message.type === 'error' ? '#991b1b' : '#166534' }}>
                                {message.text}
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="card">
                                <h3>Edit Profile</h3>
                                <form onSubmit={handleProfileUpdate}>
                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-grey-400)' }}>Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="form-control"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                background: 'rgba(255,255,255,0.05)',
                                                color: 'var(--color-white)'
                                            }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-grey-400)' }}>Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            disabled
                                            className="form-control"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                background: 'rgba(255,255,255,0.02)',
                                                color: 'var(--color-grey-600)',
                                                cursor: 'not-allowed'
                                            }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-grey-400)' }}>Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="form-control"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                background: 'rgba(255,255,255,0.05)',
                                                color: 'var(--color-white)'
                                            }}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn--primary" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'password' && (
                            <div className="card">
                                <h3>Change Password</h3>
                                <form onSubmit={handlePasswordChange}>
                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-grey-400)' }}>Current Password</label>
                                        <input
                                            type="password"
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                            className="form-control"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                background: 'rgba(255,255,255,0.05)',
                                                color: 'var(--color-white)'
                                            }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-grey-400)' }}>New Password</label>
                                        <input
                                            type="password"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            className="form-control"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                background: 'rgba(255,255,255,0.05)',
                                                color: 'var(--color-white)'
                                            }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-grey-400)' }}>Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                            className="form-control"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                background: 'rgba(255,255,255,0.05)',
                                                color: 'var(--color-white)'
                                            }}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn--primary" disabled={loading}>
                                        {loading ? 'Updating...' : 'Update Password'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="card">
                                <h3>Notifications</h3>
                                <p>Email notifications enabled.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
