import { useParams } from "react-router";
import { useVendors } from "../hooks/useVendors";
import MenuList from "../components/MenuList.jsx";

export function VendorPage() {
  const { id } = useParams();
  const { vendors, loading, error } = useVendors();

  if (loading) return <p className="muted">Loading vendor...</p>;

  if (error) {
    return (
      <div className="card error">
        <p className="field-error">Error: {error}</p>
      </div>
    );
  }

  const vendor = vendors.find((v) => String(v.id) === String(id));

  if (!vendor) {
    return (
      <div className="card">
        <h2>Vendor not found</h2>
        <p className="muted">The vendor you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      <section>
        <h2 className="section-title">{vendor.name}</h2>
        <p className="muted">{vendor.location}</p>
        <MenuList items={vendor.menu} />
      </section>
    </div>
  );
}

export default VendorPage;
