import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";

export function OrderSummary({cart, deliveryOptions, selectedDeliveryOptions,setSelectedDeliveryOptions,}) {
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
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">
                        {cartItem.quantity}
                      </span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary">
                      Delete
                    </span>
                  </div>
                </div>
                      <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} selectedId={selectedId} setSelectedDeliveryOptions={setSelectedDeliveryOptions} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
