import { useParams, useSearchParams } from "react-router";
import { useVendors } from "../hooks/useVendors";
import MenuList from "../components/MenuList.jsx";

export function VendorPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { vendors, loading, error } = useVendors();

  // Read ?cat=... from the URL (defaults to "All" if none is selected)
  const selectedCat = searchParams.get("cat") || "All";

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

  // Extract unique categories from this vendor's menu items
  const categories = [
    "All",
    ...new Set(vendor.menu?.map((item) => item.category).filter(Boolean)),
  ];

  // Filter items based on the active category from the query parameter
  const displayedItems =
    selectedCat === "All"
      ? vendor.menu
      : vendor.menu?.filter((item) => item.category === selectedCat);

  // Sync category selection with the URL query parameter (?cat=...)
  function handleSelectCategory(cat) {
    if (cat === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ cat });
    }
  }

  return (
    <div>
      <section>
        <h2 className="section-title">{vendor.name}</h2>
        <p className="muted">{vendor.location}</p>

        {/* Category filter pills */}
        {categories.length > 1 && (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              margin: "1rem 0",
              flexWrap: "wrap",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleSelectCategory(cat)}
                className={`tag ${selectedCat === cat ? "active" : ""}`}
                style={{
                  cursor: "pointer",
                  border: "none",
                  padding: "0.35rem 0.85rem",
                  background:
                    selectedCat === cat ? "var(--green)" : "var(--green-light)",
                  color: selectedCat === cat ? "#fff" : "var(--green)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <MenuList items={displayedItems} />
      </section>
    </div>
  );
}

export default VendorPage;
