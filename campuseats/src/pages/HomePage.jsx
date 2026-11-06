import VendorCard from "../components/VendorCard.jsx";
import { useVendors } from "../hooks/useVendors";
import { Loading, ErrorMessage } from "../components/Status.jsx";

function HomePage() {
  const { vendors, loading, error, reload } = useVendors();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <div>
      <h2 className="section-title">Campus Vendors</h2>
      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
