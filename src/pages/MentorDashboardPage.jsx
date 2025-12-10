import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { mentorService } from '../services/mentor.service';
import { sessionService } from '../services/session.service';
import { useNavigate } from 'react-router-dom';

export default function MentorDashboardPage() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [statsRes, sessionsRes] = await Promise.all([
                mentorService.getDashboardStats(),
                sessionService.getMentorSessions()
            ]);

            setStats(statsRes.data.stats);
            setSessions(sessionsRes.data.sessions || []);
        } catch (err) {
            console.error('Failed to fetch dashboard data', err);
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
                    <div>
                        <h1>Mentor Dashboard</h1>
                        <p className="text-muted">Welcome back, {user?.fullName}</p>
                    </div>
                    <button onClick={handleLogout} className="btn btn--secondary">
                        Logout
                    </button>
                </div>

                {loading ? (
                    <div className="loading-state">Loading dashboard...</div>
                ) : (
                    <>
                        {/* Stats Grid */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-label">Total Earnings</div>
                                <div className="stat-value">₹{stats?.totalEarnings.toLocaleString()}</div>
                                <div className="stat-trend positive">↗ 12% this month</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">Total Sessions</div>
                                <div className="stat-value">{stats?.totalSessions}</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">Upcoming</div>
                                <div className="stat-value">{stats?.upcomingSessions}</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">Rating</div>
                                <div className="stat-value">⭐ {stats?.rating}</div>
                            </div>
                        </div>

                        <div className="dashboard-grid">
                            {/* Upcoming Sessions */}
                            <div className="dashboard-card main-card">
                                <div className="card-header">
                                    <h3>Upcoming Sessions</h3>
                                    <button className="btn btn--text">View All</button>
                                </div>

                                {sessions.length > 0 ? (
                                    <div className="sessions-list">
                                        {sessions.map(session => (
                                            <div key={session.id} className="session-item">
                                                <div className="session-info">
                                                    <strong>{session.user?.fullName || 'Student'}</strong>
                                                    <span>{new Date(session.scheduledAt).toLocaleString()}</span>
                                                </div>
                                                <div className="session-actions">
                                                    <button className="btn btn--primary btn--sm">Join Call</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted">No upcoming sessions.</p>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="dashboard-sidebar">
                                <div className="dashboard-card">
                                    <h3>Availability</h3>
                                    <p className="text-muted">Manage your weekly schedule</p>
                                    <button className="btn btn--outline btn--full">Update Slots</button>
                                </div>

                                <div className="dashboard-card">
                                    <h3>Quick Actions</h3>
                                    <div className="action-list">
                                        <button onClick={() => navigate('/settings')} className="btn btn--outline btn--full">Edit Profile</button>
                                        <button className="btn btn--outline btn--full">View Reviews</button>
                                        <button className="btn btn--outline btn--full">Payout Settings</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
