# MarketHub - E-Commerce Platform

A modern, full-featured e-commerce web application built with React and Vite. This project features a beautiful lavender/purple theme with a complete shopping experience including product browsing, cart management, checkout, order tracking, and a comprehensive user profile section.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## 📸 Screenshots

### Home Page

![Home Page](project%20ss/ss1.png)

### Product Grid

![Product Grid](project%20ss/ss2.png)

### Placed Order Details 
![Placed Order Details](project%20ss/ss3.png)

### Checkout Page

![Checkout Page](project%20ss/ss4.png)

### Order Confirmation

![Order Confirmation](project%20ss/ss5.png)

### profile Page

![Profile Page](project%20ss/ss6.png)

### Order Tracking

![Order Tracking](project%20ss/ss7.png)

### order Tracking Detail 

![User Profile](project%20ss/ss8.png)

### Save Address (Profile)

![Save Address Profile](project%20ss/ss9.png)

### Payment Methods

![Payment Methods](project%20ss/ss10.png)

### WishLists

![WishLists](project%20ss/ss11.png)

## 🚀 Features

### 🏠 Home Page

- **Product Grid**: Responsive 7-column product display with hover effects
- **Product Cards**: Image, name, rating stars, price (₹ INR), and "Add to Cart" button
- **"Added" Popup**: Visual confirmation when items are added to cart
- **Search Bar**: Product search functionality
- **Responsive Design**: Adapts from 7 columns down to 2 on mobile

### 🛒 Checkout Page

- **Customer Information**: Full name, email, phone validation
- **Delivery Address**: Complete address form with Indian states dropdown
- **Delivery Instructions**: Special instructions textarea
- **Billing Address**: Same as delivery or separate billing
- **Delivery Options**: Multiple shipping speeds with real-time price updates
- **Payment Summary**: Live calculation of subtotal, shipping, tax, and total
- **Form Validation**: Popup alerts for missing required fields

### 📦 Orders Page

- Order history with product details
- Delivery date tracking
- "Add to Cart" (buy again) functionality
- Track package links

### 📍 Tracking Page

- Dynamic order tracking with URL parameters
- Visual progress bar (Preparing → Shipped → Delivered)
- Estimated delivery dates
- Product-specific tracking

### 👤 User Profile Section (My Account)

Complete personal dashboard with sidebar navigation:

| Section             | Features                                                                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **My Profile**      | Profile picture, name, email, phone, account created date, edit functionality, security options (change password, 2FA, delete account)       |
| **My Orders**       | Order list with status badges (✅ Delivered, 🚚 Shipped, ⏳ Processing, ❌ Cancelled), filter by status, order cards with product thumbnails |
| **Order Details**   | Order info, invoice download, visual tracking timeline, products with return/replace options, delivery address & instructions, order summary |
| **Saved Addresses** | Add/edit/delete addresses, address types (Home/Office/Other), set default, full form with state dropdown                                     |
| **Payment Methods** | Credit/Debit cards with visual design, UPI IDs, Net Banking, set default payment                                                             |
| **Wishlist**        | Product grid, add to cart, remove items, "Add All to Cart" button                                                                            |

## 🛠️ Tech Stack

### Frontend

- **React 19.2.0** - UI library with hooks (useState, useEffect)
- **Vite 7.2.4** - Build tool and dev server
- **React Router DOM 7.11.0** - Client-side routing
- **Axios 1.8.4** - HTTP client for API calls
- **Day.js 1.11.13** - Date formatting

### Testing

- **Vitest 3.1.2** - Test runner
- **Testing Library (React)** - Component testing
- **JSDOM** - DOM environment for tests

### Development

- **ESLint 9.39.1** - Code linting
- **Vite Plugin React** - React Fast Refresh

## 📁 Project Structure

```
ecommerce_project/
├── public/
│   └── images/
│       ├── icons/          # UI icons (cart, search, check, etc.)
│       ├── products/       # Product images
│       └── ratings/        # Star rating images
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Main navigation header
│   │   └── header.css
│   ├── pages/
│   │   ├── home/
│   │   │   ├── HomePage.jsx
│   │   │   ├── HomePage.css
│   │   │   └── Product.jsx
│   │   ├── checkout/
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── CheckoutPage.css
│   │   │   ├── OrderSummary.jsx
│   │   │   ├── PaymentSummary.jsx
│   │   │   └── checkout-header.css
│   │   ├── orders/
│   │   │   ├── OrdersPage.jsx
│   │   │   └── OrdersPage.css
│   │   ├── profile/
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── ProfilePage.css
│   │   │   └── components/
│   │   │       ├── MyProfile.jsx/css
│   │   │       ├── MyOrders.jsx/css
│   │   │       ├── OrderDetails.jsx/css
│   │   │       ├── SavedAddresses.jsx/css
│   │   │       ├── PaymentMethods.jsx/css
│   │   │       └── Wishlist.jsx/css
│   │   ├── TrackingPage.jsx
│   │   └── TrackingPage.css
│   ├── utils/
│   │   └── money.js        # Currency formatting (INR)
│   ├── App.jsx             # Main app with routes
│   ├── App.css
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── tests/
│   ├── utils/
│   │   └── money.test.js
│   └── pages/
│       └── home/
│           ├── HomePage.test.jsx
│           └── Product.test.jsx
├── package.json
├── vite.config.js
├── eslint.config.js
└── index.html
```

## 🎨 Design System

### Color Theme (Lavender/Purple)

```css
/* Primary Colors */
--primary: rgb(167, 139, 250);        /* Buttons, accents */
--primary-light: rgb(196, 165, 230);  /* Navbar, gradients */
--primary-hover: rgb(147, 119, 230);  /* Button hover states */

/* Status Colors */
--delivered: #2e7d32 (green)
--shipped: #1565c0 (blue)
--processing: #ef6c00 (orange)
--cancelled: #c62828 (red)
```

### Typography

- **Font**: System font stack
- **Headings**: 700 weight
- **Body**: 400-500 weight

### Components

- Rounded corners (8px-12px border-radius)
- Smooth transitions (0.2s ease)
- Box shadows on hover
- Gradient headers for sections

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd ecommerce_project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Start the backend server** (in a separate terminal)

   ```bash
   cd backend
   node server.js
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start development server (port 5173) |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview production build             |
| `npm run lint`    | Run ESLint                           |
| `npm test`        | Run tests with Vitest                |

## 💰 Currency

All prices are displayed in **Indian Rupees (₹)** with proper formatting.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Sunakshi Gawas

---

**MarketHub** - Your one-stop e-commerce destination! 🛍️
