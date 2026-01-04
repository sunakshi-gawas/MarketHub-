import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { Header } from "../components/Header";
import "./TrackingPage.css";

export function TrackingPage({ cart }) {
  const [searchParams] = useSearchParams();
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const orderId = searchParams.get("orderId");
      const productId = searchParams.get("productId");

      if (!orderId || !productId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/orders?expand=products`);
        const order = response.data.find((o) => o.id === orderId);

        if (order) {
          const orderProduct = order.products.find(
            (p) => p.product.id === productId
          );
          if (orderProduct) {
            setTrackingData({
              order,
              product: orderProduct,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching tracking data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingData();
  }, [searchParams]);

  // Calculate delivery status based on dates
  const getDeliveryStatus = () => {
    if (!trackingData)
      return { preparing: false, shipped: false, delivered: false };

    const orderDate = dayjs(trackingData.order.orderTimeMs);
    const deliveryDate = dayjs(trackingData.product.estimatedDeliveryTimeMs);
    const today = dayjs();

    const totalDuration = deliveryDate.diff(orderDate, "day");
    const daysPassed = today.diff(orderDate, "day");

    if (daysPassed >= totalDuration) {
      return { preparing: true, shipped: true, delivered: true };
    } else if (daysPassed >= totalDuration / 2) {
      return { preparing: true, shipped: true, delivered: false };
    } else {
      return { preparing: true, shipped: false, delivered: false };
    }
  };

  const status = getDeliveryStatus();

  if (loading) {
    return (
      <>
        <Header cart={cart} />
        <div className="tracking-page">
          <div className="order-tracking">Loading...</div>
        </div>
      </>
    );
  }

  if (!trackingData) {
    return (
      <>
        <Header cart={cart} />
        <div className="tracking-page">
          <div className="order-tracking">
            <a className="back-to-orders-link link-primary" href="/orders">
              View all orders
            </a>
            <div className="product-info">
              No tracking information available.
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <title>Tracking Page</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          <div className="delivery-date">
            Arriving on{" "}
            {dayjs(trackingData.product.estimatedDeliveryTimeMs).format(
              "dddd, MMMM D"
            )}
          </div>

          <div className="product-info">
            {trackingData.product.product.name}
          </div>

          <div className="product-info">
            Quantity: {trackingData.product.quantity}
          </div>

          <img
            className="product-image"
            src={trackingData.product.product.image}
          />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${
                status.preparing ? "current-status" : ""
              }`}
            >
              Preparing
            </div>
            <div
              className={`progress-label ${
                status.shipped && !status.delivered ? "current-status" : ""
              }`}
            >
              Shipped
            </div>
            <div
              className={`progress-label ${
                status.delivered ? "current-status" : ""
              }`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: status.delivered
                  ? "100%"
                  : status.shipped
                  ? "50%"
                  : "0%",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
