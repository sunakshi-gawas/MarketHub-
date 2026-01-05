import { useState } from "react";
import "./PaymentMethods.css";

export function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "card",
      cardType: "Visa",
      lastFour: "4532",
      expiryMonth: "12",
      expiryYear: "2027",
      holderName: "John Doe",
      isDefault: true,
    },
    {
      id: 2,
      type: "card",
      cardType: "Mastercard",
      lastFour: "8745",
      expiryMonth: "08",
      expiryYear: "2026",
      holderName: "John Doe",
      isDefault: false,
    },
    {
      id: 3,
      type: "upi",
      upiId: "johndoe@okicici",
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [addType, setAddType] = useState("card");

  const getCardIcon = (cardType) => {
    const icons = {
      Visa: "💳",
      Mastercard: "💳",
      "American Express": "💳",
      Rupay: "💳",
    };
    return icons[cardType] || "💳";
  };

  const handleDelete = (id) => {
    setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id));
  };

  const handleSetDefault = (id) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  return (
    <div className="payment-methods">
      <div className="section-header">
        <h2>Payment Methods</h2>
        <button
          className="add-new-btn button-primary"
          onClick={() => setShowAddForm(true)}
        >
          + Add Payment Method
        </button>
      </div>

      {showAddForm && (
        <div className="add-payment-card">
          <h3>Add Payment Method</h3>

          <div className="payment-type-selector">
            <button
              className={`type-btn ${addType === "card" ? "active" : ""}`}
              onClick={() => setAddType("card")}
            >
              💳 Credit/Debit Card
            </button>
            <button
              className={`type-btn ${addType === "upi" ? "active" : ""}`}
              onClick={() => setAddType("upi")}
            >
              📱 UPI
            </button>
            <button
              className={`type-btn ${addType === "netbanking" ? "active" : ""}`}
              onClick={() => setAddType("netbanking")}
            >
              🏦 Net Banking
            </button>
          </div>

          {addType === "card" && (
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength="19"
                />
              </div>
              <div className="form-group">
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" maxLength="5" />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input type="password" placeholder="XXX" maxLength="3" />
              </div>
              <div className="form-group full-width">
                <label>Cardholder Name</label>
                <input type="text" placeholder="Name on card" />
              </div>
            </div>
          )}

          {addType === "upi" && (
            <div className="form-grid">
              <div className="form-group full-width">
                <label>UPI ID</label>
                <input type="text" placeholder="example@upi" />
              </div>
            </div>
          )}

          {addType === "netbanking" && (
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Select Bank</label>
                <select>
                  <option value="">Choose your bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                  <option value="kotak">Kotak Mahindra Bank</option>
                  <option value="pnb">Punjab National Bank</option>
                </select>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button className="save-btn button-primary">Save</button>
            <button
              className="cancel-btn button-secondary"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="payment-methods-list">
        {paymentMethods.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">💳</span>
            <h3>No payment methods saved</h3>
            <p>Add a payment method for faster checkout.</p>
          </div>
        ) : (
          <>
            {/* Cards Section */}
            <div className="payment-section">
              <h3>Cards</h3>
              <div className="payment-cards-grid">
                {paymentMethods
                  .filter((pm) => pm.type === "card")
                  .map((card) => (
                    <div
                      key={card.id}
                      className={`payment-card ${
                        card.isDefault ? "default" : ""
                      }`}
                    >
                      <div className="card-visual">
                        <div className="card-top">
                          <span className="card-icon">
                            {getCardIcon(card.cardType)}
                          </span>
                          <span className="card-type">{card.cardType}</span>
                        </div>
                        <div className="card-number">
                          •••• •••• •••• {card.lastFour}
                        </div>
                        <div className="card-bottom">
                          <div className="card-holder">{card.holderName}</div>
                          <div className="card-expiry">
                            {card.expiryMonth}/{card.expiryYear.slice(-2)}
                          </div>
                        </div>
                      </div>
                      <div className="card-actions">
                        {card.isDefault ? (
                          <span className="default-badge">✓ Default</span>
                        ) : (
                          <button
                            className="set-default-btn"
                            onClick={() => handleSetDefault(card.id)}
                          >
                            Set as Default
                          </button>
                        )}
                        {!card.isDefault && (
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(card.id)}
                          >
                            🗑️ Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* UPI Section */}
            {paymentMethods.some((pm) => pm.type === "upi") && (
              <div className="payment-section">
                <h3>UPI</h3>
                <div className="upi-list">
                  {paymentMethods
                    .filter((pm) => pm.type === "upi")
                    .map((upi) => (
                      <div key={upi.id} className="upi-item">
                        <div className="upi-info">
                          <span className="upi-icon">📱</span>
                          <span className="upi-id">{upi.upiId}</span>
                        </div>
                        <div className="upi-actions">
                          {upi.isDefault ? (
                            <span className="default-badge small">Default</span>
                          ) : (
                            <>
                              <button
                                className="set-default-btn small"
                                onClick={() => handleSetDefault(upi.id)}
                              >
                                Set Default
                              </button>
                              <button
                                className="delete-btn small"
                                onClick={() => handleDelete(upi.id)}
                              >
                                🗑️
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Security Note */}
      <div className="security-note">
        <span className="security-icon">🔒</span>
        <div className="security-text">
          <strong>Your payment information is secure</strong>
          <p>
            We use industry-standard encryption to protect your payment details.
          </p>
        </div>
      </div>
    </div>
  );
}
