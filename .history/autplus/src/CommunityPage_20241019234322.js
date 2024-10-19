import React from 'react';
import './CommunityPage.css'; // Ensure your CSS file is imported

const CommunityPage = () => {
    return (
        <div className="community-container">
            <header className="header">
                <div className="left-header">
                    <img className="logo" src="your-logo-url" alt="Logo" />
                </div>
                <div className="right-header">
                    <img className="profile-pic" src="your-profile-pic-url" alt="Profile" />
                </div>
            </header>

            <div className="forum-container">
                <div className="forum-header">
                    <span className="forum-title">Forum</span>
                    <span className="forum-title">Topics</span>
                    <span className="forum-title">Posts</span>
                    <span className="forum-title">Last Posts</span>
                </div>

                <div className="forum-buttons">
                    <button className="forum-button">Official Announcements</button>
                    <button className="forum-button">Community</button>
                    <button className="forum-button">Clubs</button>
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
