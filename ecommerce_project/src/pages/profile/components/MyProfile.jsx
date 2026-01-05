import { useState } from "react";
import dayjs from "dayjs";
import "./MyProfile.css";

export function MyProfile({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  return (
    <div className="my-profile">
      <div className="section-header">
        <h2>My Profile</h2>
        {!isEditing && (
          <button
            className="edit-button button-secondary"
            onClick={() => setIsEditing(true)}
          >
            ✏️ Edit Profile
          </button>
        )}
      </div>

      <div className="profile-card">
        {/* Profile Picture Section */}
        <div className="profile-picture-section">
          <div className="profile-picture-container">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.fullName}
                className="profile-picture"
              />
            ) : (
              <div className="profile-picture-placeholder">
                <span>{user.fullName.charAt(0).toUpperCase()}</span>
              </div>
            )}
            {isEditing && (
              <button className="change-photo-btn">📷 Change Photo</button>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <div className="detail-row">
            <label>Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={editedUser.fullName}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span className="detail-value">{user.fullName}</span>
            )}
          </div>

          <div className="detail-row">
            <label>Email Address</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span className="detail-value">{user.email}</span>
            )}
          </div>

          <div className="detail-row">
            <label>Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span className="detail-value">{user.phone}</span>
            )}
          </div>

          <div className="detail-row">
            <label>Account Created</label>
            <span className="detail-value">
              {dayjs(user.accountCreatedDate).format("MMMM D, YYYY")}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="profile-actions">
            <button className="save-button button-primary" onClick={handleSave}>
              Save Changes
            </button>
            <button
              className="cancel-button button-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Account Security Section */}
      <div className="security-section">
        <h3>Account Security</h3>
        <div className="security-options">
          <button className="security-btn">
            <span className="security-icon">🔐</span>
            <div className="security-info">
              <span className="security-title">Change Password</span>
              <span className="security-desc">
                Update your account password
              </span>
            </div>
            <span className="arrow">→</span>
          </button>
          <button className="security-btn">
            <span className="security-icon">📱</span>
            <div className="security-info">
              <span className="security-title">Two-Factor Authentication</span>
              <span className="security-desc">
                Add extra security to your account
              </span>
            </div>
            <span className="arrow">→</span>
          </button>
          <button className="security-btn danger">
            <span className="security-icon">🗑️</span>
            <div className="security-info">
              <span className="security-title">Delete Account</span>
              <span className="security-desc">
                Permanently delete your account
              </span>
            </div>
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
