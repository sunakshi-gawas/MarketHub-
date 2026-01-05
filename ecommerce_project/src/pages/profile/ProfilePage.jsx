import { useState } from "react";
import { Header } from "../../components/Header";
import { MyProfile } from "./components/MyProfile";
import { MyOrders } from "./components/MyOrders";
import { SavedAddresses } from "./components/SavedAddresses";
import { PaymentMethods } from "./components/PaymentMethods";
import { Wishlist } from "./components/Wishlist";
import "./ProfilePage.css";

export function ProfilePage({ cart, loadCart }) {
  const [activeTab, setActiveTab] = useState("profile");

// Mock user data - in real app, this would come from API/auth
  const [user, setUser] = useState({
    id: 1,
    fullName: "Sunakshi Gawas",
    email: "sunakshi.gawas@example.com",
    phone: "+91 9604513436",
    profilePicture: null,
    accountCreatedDate: "2025-06-15",
  });

  const menuItems = [
    { id: "profile", label: "My Profile", icon: "👤" },
    { id: "orders", label: "My Orders", icon: "📦" },
    { id: "addresses", label: "Saved Addresses", icon: "📍" },
    { id: "payments", label: "Payment Methods", icon: "💳" },
    { id: "wishlist", label: "Wishlist", icon: "❤️" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <MyProfile user={user} setUser={setUser} />;
      case "orders":
        return <MyOrders />;
      case "addresses":
        return <SavedAddresses />;
      case "payments":
        return <PaymentMethods />;
      case "wishlist":
        return <Wishlist cart={cart} loadCart={loadCart} />;
      default:
        return <MyProfile user={user} setUser={setUser} />;
    }
  };

  return (
    <>
      <title>My Account - MarketHub</title>
      <Header cart={cart} />

      <div className="profile-page">
        <div className="profile-container">
          {/* Left Sidebar */}
          <aside className="profile-sidebar">
            <div className="sidebar-header">
              <div className="user-avatar">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt={user.fullName} />
                ) : (
                  <span className="avatar-placeholder">
                    {user.fullName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="user-info">
                <h3 className="user-name">{user.fullName}</h3>
                <p className="user-email">{user.email}</p>
              </div>
            </div>

            <nav className="sidebar-nav">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${
                    activeTab === item.id ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="sidebar-footer">
              <button className="logout-button">
                <span className="nav-icon">🚪</span>
                <span className="nav-label">Logout</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="profile-content">{renderContent()}</main>
        </div>
      </div>
    </>
  );
}
