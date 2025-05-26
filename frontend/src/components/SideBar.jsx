// sideBar.jsx
import React, { useState, useEffect } from "react";
import { RxDashboard } from "react-icons/rx";
import { IoPersonOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { TbMessageChatbotFilled } from "react-icons/tb";

const Sidebar = ({showSidebar, setShowSidebar, setCurrentView, isMobile}) => {
  const links = [
    { name: "Profile", icon: <IoPersonOutline style={{ fontSize: "1.2rem", marginRight: '5px' }} /> },
    { name: "AI Doctor", icon: <FaUserDoctor style={{ fontSize: "1.2rem", marginRight: '5px' }} /> },
    { name: "ChatBot", icon: <TbMessageChatbotFilled style={{ fontSize: "1.2rem", marginRight: '5px' }} /> },
  ];
  const [activeLink, setActiveLink] = useState("Profile");

  useEffect(() => {
    setActiveLink(activeLink);
  }, [activeLink]);

  return (
    <aside
      className={`sidebar ${showSidebar ? "sidebar-show" : "sidebar-hide"} ${
        isMobile ? "mobile-sidebar" : ""
      }`}
    >
      <a href="/" className="logo-link">
        <img
          src="./logo.png"
          alt="logo"
          className="logo"
        />
      </a>

      <div className="sidebar-content">
        {/* Dashboard Button */}
        <div className="dashboard-button">
          <span className="dashboard-text">Dashboard</span>
          <RxDashboard className="dashboard-icon" />
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          {links.map((link) => (
            <li
              key={link.name}
              onClick={() => {
                setActiveLink(link.name);
                setCurrentView(link.name);
              }}
              className={`nav-item ${activeLink === link.name ? "active" : ""}`}
            >
              {link.icon}
              <span>{link.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
