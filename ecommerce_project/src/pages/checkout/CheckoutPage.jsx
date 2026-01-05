import axios from "axios";
import { useEffect, useState } from "react";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import "./checkout-header.css";
import "./CheckoutPage.css";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [selectedDeliveryOptions, setSelectedDeliveryOptions] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  // Customer Information State
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // Delivery Address State
  const [deliveryAddress, setDeliveryAddress] = useState({
    houseFlat: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    landmark: "",
  });

  // Delivery Instructions State
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  // Billing Address State
  const [sameAsDelivery, setSameAsDelivery] = useState(true);
  const [billingAddress, setBillingAddress] = useState({
    houseFlat: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // Validation State
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  // Handle customer info change
  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle delivery address change
  const handleDeliveryAddressChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Handle billing address change
  const handleBillingAddressChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form before placing order
  const validateForm = () => {
    const errors = [];

    // Customer Info Validation
    if (!customerInfo.fullName.trim()) {
      errors.push("Full Name is required");
    }
    if (!customerInfo.email.trim()) {
      errors.push("Email Address is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.push("Please enter a valid email address");
    }
    if (!customerInfo.phone.trim()) {
      errors.push("Phone Number is required");
    } else if (!/^[0-9]{10}$/.test(customerInfo.phone.replace(/\D/g, ""))) {
      errors.push("Please enter a valid 10-digit phone number");
    }

    // Delivery Address Validation
    if (!deliveryAddress.houseFlat.trim()) {
      errors.push("House/Flat No. is required");
    }
    if (!deliveryAddress.street.trim()) {
      errors.push("Street/Area is required");
    }
    if (!deliveryAddress.city.trim()) {
      errors.push("City is required");
    }
    if (!deliveryAddress.state) {
      errors.push("State is required");
    }
    if (!deliveryAddress.pincode.trim()) {
      errors.push("PIN Code is required");
    } else if (!/^[0-9]{6}$/.test(deliveryAddress.pincode)) {
      errors.push("Please enter a valid 6-digit PIN code");
    }

    // Billing Address Validation (if different from delivery)
    if (!sameAsDelivery) {
      if (!billingAddress.houseFlat.trim()) {
        errors.push("Billing House/Flat No. is required");
      }
      if (!billingAddress.street.trim()) {
        errors.push("Billing Street/Area is required");
      }
      if (!billingAddress.city.trim()) {
        errors.push("Billing City is required");
      }
      if (!billingAddress.state) {
        errors.push("Billing State is required");
      }
      if (!billingAddress.pincode.trim()) {
        errors.push("Billing PIN Code is required");
      } else if (!/^[0-9]{6}$/.test(billingAddress.pincode)) {
        errors.push("Please enter a valid billing 6-digit PIN code");
      }
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowValidationPopup(true);
      return false;
    }

    return true;
  };

  // 🔹 Fetch checkout data
  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );
      setDeliveryOptions(response.data);

      response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };
    fetchCheckoutData();
  }, [cart]);

  // Function to update payment summary
  const updatePaymentSummary = async (productId, deliveryOptionId) => {
    setIsUpdating(true);
    try {
      // Update cart item with selected delivery option
      await axios.put(`/api/cart-items/${productId}`, {
        deliveryOptionId: String(deliveryOptionId),
      });

      // Reload cart to reflect changes
      await loadCart();

      // Fetch updated payment summary
      const response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    } finally {
      setIsUpdating(false);
    }
  };

  // 🔹 Initialize selected delivery options from cart
  useEffect(() => {
    if (Array.isArray(cart)) {
      const initial = {};
      cart.forEach((item) => {
        if (item && item.productId) {
          initial[item.productId] = item.deliveryOptionsId;
        }
      });

      setSelectedDeliveryOptions((prev) =>
        Object.keys(prev).length ? prev : initial
      );
    }
  }, [cart]);

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img
                className="logo"
                src="/images/markethub_logo.png"
                alt="Logo"
              />
              <img
                className="mobile-logo"
                src="/images/markethub_logo.png"
                alt="Logo"
              />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              3 items
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="/images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        {/* Customer Information Section */}
        <div className="checkout-section customer-info-section">
          <h2 className="section-title">
            <span className="section-number">1</span>
            Customer Information
          </h2>
          <div className="section-content">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={customerInfo.fullName}
                  onChange={handleCustomerInfoChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            <div className="form-row two-columns">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleCustomerInfoChange}
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleCustomerInfoChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address Section */}
        <div className="checkout-section delivery-address-section">
          <h2 className="section-title">
            <span className="section-number">2</span>
            Delivery Address
          </h2>
          <div className="section-content">
            <div className="form-row two-columns">
              <div className="form-group">
                <label htmlFor="houseFlat">House/Flat No. *</label>
                <input
                  type="text"
                  id="houseFlat"
                  name="houseFlat"
                  value={deliveryAddress.houseFlat}
                  onChange={handleDeliveryAddressChange}
                  placeholder="Flat 101, Building Name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="street">Street/Area *</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={deliveryAddress.street}
                  onChange={handleDeliveryAddressChange}
                  placeholder="Street name, Area"
                  required
                />
              </div>
            </div>
            <div className="form-row two-columns">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={deliveryAddress.city}
                  onChange={handleDeliveryAddressChange}
                  placeholder="City"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <select
                  id="state"
                  name="state"
                  value={deliveryAddress.state}
                  onChange={handleDeliveryAddressChange}
                  required
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
            </div>
            <div className="form-row two-columns">
              <div className="form-group">
                <label htmlFor="pincode">PIN Code *</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={deliveryAddress.pincode}
                  onChange={handleDeliveryAddressChange}
                  placeholder="6-digit PIN code"
                  maxLength="6"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={deliveryAddress.country}
                  onChange={handleDeliveryAddressChange}
                  disabled
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="landmark">Landmark (Optional)</label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={deliveryAddress.landmark}
                  onChange={handleDeliveryAddressChange}
                  placeholder="Near XYZ, Opposite to ABC"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Instructions Section */}
        <div className="checkout-section delivery-instructions-section">
          <h2 className="section-title">
            <span className="section-number">3</span>
            Delivery Instructions
          </h2>
          <div className="section-content">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="deliveryInstructions">
                  Add delivery instructions (Optional)
                </label>
                <textarea
                  id="deliveryInstructions"
                  name="deliveryInstructions"
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  placeholder="E.g., Leave at door, Call before delivery, Ring doorbell twice..."
                  rows="3"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Billing Address Section */}
        <div className="checkout-section billing-address-section">
          <h2 className="section-title">
            <span className="section-number">4</span>
            Billing Address
          </h2>
          <div className="section-content">
            <div className="same-as-delivery">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={sameAsDelivery}
                  onChange={(e) => setSameAsDelivery(e.target.checked)}
                />
                <span className="checkmark"></span>
                Same as delivery address
              </label>
            </div>

            {!sameAsDelivery && (
              <div className="billing-address-form">
                <div className="form-row two-columns">
                  <div className="form-group">
                    <label htmlFor="billingHouseFlat">House/Flat No. *</label>
                    <input
                      type="text"
                      id="billingHouseFlat"
                      name="houseFlat"
                      value={billingAddress.houseFlat}
                      onChange={handleBillingAddressChange}
                      placeholder="Flat 101, Building Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="billingStreet">Street/Area *</label>
                    <input
                      type="text"
                      id="billingStreet"
                      name="street"
                      value={billingAddress.street}
                      onChange={handleBillingAddressChange}
                      placeholder="Street name, Area"
                      required
                    />
                  </div>
                </div>
                <div className="form-row two-columns">
                  <div className="form-group">
                    <label htmlFor="billingCity">City *</label>
                    <input
                      type="text"
                      id="billingCity"
                      name="city"
                      value={billingAddress.city}
                      onChange={handleBillingAddressChange}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="billingState">State *</label>
                    <select
                      id="billingState"
                      name="state"
                      value={billingAddress.state}
                      onChange={handleBillingAddressChange}
                      required
                    >
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </div>
                </div>
                <div className="form-row two-columns">
                  <div className="form-group">
                    <label htmlFor="billingPincode">PIN Code *</label>
                    <input
                      type="text"
                      id="billingPincode"
                      name="pincode"
                      value={billingAddress.pincode}
                      onChange={handleBillingAddressChange}
                      placeholder="6-digit PIN code"
                      maxLength="6"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="billingCountry">Country</label>
                    <input
                      type="text"
                      id="billingCountry"
                      name="country"
                      value={billingAddress.country}
                      onChange={handleBillingAddressChange}
                      disabled
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Review Section */}
        <div className="checkout-section order-review-section">
          <h2 className="section-title">
            <span className="section-number">5</span>
            Review Items and Delivery
          </h2>
        </div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            selectedDeliveryOptions={selectedDeliveryOptions}
            setSelectedDeliveryOptions={setSelectedDeliveryOptions}
            updatePaymentSummary={updatePaymentSummary}
            loadCart={loadCart}
          />
          <PaymentSummary
            paymentSummary={paymentSummary}
            loadCart={loadCart}
            validateForm={validateForm}
          />
        </div>
      </div>

      {/* Validation Popup Modal */}
      {showValidationPopup && (
        <div
          className="validation-popup-overlay"
          onClick={() => setShowValidationPopup(false)}
        >
          <div
            className="validation-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="validation-popup-header">
              <span className="error-icon">!</span>
              <h3>Please fill in all required fields</h3>
            </div>
            <div className="validation-popup-content">
              <ul className="validation-errors-list">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
            <button
              className="validation-popup-button button-primary"
              onClick={() => setShowValidationPopup(false)}
            >
              OK, I'll fill the form
            </button>
          </div>
        </div>
      )}
    </>
  );
}
