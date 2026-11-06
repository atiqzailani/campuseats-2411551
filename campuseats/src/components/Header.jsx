import { NavLink } from "react-router";
import { useCart } from "../hooks/useCart";

function Header() {
  const { count } = useCart();

  return (
    <header className="header">
      <NavLink to="/" className="logo logo-link" end>
        CampusEats
      </NavLink>
      <nav className="nav">
        <NavLink to="/" end>
          Vendors
        </NavLink>
        <NavLink to="/orders">My Orders</NavLink>
        <NavLink to="/cart">
          Cart {count > 0 && <span className="badge">{count}</span>}
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
