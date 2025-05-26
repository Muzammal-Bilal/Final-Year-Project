// dashboard.jsx

import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import Profile from "../Views/Profile";
import AI_Doctor from "../Views/AI_Doctor";
import { GiHamburgerMenu } from "react-icons/gi";
import ChatBot from "../Views/Chatbot";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false); // Changed to false
  const [currentView, setCurrentView] = useState("Profile");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Always show sidebar on desktop, hide on mobile
      setShowSidebar(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case "Profile":
        return <Profile />;
      case "AI Doctor":
        return <AI_Doctor/>;
      case "ChatBot":
        return <ChatBot/>;
      default:
        return <div>Invalid View</div>;
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  return (
  <div className="dashboard-container">
    {/* Mobile Hamburger Button */}
    {isMobile && (
      <button 
        className="hamburger-btn"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <GiHamburgerMenu className="hamburger-icon" />
      </button>
    )}
    
    {/* Sidebar */}
    <Sidebar
      className={`sidebar ${isMobile ? 'mobile' : ''} ${showSidebar ? 'show' : ''}`}
      setShowSidebar={setShowSidebar}
      showSidebar={showSidebar}
      setCurrentView={handleViewChange}
      isMobile={isMobile}
    />
    
    {/* Main Content */}
    <div 
      className={`main-container ${!isMobile && showSidebar ? 'with-sidebar' : ''} ${
        isMobile && showSidebar ? 'overlay' : ''
      }`}
      onClick={() => {
        if (isMobile && showSidebar) {
          setShowSidebar(false);
        }
      }}
    >
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  </div>
);
};

export default Dashboard;