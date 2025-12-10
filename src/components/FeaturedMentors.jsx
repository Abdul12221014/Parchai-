import React, { useEffect, useState } from 'react';
import { mentorService } from '../services/mentor.service';
import { useNavigate } from 'react-router-dom';

export default function FeaturedMentors() {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await mentorService.getAllMentors({});
                // Get 3 random mentors or top 3
                if (response.data && response.data.mentors) {
                    const allMentors = response.data.mentors;
                    const featured = allMentors.slice(0, 3);
                    setMentors(featured);
                }
            } catch (err) {
                console.error("Failed to fetch featured mentors", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    if (loading) return null; // Or a skeleton loader
    if (mentors.length === 0) return null;

    return (
        <section className="section">
            <div className="container">
                <div className="section-title">
                    <h2>Top Rated Mentors</h2>
                    <p>Learn from the best in the industry</p>
                </div>

                <div className="mentor-grid">
                    {mentors.map(mentor => (
                        <div key={mentor.id} className="mentor-card fade-in">
                            <div className="mentor-header">
                                <div className="mentor-image-container">
                                    <img
                                        src={mentor.user.profileImage || `https://ui-avatars.com/api/?name=${mentor.user.fullName}&background=random`}
                                        alt={mentor.user.fullName}
                                        className="mentor-image"
                                    />
                                    {mentor.isVerified && <span className="verified-badge" title="Verified Mentor">✓</span>}
                                </div>
                                <div className="mentor-info">
                                    <h3>{mentor.user.fullName}</h3>
                                    <p className="mentor-expertise">{mentor.expertise.slice(0, 2).join(', ')}</p>
                                    <div className="mentor-rating">
                                        ⭐ {mentor.rating} <span style={{ color: 'var(--color-grey-400)' }}>({mentor.totalReviews} reviews)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mentor-body">
                                <p className="mentor-bio" style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {mentor.bio}
                                </p>
                            </div>
                            <div className="mentor-footer">
                                <div className="mentor-price">
                                    {mentor.currency} {mentor.hourlyRate}<span className="unit">/hr</span>
                                </div>
                                <button
                                    onClick={() => navigate(`/mentors/${mentor.id}`)}
                                    className="btn btn--primary btn--sm"
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <button onClick={() => navigate('/mentors')} className="btn btn--outline">
                        View All Mentors
                    </button>
                </div>
            </div>
        </section>
    );
}
