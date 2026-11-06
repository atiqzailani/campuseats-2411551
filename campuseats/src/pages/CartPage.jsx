import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart";

export function CartPage() {
  const { cart, total, changeQty, removeFromCart, placeOrder } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mahallah, setMahallah] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!name || !mahallah || !pickupTime) {
      alert("Please fill out all fields.");
      return;
    }

    placeOrder({ name, mahallah, pickupTime });
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="card">
        <h2>Your cart</h2>
        <p className="muted">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      {/* Left Column: Cart Items */}
      <div className="card">
        <h2>Your cart</h2>
        <ul className="cart-list">
          {cart.map((line) => {
            // Supports both line.item (Week 3 structure) and flat line structure
            const item = line.item || line;
            const qty = line.qty || line.quantity || 1;
            const price = Number(item.price) || 0;

            return (
              <li key={item.id} className="cart-line">
                <div>
                  <p className="cart-name">{item.name}</p>
                  <p className="muted">RM {price.toFixed(2)} each</p>
                </div>
                <div className="qty">
                  <button type="button" onClick={() => changeQty(item.id, -1)}>
                    -
                  </button>
                  <span>{qty}</span>
                  <button type="button" onClick={() => changeQty(item.id, 1)}>
                    +
                  </button>
                </div>
                <p className="line-total">RM {(price * qty).toFixed(2)}</p>
                <button
                  type="button"
                  className="link danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
        <div className="cart-total">Total: RM {Number(total).toFixed(2)}</div>
      </div>

      {/* Right Column: Checkout Form */}
      <div className="card">
        <h3>Checkout</h3>
        <form className="form" onSubmit={handleCheckout}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />

          <label htmlFor="mahallah">Mahallah</label>
          <select
            id="mahallah"
            value={mahallah}
            onChange={(e) => setMahallah(e.target.value)}
            required
          >
            <option value="">Select...</option>
            <option value="Bilal">Mahallah Bilal</option>
            <option value="Ali">Mahallah Ali</option>
            <option value="Faruq">Mahallah Faruq</option>
            <option value="Siddiq">Mahallah Siddiq</option>
            <option value="Halimah">Mahallah Halimah</option>
            <option value="Maryam">Mahallah Maryam</option>
            <option value="Salahuddin">Mahallah Salahuddin</option>
          </select>

          <label htmlFor="pickupTime">Pickup time</label>
          <input
            id="pickupTime"
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            required
          />

          <button type="submit" className="btn">
            Place order
          </button>
        </form>
      </div>
    </div>
  );
}

export default CartPage;
