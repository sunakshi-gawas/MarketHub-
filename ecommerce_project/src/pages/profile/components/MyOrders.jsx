import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../../../utils/money";
import { OrderDetails } from "./OrderDetails";
import "./MyOrders.css";

export function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders?expand=products");
        // Add mock status and payment info to orders
        const ordersWithStatus = response.data.map((order, index) => ({
          ...order,
          status: ["Delivered", "Shipped", "Processing", "Cancelled"][
            index % 4
          ],
          paymentMethod: ["Credit Card", "Debit Card", "UPI", "Net Banking"][
            index % 4
          ],
          paymentStatus: index % 4 === 3 ? "Refunded" : "Paid",
        }));
        setOrders(ordersWithStatus);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      Delivered: { icon: "✅", class: "delivered" },
      Shipped: { icon: "🚚", class: "shipped" },
      Processing: { icon: "⏳", class: "processing" },
      Cancelled: { icon: "❌", class: "cancelled" },
    };
    return statusConfig[status] || { icon: "📦", class: "default" };
  };

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  if (selectedOrder) {
    return (
      <OrderDetails
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className="my-orders">
      <div className="section-header">
        <h2>My Orders</h2>
        <div className="order-filters">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Orders</option>
            <option value="Delivered">Delivered</option>
            <option value="Shipped">Shipped</option>
            <option value="Processing">Processing</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📦</span>
          <h3>No orders found</h3>
          <p>You haven't placed any orders yet.</p>
          <a href="/" className="button-primary shop-now-btn">
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order) => {
            const statusInfo = getStatusBadge(order.status);
            return (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-meta">
                    <div className="order-id">
                      <span className="label">Order ID:</span>
                      <span className="value">#{order.id.slice(0, 8)}</span>
                    </div>
                    <div className="order-date">
                      <span className="label">Order Date:</span>
                      <span className="value">
                        {dayjs(order.orderTimeMs).format("MMM D, YYYY")}
                      </span>
                    </div>
                  </div>
                  <div className={`status-badge ${statusInfo.class}`}>
                    <span className="status-icon">{statusInfo.icon}</span>
                    <span className="status-text">{order.status}</span>
                  </div>
                </div>

                <div className="order-card-body">
                  <div className="order-products-preview">
                    {order.products.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="product-preview">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="product-thumb"
                        />
                      </div>
                    ))}
                    {order.products.length > 3 && (
                      <div className="more-products">
                        +{order.products.length - 3} more
                      </div>
                    )}
                  </div>

                  <div className="order-summary">
                    <div className="summary-row">
                      <span className="label">Items:</span>
                      <span className="value">{order.products.length}</span>
                    </div>
                    <div className="summary-row">
                      <span className="label">Total:</span>
                      <span className="value total">
                        {formatMoney(order.totalCostCents)}
                      </span>
                    </div>
                    <div className="summary-row">
                      <span className="label">Payment:</span>
                      <span className="value">{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                <div className="order-card-footer">
                  <button
                    className="view-details-btn button-primary"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </button>
                  {order.status === "Delivered" && (
                    <button className="reorder-btn button-secondary">
                      🔄 Reorder
                    </button>
                  )}
                  {order.status === "Processing" && (
                    <button className="cancel-btn button-secondary">
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
