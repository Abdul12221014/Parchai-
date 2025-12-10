import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { sessionService } from '../services/session.service';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const response = await sessionService.getMySessions();
            setSessions(response.data.sessions);
        } catch (err) {
            console.error('Failed to fetch sessions', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Welcome, {user?.fullName}!</h1>
                    <button onClick={handleLogout} className="btn btn--secondary">
                        Logout
                    </button>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>Your Profile</h3>
                        <div className="profile-info">
                            <p><strong>Name:</strong> {user?.fullName}</p>
                            <p><strong>Email:</strong> {user?.email}</p>
                            <p><strong>Role:</strong> {user?.role}</p>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Upcoming Sessions</h3>
                        {loading ? (
                            <p className="text-muted">Loading sessions...</p>
                        ) : sessions.length > 0 ? (
                            <div className="sessions-list">
                                {sessions.map(session => (
                                    <div key={session.id} className="session-item">
                                        <div className="session-info">
                                            <strong>{session.mentor.user.fullName}</strong>
                                            <span>{new Date(session.scheduledAt).toLocaleDateString()} at {new Date(session.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <span className={`status-badge status-${session.status.toLowerCase()}`}>
                                            {session.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted">No sessions scheduled yet</p>
                        )}
                        <button onClick={() => navigate('/mentors')} className="btn btn--primary" style={{ marginTop: '16px' }}>
                            Browse Mentors
                        </button>
                    </div>

                    <div className="dashboard-card">
                        <h3>Session History</h3>
                        <p className="text-muted">No past sessions</p>
                    </div>

                    <div className="dashboard-card">
                        <h3>Quick Actions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button onClick={() => navigate('/settings')} className="btn btn--outline">Edit Profile</button>
                            <button onClick={() => navigate('/settings')} className="btn btn--outline">Change Password</button>
                            <button onClick={() => navigate('/settings')} className="btn btn--outline">Settings</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
