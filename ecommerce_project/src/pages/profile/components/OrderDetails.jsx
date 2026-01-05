import dayjs from "dayjs";
import { formatMoney } from "../../../utils/money";
import "./OrderDetails.css";

export function OrderDetails({ order, onBack }) {
  const getStatusBadge = (status) => {
    const statusConfig = {
      Delivered: { icon: "✅", class: "delivered" },
      Shipped: { icon: "🚚", class: "shipped" },
      Processing: { icon: "⏳", class: "processing" },
      Cancelled: { icon: "❌", class: "cancelled" },
    };
    return statusConfig[status] || { icon: "📦", class: "default" };
  };

  const getTrackingSteps = (status) => {
    const steps = [
      { id: 1, label: "Order Placed", icon: "📝", date: order.orderTimeMs },
      {
        id: 2,
        label: "Processing",
        icon: "⏳",
        date: order.orderTimeMs + 86400000,
      },
      {
        id: 3,
        label: "Shipped",
        icon: "🚚",
        date: order.orderTimeMs + 172800000,
      },
      {
        id: 4,
        label: "Out for Delivery",
        icon: "🚛",
        date: order.orderTimeMs + 259200000,
      },
      {
        id: 5,
        label: "Delivered",
        icon: "✅",
        date: order.orderTimeMs + 345600000,
      },
    ];

    const statusIndex = {
      Processing: 2,
      Shipped: 3,
      Delivered: 5,
      Cancelled: 0,
    };

    const currentStep = statusIndex[status] || 1;
    return steps.map((step) => ({
      ...step,
      completed: step.id <= currentStep,
      current: step.id === currentStep,
    }));
  };

  const statusInfo = getStatusBadge(order.status);
  const trackingSteps = getTrackingSteps(order.status);

  return (
    <div className="order-details">
      {/* Back Button */}
      <button className="back-button" onClick={onBack}>
        ← Back to Orders
      </button>

      {/* Order Header */}
      <div className="order-details-header">
        <div className="header-left">
          <h2>Order Details</h2>
          <div className="order-id">Order #{order.id.slice(0, 8)}</div>
        </div>
        <div className={`status-badge ${statusInfo.class}`}>
          <span className="status-icon">{statusInfo.icon}</span>
          <span className="status-text">{order.status}</span>
        </div>
      </div>

      {/* Order Information Card */}
      <div className="info-card">
        <h3>🧾 Order Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Order ID</span>
            <span className="value">{order.id}</span>
          </div>
          <div className="info-item">
            <span className="label">Order Date</span>
            <span className="value">
              {dayjs(order.orderTimeMs).format("MMMM D, YYYY [at] h:mm A")}
            </span>
          </div>
          <div className="info-item">
            <span className="label">Payment Method</span>
            <span className="value">{order.paymentMethod}</span>
          </div>
          <div className="info-item">
            <span className="label">Payment Status</span>
            <span
              className={`value payment-status ${order.paymentStatus.toLowerCase()}`}
            >
              {order.paymentStatus}
            </span>
          </div>
        </div>
        <button className="download-invoice-btn button-secondary">
          📄 Download Invoice (PDF)
        </button>
      </div>

      {/* Tracking Status (if not cancelled) */}
      {order.status !== "Cancelled" && (
        <div className="info-card tracking-card">
          <h3>🚚 Order Tracking</h3>
          <div className="tracking-timeline">
            {trackingSteps.map((step, index) => (
              <div
                key={step.id}
                className={`tracking-step ${
                  step.completed ? "completed" : ""
                } ${step.current ? "current" : ""}`}
              >
                <div className="step-icon-wrapper">
                  <div className="step-icon">{step.icon}</div>
                  {index < trackingSteps.length - 1 && (
                    <div
                      className={`step-line ${
                        trackingSteps[index + 1].completed ? "completed" : ""
                      }`}
                    ></div>
                  )}
                </div>
                <div className="step-content">
                  <span className="step-label">{step.label}</span>
                  {step.completed && (
                    <span className="step-date">
                      {dayjs(step.date).format("MMM D, h:mm A")}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products Ordered */}
      <div className="info-card products-card">
        <h3>📦 Products Ordered ({order.products.length} items)</h3>
        <div className="products-list">
          {order.products.map((item, index) => (
            <div key={index} className="product-item">
              <div className="product-image">
                <img src={item.product.image} alt={item.product.name} />
              </div>
              <div className="product-info">
                <h4 className="product-name">{item.product.name}</h4>
                <div className="product-meta">
                  <span className="product-price">
                    {formatMoney(item.product.priceCents)}
                  </span>
                  <span className="product-quantity">Qty: {item.quantity}</span>
                </div>
                <div className="product-delivery">
                  <span className="delivery-label">Delivery by:</span>
                  <span className="delivery-date">
                    {dayjs(item.estimatedDeliveryTimeMs).format("MMMM D, YYYY")}
                  </span>
                </div>
              </div>
              <div className="product-actions">
                {order.status === "Delivered" && (
                  <>
                    <button className="action-btn return-btn">↩️ Return</button>
                    <button className="action-btn replace-btn">
                      🔄 Replace
                    </button>
                  </>
                )}
                <a
                  href={`/tracking?orderId=${order.id}&productId=${item.product.id}`}
                  className="action-btn track-btn"
                >
                  📍 Track
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Information */}
      <div className="info-card delivery-card">
        <h3>📍 Delivery Information</h3>
        <div className="delivery-info">
          <div className="address-section">
            <h4>Delivery Address</h4>
            <p className="address-text">
              John Doe
              <br />
              Flat 101, Building Name
              <br />
              Street Name, Area
              <br />
              City, State - 400001
              <br />
              India
            </p>
            <p className="phone">📞 +91 98765 43210</p>
          </div>
          <div className="instructions-section">
            <h4>Delivery Instructions</h4>
            <p className="instructions-text">
              Leave at door. Ring the doorbell twice.
            </p>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="info-card summary-card">
        <h3>💰 Order Summary</h3>
        <div className="summary-rows">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatMoney(order.totalCostCents * 0.82)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping & Handling</span>
            <span>{formatMoney(order.totalCostCents * 0.08)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (10%)</span>
            <span>{formatMoney(order.totalCostCents * 0.1)}</span>
          </div>
          <div className="summary-row total">
            <span>Order Total</span>
            <span>{formatMoney(order.totalCostCents)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="order-actions">
        {order.status === "Processing" && (
          <button className="action-btn cancel-order-btn">
            ❌ Cancel Order
          </button>
        )}
        <button className="action-btn help-btn button-secondary">
          💬 Need Help?
        </button>
      </div>
    </div>
  );
}
