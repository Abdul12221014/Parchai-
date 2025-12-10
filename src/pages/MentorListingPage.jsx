import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mentorService } from '../services/mentor.service';

export default function MentorListingPage() {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        expertise: '',
    });

    useEffect(() => {
        fetchMentors();
    }, []);

    const fetchMentors = async (currentFilters = filters) => {
        setLoading(true);
        try {
            const response = await mentorService.getAllMentors(currentFilters);
            setMentors(response.data.mentors);
        } catch (err) {
            setError('Failed to load mentors. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMentors(filters);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="page-container">
            <div className="container">
                <div className="page-header">
                    <Link to="/dashboard" className="btn btn--outline btn--sm" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        ← Back to Dashboard
                    </Link>
                    <h1>Find Your Clarity Guide</h1>
                    <p>Connect with experienced mentors who can help you navigate your path.</p>
                </div>

                {/* Search and Filter Section */}
                <div className="filters-section">
                    <form onSubmit={handleSearch} className="search-form">
                        <div className="search-group">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search by name or keyword..."
                                value={filters.search}
                                onChange={handleFilterChange}
                                className="search-input"
                            />
                            <button type="submit" className="btn btn--primary">
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* Mentors Grid */}
                {loading ? (
                    <div className="loading-state">Loading mentors...</div>
                ) : error ? (
                    <div className="error-state">{error}</div>
                ) : (
                    <div className="mentors-grid">
                        {mentors.map((mentor) => (
                            <div key={mentor.id} className="mentor-card">
                                <div className="mentor-header">
                                    <img
                                        src={mentor.user.profileImage}
                                        alt={mentor.user.fullName}
                                        className="mentor-avatar"
                                    />
                                    <div className="mentor-info">
                                        <h3>{mentor.user.fullName}</h3>
                                        <div className="mentor-rating">
                                            ⭐ {mentor.rating} ({mentor.totalSessions} sessions)
                                        </div>
                                    </div>
                                </div>

                                <p className="mentor-bio">{mentor.bio}</p>

                                <div className="mentor-expertise">
                                    {mentor.expertise.map((skill, index) => (
                                        <span key={index} className="tag">{skill}</span>
                                    ))}
                                </div>

                                <div className="mentor-footer">
                                    <div className="mentor-rate">
                                        <span className="amount">₹{mentor.hourlyRate}</span>
                                        <span className="unit">/ session</span>
                                    </div>
                                    <Link to={`/mentors/${mentor.id}`} className="btn btn--outline btn--sm">
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
