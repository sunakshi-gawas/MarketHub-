import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
export function DeliveryOptions({ deliveryOptions , cartItem, selectedId, setSelectedDeliveryOptions }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>

      {deliveryOptions.map((option) => {
        let priceString = "FREE Shipping";

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
                  [cartItem.productId]: Number(e.target.value), // ✅ FIXED
                }))
              }
            />

            <div>
              <div className="delivery-option-date">
                {dayjs(option.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
