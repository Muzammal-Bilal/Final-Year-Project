import React from "react";
import {useSelector} from "react-redux"


const Profile = () => {
    const userData = useSelector((state) => state.auth.user);
  const user = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    nic: userData.nic,
    dob: userData.dob,
    gender: userData.gender,
    role: userData.role
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-icon">👤</span>
        </div>
        <h2 className="profile-title">User Profile</h2>
        <p className="profile-subtitle">View and manage your account details</p>
      </div>

      <div className="profile-card">
        <form className="profile-form">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <div className="form-input">{user.firstName}</div>
            </div>

            <div className="form-group">
              <label className="form-label">Last Name</label>
              <div className="form-input">{user.lastName}</div>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="form-input">{user.email}</div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              <div className="form-input">{user.phone}</div>
            </div>

            <div className="form-group">
              <label className="form-label">NIC</label>
              <div className="form-input">{user.nic}</div>
            </div>

            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <div className="form-input">
                {new Date(user.dob).toLocaleDateString()}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <div className="form-input">{user.gender}</div>
            </div>

            <div className="form-group">
              <label className="form-label">Role</label>
              <div className={`form-input role-badge ${user.role.toLowerCase()}`}>
                {user.role}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;