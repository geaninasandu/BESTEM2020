import React from 'react';
import '../styles/landingPage.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <div className="menu">
                <Router>
                    <ul type="none">
                        <li><Link>Login</Link></li>
                        <li><Link>Sign in</Link></li>
                        <li><Link>Leaderboard</Link></li>
                    </ul>
                </Router>
            </div>
        </div>
    );
};

export default LandingPage;