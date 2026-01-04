// Adjustable exchange rate to keep displayed prices reasonable.
const USD_TO_INR = 10;

// Formats an amount (in USD cents) to Indian Rupees.
// Example: 1999 cents => ₹1659.17 when using an 83 INR/USD rate.
export function formatMoney(amountCents) {
    const rupees = (amountCents / 100) * USD_TO_INR;
    return `₹${rupees.toFixed(2)}`;
}