# MarketHub - E-Commerce Platform 🛍️

A modern, full-featured e-commerce web application built with React and Vite featuring a beautiful lavender/purple theme.

## 🚀 Features

- **Home Page** - Product grid with 7-column responsive layout, ratings, "Add to Cart" with popup confirmation
- **Checkout Page** - Customer info, delivery address, billing address, delivery instructions, form validation
- **Orders Page** - Order history with tracking links
- **Tracking Page** - Visual progress bar (Preparing → Shipped → Delivered)
- **User Profile** - Complete dashboard with sidebar navigation

### 👤 Profile Section

| Tab             | Features                                                              |
| --------------- | --------------------------------------------------------------------- |
| My Profile      | Edit name, email, phone, security options                             |
| My Orders       | Status badges (✅ Delivered, 🚚 Shipped, ⏳ Processing, ❌ Cancelled) |
| Order Details   | Tracking timeline, invoice, return/replace options                    |
| Saved Addresses | Add/edit/delete, set default                                          |
| Payment Methods | Cards, UPI, Net Banking                                               |
| Wishlist        | Save products, add to cart                                            |

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool
- **React Router DOM 7.11.0** - Routing
- **Axios 1.8.4** - API calls
- **Day.js 1.11.13** - Date formatting
- **Vitest** - Testing

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   └── header.css
├── pages/
│   ├── home/
│   │   ├── HomePage.jsx
│   │   ├── HomePage.css
│   │   └── Product.jsx
│   ├── checkout/
│   │   ├── CheckoutPage.jsx
│   │   ├── CheckoutPage.css
│   │   ├── OrderSummary.jsx
│   │   └── PaymentSummary.jsx
│   ├── orders/
│   │   ├── OrdersPage.jsx
│   │   └── OrdersPage.css
│   ├── profile/
│   │   ├── ProfilePage.jsx
│   │   ├── ProfilePage.css
│   │   └── components/
│   │       ├── MyProfile.jsx/css
│   │       ├── MyOrders.jsx/css
│   │       ├── OrderDetails.jsx/css
│   │       ├── SavedAddresses.jsx/css
│   │       ├── PaymentMethods.jsx/css
│   │       └── Wishlist.jsx/css
│   ├── TrackingPage.jsx
│   └── TrackingPage.css
├── utils/
│   └── money.js
├── App.jsx
└── main.jsx
```

## 🎨 Theme

- **Primary**: `rgb(167, 139, 250)` (Lavender)
- **Navbar**: `rgb(196, 165, 230)` (Light Purple)
- **Currency**: Indian Rupees (₹)

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 🔗 Routes

| Route       | Page             |
| ----------- | ---------------- |
| `/`         | Home             |
| `/checkout` | Checkout         |
| `/orders`   | Orders           |
| `/tracking` | Package Tracking |
| `/profile`  | User Profile     |

---

Built with ❤️ by Sunakshi Gawas
