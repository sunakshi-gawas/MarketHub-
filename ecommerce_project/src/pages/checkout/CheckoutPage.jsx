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

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            selectedDeliveryOptions={selectedDeliveryOptions}
            setSelectedDeliveryOptions={setSelectedDeliveryOptions}
            updatePaymentSummary={updatePaymentSummary}
            loadCart={loadCart}
          />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}
