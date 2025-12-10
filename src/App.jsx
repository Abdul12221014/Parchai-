import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MentorListingPage from './pages/MentorListingPage';
import MentorProfilePage from './pages/MentorProfilePage';
import MentorDashboardPage from './pages/MentorDashboardPage';
import SettingsPage from './pages/SettingsPage';
import NotificationToast from './ui/NotificationToast';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <NotificationToast />
            <div id="founder"></div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/mentors" element={<MentorListingPage />} />
                <Route path="/mentors/:id" element={<MentorProfilePage />} />
                <Route
                    path="/mentor/dashboard"
                    element={
                        <ProtectedRoute>
                            <MentorDashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <SettingsPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            <footer className="footer">
                <div className="container">
                    <div className="footer__grid">
                        <div className="footer__brand">
                            <img src="/logo-full.png" alt="Parchai" style={{ height: '28px', opacity: 0.8 }} />
                            <p>The emotional OS for the next generation. Helping you find clarity in a confused world.</p>
                        </div>

                        <div className="footer__col">
                            <h4>Company</h4>
                            <ul className="footer__links">
                                <li><a href="#">About</a></li>
                                <li><a href="#">Our Story</a></li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                        </div>

                        <div className="footer__col">
                            <h4>Resources</h4>
                            <ul className="footer__links">
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Clarity Guide</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>

                        <div className="footer__col">
                            <h4>Legal</h4>
                            <ul className="footer__links">
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer__bottom">
                        <p>© 2025 Parchai — All rights reserved.</p>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            <a href="#" aria-label="Twitter">Twitter</a>
                            <a href="#" aria-label="Instagram">Instagram</a>
                            <a href="#" aria-label="LinkedIn">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </footer>
        </BrowserRouter>
    );
}

export default App;
