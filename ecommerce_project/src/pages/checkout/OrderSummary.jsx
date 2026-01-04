import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";

export function OrderSummary({
  cart,
  loadCart,
  deliveryOptions,
  selectedDeliveryOptions,
  setSelectedDeliveryOptions,
  updatePaymentSummary,
}) {
  const [editingProductId, setEditingProductId] = useState(null);
  const [tempQuantity, setTempQuantity] = useState(1);

  const deleteCartItem = async (productId) => {
    await axios.delete(`/api/cart-items/${productId}`);
    await loadCart();
  };

  const startEditQuantity = (currentQuantity) => {
    setTempQuantity(currentQuantity);
  };

  const saveQuantity = async (productId) => {
    if (tempQuantity < 1 || tempQuantity > 10) {
      alert("Quantity must be between 1 and 10");
      return;
    }
    await axios.put(`/api/cart-items/${productId}`, {
      quantity: tempQuantity,
    });
    await loadCart();
    setEditingProductId(null);
  };

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          // Determine selected delivery option id for this product
          const selectedId =
            selectedDeliveryOptions[cartItem.productId] ??
            cartItem.deliveryOptionsId ??
            cartItem.deliveryOptionId;

          // Find the matching option to show the delivery date
          const selectedOption = deliveryOptions.find(
            (opt) => String(opt.id) === String(selectedId)
          );

          const isEditing = editingProductId === cartItem.productId;

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                {selectedOption
                  ? `Delivery date: ${dayjs(
                      selectedOption.estimatedDeliveryTimeMs
                    ).format("dddd, MMMM D")}`
                  : "Select a delivery option"}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    {isEditing ? (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <label>Quantity:</label>
                        <select
                          value={tempQuantity}
                          onChange={(e) =>
                            setTempQuantity(Number(e.target.value))
                          }
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                        <button
                          className="link-primary"
                          onClick={() => saveQuantity(cartItem.productId)}
                          style={{ cursor: "pointer", marginLeft: "10px" }}
                        >
                          Save
                        </button>
                        <button
                          className="link-primary"
                          onClick={() => setEditingProductId(null)}
                          style={{ cursor: "pointer" }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <span>
                          Quantity:{" "}
                          <span className="quantity-label">
                            {cartItem.quantity}
                          </span>
                        </span>
                        <span
                          className="update-quantity-link link-primary"
                          onClick={() => {
                            setEditingProductId(cartItem.productId);
                            startEditQuantity(cartItem.quantity);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          Update
                        </span>
                        <span
                          className="delete-quantity-link link-primary"
                          onClick={() => deleteCartItem(cartItem.productId)}
                          style={{ cursor: "pointer" }}
                        >
                          Delete
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <DeliveryOptions
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                  selectedId={selectedId}
                  setSelectedDeliveryOptions={setSelectedDeliveryOptions}
                  updatePaymentSummary={updatePaymentSummary}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
