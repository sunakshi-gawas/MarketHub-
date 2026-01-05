import { useState, useEffect } from "react";
import axios from "axios";
import { formatMoney } from "../../../utils/money";
import "./Wishlist.css";

export function Wishlist({ cart, loadCart }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Fetch products and use first 6 as wishlist items (mock)
        const response = await axios.get("/api/products");
        const mockWishlist = response.data.slice(0, 6).map((product) => ({
          ...product,
          addedDate: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
        }));
        setWishlistItems(mockWishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleAddToCart = async (product) => {
    setAddingToCart(product.id);
    try {
      await axios.post("/api/cart-items", {
        productId: product.id,
        quantity: 1,
      });
      await loadCart();
      // Remove from wishlist after adding to cart
      handleRemoveFromWishlist(product.id);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(null);
    }
  };

  const handleMoveAllToCart = async () => {
    for (const item of wishlistItems) {
      await handleAddToCart(item);
    }
  };

  return (
    <div className="wishlist">
      <div className="section-header">
        <div className="header-left">
          <h2>My Wishlist</h2>
          <span className="item-count">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"}
          </span>
        </div>
        {wishlistItems.length > 0 && (
          <button
            className="move-all-btn button-primary"
            onClick={handleMoveAllToCart}
          >
            🛒 Add All to Cart
          </button>
        )}
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your wishlist...</p>
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">❤️</span>
          <h3>Your wishlist is empty</h3>
          <p>Save items you love to your wishlist and review them anytime.</p>
          <a href="/" className="button-primary shop-now-btn">
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-card">
              <button
                className="remove-btn"
                onClick={() => handleRemoveFromWishlist(item.id)}
                title="Remove from wishlist"
              >
                ×
              </button>
              <div className="product-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="product-info">
                <h4 className="product-name">{item.name}</h4>
                <div className="product-rating">
                  <span className="stars">
                    {"★".repeat(Math.floor(item.rating.stars))}
                    {"☆".repeat(5 - Math.floor(item.rating.stars))}
                  </span>
                  <span className="rating-count">({item.rating.count})</span>
                </div>
                <div className="product-price">
                  {formatMoney(item.priceCents)}
                </div>
              </div>
              <div className="product-actions">
                <button
                  className={`add-to-cart-btn button-primary ${
                    addingToCart === item.id ? "loading" : ""
                  }`}
                  onClick={() => handleAddToCart(item)}
                  disabled={addingToCart === item.id}
                >
                  {addingToCart === item.id ? (
                    <span className="btn-spinner"></span>
                  ) : (
                    <>🛒 Add to Cart</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
