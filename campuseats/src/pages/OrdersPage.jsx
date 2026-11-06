import { useCart } from "../hooks/useCart";

export function OrdersPage() {
  const { orders } = useCart();

  if (!orders || orders.length === 0) {
    return (
      <div className="card">
        <h2>My Orders</h2>
        <p className="muted">No orders placed yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="section-title">My Orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <strong>Order #{order.id.slice(-6)}</strong>
              <span className="muted">
                Pickup: {order.pickupTime} ({order.mahallah})
              </span>
            </div>

            <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0" }}>
              {order.items?.map((line, idx) => {
                // Supports both nested line.item (Week 3) and flat structures
                const item = line.item || line;
                const qty = line.qty || line.quantity || 1;
                const price = Number(item.price) || 0;

                return (
                  <li key={item.id || idx}>
                    {item.name} &times; {qty} (RM {(price * qty).toFixed(2)})
                  </li>
                );
              })}
            </ul>

            <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
              <strong>Total: RM {Number(order.total).toFixed(2)}</strong>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersPage;
