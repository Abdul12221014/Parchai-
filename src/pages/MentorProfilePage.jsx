import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mentorService } from '../services/mentor.service';
import { sessionService } from '../services/session.service';
import { paymentService } from '../services/payment.service';

export default function MentorProfilePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mentor, setMentor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showBookingModal, setShowBookingModal] = useState(false);

    // Booking State
    const [step, setStep] = useState(1); // 1: Details, 2: Payment
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [userNotes, setUserNotes] = useState('');
    const [bookingLoading, setBookingLoading] = useState(false);
    const [currentSessionId, setCurrentSessionId] = useState(null);

    useEffect(() => {
        fetchMentor();
    }, [id]);

    const fetchMentor = async () => {
        try {
            const response = await mentorService.getMentorById(id);
            setMentor(response.data.mentor);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBookSession = async (e) => {
        e.preventDefault();
        setBookingLoading(true);

        try {
            if (step === 1) {
                // Step 1: Create Session (Pending)
                const scheduledAt = new Date(`${bookingDate}T${bookingTime}`);
                const response = await sessionService.bookSession({
                    mentorId: id,
                    scheduledAt: scheduledAt.toISOString(),
                    userNotes
                });

                setCurrentSessionId(response.data.session.id);
                setStep(2); // Move to payment
                setBookingLoading(false);
            } else {
                // Step 2: Process Payment
                // 1. Create Intent (Mock)
                await paymentService.createPaymentIntent({
                    sessionId: currentSessionId,
                    amount: mentor.hourlyRate
                });

                // 2. Confirm Payment (Mock)
                await paymentService.confirmPayment({
                    sessionId: currentSessionId,
                    paymentId: `pay_${Date.now()}`
                });

                alert('Payment successful! Session confirmed.');
                navigate('/dashboard');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong. Please try again.');
            setBookingLoading(false);
        }
    };

    const closeBookingModal = () => {
        setShowBookingModal(false);
        setStep(1);
        setBookingDate('');
        setBookingTime('');
        setUserNotes('');
    };

    if (loading) return <div className="page-container"><div className="container">Loading...</div></div>;
    if (!mentor) return <div className="page-container"><div className="container">Mentor not found</div></div>;

    return (
        <div className="page-container">
            <div className="container">
                <button onClick={() => navigate('/mentors')} className="btn btn--outline btn--sm" style={{ marginBottom: '24px' }}>
                    ← Back to Mentors
                </button>

                <div className="profile-grid">
                    {/* Left Column: Info */}
                    <div className="profile-main">
                        <div className="profile-header-card">
                            <img src={mentor.user.profileImage} alt={mentor.user.fullName} className="profile-avatar" />
                            <div>
                                <h1>{mentor.user.fullName}</h1>
                                <p className="profile-bio">{mentor.bio}</p>
                                <div className="mentor-expertise">
                                    {mentor.expertise.map((skill, index) => (
                                        <span key={index} className="tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="profile-section">
                            <h2>About Me</h2>
                            <p>
                                I am a passionate mentor with over {mentor.yearsExperience || 10} years of experience.
                                I help individuals find clarity in their career and life choices.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Booking */}
                    <div className="profile-sidebar">
                        <div className="booking-card">
                            <div className="price-tag">
                                <span className="amount">₹{mentor.hourlyRate}</span>
                                <span className="unit">/ session</span>
                            </div>

                            <div className="booking-features">
                                <div className="feature">✅ 1-on-1 Video Call</div>
                                <div className="feature">✅ 60 Minutes Duration</div>
                                <div className="feature">✅ Actionable Feedback</div>
                            </div>

                            <button
                                onClick={() => setShowBookingModal(true)}
                                className="btn btn--primary btn--full"
                            >
                                Book a Session
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{step === 1 ? 'Book Session' : 'Complete Payment'}</h2>
                            <button onClick={closeBookingModal} className="close-btn">×</button>
                        </div>

                        <form onSubmit={handleBookSession} className="booking-form">
                            {step === 1 ? (
                                <>
                                    <div className="form-group">
                                        <label>Select Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={bookingDate}
                                            onChange={(e) => setBookingDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Select Time</label>
                                        <select
                                            required
                                            value={bookingTime}
                                            onChange={(e) => setBookingTime(e.target.value)}
                                        >
                                            <option value="">Choose a slot</option>
                                            <option value="10:00">10:00 AM</option>
                                            <option value="14:00">02:00 PM</option>
                                            <option value="16:00">04:00 PM</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Notes for Mentor</label>
                                        <textarea
                                            rows="3"
                                            placeholder="What would you like to discuss?"
                                            value={userNotes}
                                            onChange={(e) => setUserNotes(e.target.value)}
                                        ></textarea>
                                    </div>
                                </>
                            ) : (
                                <div className="payment-step">
                                    <div className="summary-card">
                                        <h3>Order Summary</h3>
                                        <div className="summary-row">
                                            <span>Session with {mentor.user.fullName}</span>
                                            <span>₹{mentor.hourlyRate}</span>
                                        </div>
                                        <div className="summary-row total">
                                            <span>Total</span>
                                            <span>₹{mentor.hourlyRate}</span>
                                        </div>
                                    </div>

                                    <div className="payment-methods">
                                        <label className="payment-option">
                                            <input type="radio" name="payment" defaultChecked />
                                            <span>Credit/Debit Card</span>
                                        </label>
                                        <label className="payment-option">
                                            <input type="radio" name="payment" />
                                            <span>UPI / Netbanking</span>
                                        </label>
                                    </div>

                                    <div className="secure-badge">
                                        🔒 100% Secure Payment via Stripe/Razorpay
                                    </div>
                                </div>
                            )}

                            <div className="modal-footer">
                                {step === 1 && (
                                    <div className="total-price">
                                        <span>Total:</span>
                                        <span className="amount">₹{mentor.hourlyRate}</span>
                                    </div>
                                )}
                                <button type="submit" className="btn btn--primary" disabled={bookingLoading}>
                                    {bookingLoading ? 'Processing...' : (step === 1 ? 'Proceed to Payment' : `Pay ₹${mentor.hourlyRate}`)}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
