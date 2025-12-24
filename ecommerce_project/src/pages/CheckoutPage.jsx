import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { formatMoney } from '../utils/money';
import './checkout-header.css';
import './CheckoutPage.css';

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  // Track selected delivery option per productId
  const [selectedDeliveryOptions, setSelectedDeliveryOptions] = useState({});

  useEffect(() => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((response) => {
        setDeliveryOptions(response.data);
      }); 
    
    axios.get('/api/payment-summary')
      .then((response) => {
        setPaymentSummary(response.data);
      });
  }, []);

  // Initialize selected delivery options from cart when cart changes
  useEffect(() => {
    if (Array.isArray(cart)) {
      const initial = {};
      cart.forEach((item) => {
        if (item && item.productId) {
          initial[item.productId] = item.deliveryOptionsId;
        }
      });
      // Only initialize if we don't already have a selection,
      // to avoid overwriting the user's choice on subsequent renders.
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
              <img className="logo" src="/images/logo-white.png" alt="Logo" />
              <img className="mobile-logo" src="/images/mobile-logo-white.png" alt="Logo" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link" href="/">3 items</a>)
          </div>

          <div className="checkout-header-right-section">
            <img src="/images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
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
                      ? `Delivery date: ${dayjs(selectedOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}`
                      : 'Select a delivery option'}
                  </div>

                  <div className="cart-item-details-grid">
                    <img
                      className="product-image"
                      src={cartItem.product.image}
                    />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartItem.product.name}
                      </div>
                      <div className="product-price">
                        {formatMoney(cartItem.product.priceCents)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>

                      {deliveryOptions.map((option) => {
                        let priceString = 'FREE Shipping';

                        if (option.priceCents > 0) {
                          priceString = `${formatMoney(option.priceCents)} - Shipping`;
                        }

                        const isSelected =
                          selectedId != null && String(selectedId) === String(option.id);

                        return (
                          <div
                            key={option.id}
                            className="delivery-option"
                            onClick={() =>
                              setSelectedDeliveryOptions((prev) => ({
                                ...prev,
                                [cartItem.productId]: option.id,
                              }))
                            }
                          >
                            <input
                              type="radio"
                              className="delivery-option-input"
                              name={`delivery-option-${cartItem.productId}`}
                              value={option.id}
                              checked={!!isSelected}
                              onChange={(e) =>
                                setSelectedDeliveryOptions((prev) => ({
                                  ...prev,
                                  [cartItem.productId]: Number(e.target.value) // ✅ FIXED
                                }))
                              }
                            />

                            <div>
                              <div className="delivery-option-date">
                                {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                              </div>
                              <div className="delivery-option-price">
                                {priceString}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

            
            {paymentSummary && (
              <>
                <div className="payment-summary-row">
              <div>Items ({paymentSummary.totalItems}):</div>
              <div className="payment-summary-money">
                {formatMoney(paymentSummary.productsTotalCents)}
              </div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">
                {formatMoney(paymentSummary.shippingCostCents)}
              </div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">
                {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
              </div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">
                {formatMoney(paymentSummary.taxCents)}
              </div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">
                 {formatMoney(paymentSummary.totalCostCents)}
              </div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
                </button>
            </>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}
