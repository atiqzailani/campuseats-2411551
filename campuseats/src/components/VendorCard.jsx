import { Link } from "react-router";

function VendorCard({ vendor }) {
  return (
    <Link to={`/vendor/${vendor.id}`} className="card vendor-card">
      <div className="thumb">{vendor.name?.[0] || "V"}</div>
      <div>
        <h3>{vendor.name}</h3>
        {vendor.cuisine && <span className="tag">{vendor.cuisine}</span>}
        <p className="muted">{vendor.location}</p>
      </div>
    </Link>
  );
}

export default VendorCard;
