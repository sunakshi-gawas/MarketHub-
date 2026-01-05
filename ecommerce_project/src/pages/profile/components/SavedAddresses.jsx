import { useState } from "react";
import "./SavedAddresses.css";

export function SavedAddresses() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "Sunakshi Gawas",
      phone: "+91 9604513436",
      houseFlat: "Sr.no 14 Jay jawan nager",
      street: "yerwda road, Pune",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411006",
      country: "India",
      isDefault: true,
    },
    {
      id: 2,
      type: "Office",
      name: "Sunakshi Gawas",
      phone: "+91 9604513436",
      houseFlat: "Floor 5, Tech Park",
      street: "Outer Ring Road, Marathahalli",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560037",
      country: "India",
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: "Home",
    name: "",
    phone: "",
    houseFlat: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNew = () => {
    setFormData({
      type: "Home",
      name: "",
      phone: "",
      houseFlat: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    });
    setEditingId(null);
    setShowAddForm(true);
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address.id);
    setShowAddForm(true);
  };

  const handleSave = () => {
    if (editingId) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingId ? { ...formData, id: editingId } : addr
        )
      );
    } else {
      setAddresses((prev) => [
        ...prev,
        { ...formData, id: Date.now(), isDefault: prev.length === 0 },
      ]);
    }
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <div className="saved-addresses">
      <div className="section-header">
        <h2>Saved Addresses</h2>
        <button className="add-new-btn button-primary" onClick={handleAddNew}>
          + Add New Address
        </button>
      </div>

      {showAddForm && (
        <div className="address-form-card">
          <h3>{editingId ? "Edit Address" : "Add New Address"}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Address Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="Home">🏠 Home</option>
                <option value="Office">🏢 Office</option>
                <option value="Other">📍 Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div className="form-group full-width">
              <label>House/Flat No., Building Name</label>
              <input
                type="text"
                name="houseFlat"
                value={formData.houseFlat}
                onChange={handleInputChange}
                placeholder="Flat 101, Building Name"
              />
            </div>
            <div className="form-group full-width">
              <label>Street, Area</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                placeholder="Street name, Area"
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              >
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Delhi">Delhi</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <div className="form-group">
              <label>PIN Code</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="6-digit PIN"
                maxLength="6"
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                disabled
              />
            </div>
          </div>
          <div className="form-actions">
            <button className="save-btn button-primary" onClick={handleSave}>
              {editingId ? "Update Address" : "Save Address"}
            </button>
            <button
              className="cancel-btn button-secondary"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="addresses-list">
        {addresses.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📍</span>
            <h3>No saved addresses</h3>
            <p>Add your first delivery address to get started.</p>
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              className={`address-card ${address.isDefault ? "default" : ""}`}
            >
              <div className="address-header">
                <div className="address-type">
                  <span className="type-icon">
                    {address.type === "Home"
                      ? "🏠"
                      : address.type === "Office"
                      ? "🏢"
                      : "📍"}
                  </span>
                  <span className="type-label">{address.type}</span>
                  {address.isDefault && (
                    <span className="default-badge">Default</span>
                  )}
                </div>
                <div className="address-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(address)}
                  >
                    ✏️ Edit
                  </button>
                  {!address.isDefault && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(address.id)}
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>
              <div className="address-body">
                <p className="name">{address.name}</p>
                <p className="address-line">{address.houseFlat}</p>
                <p className="address-line">{address.street}</p>
                <p className="address-line">
                  {address.city}, {address.state} - {address.pincode}
                </p>
                <p className="address-line">{address.country}</p>
                <p className="phone">📞 {address.phone}</p>
              </div>
              {!address.isDefault && (
                <button
                  className="set-default-btn"
                  onClick={() => handleSetDefault(address.id)}
                >
                  Set as Default
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
