import { useState, useRef, useEffect } from "react";

export default function SearchableDropdown({ label, options, onSelect }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(""); // store selected value
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative mb-1" ref={containerRef}>
      <label className="block font-medium mb-1">{label}</label>

      {/* Selected box / input */}
      <div
        className="w-full border rounded p-2 bg-white cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {selected || `Select ${label}`}
      </div>

      {open && (
        <div className="absolute w-full mt-1 bg-white border rounded shadow-lg z-[1000] max-h-60 overflow-auto">
          {/* Search input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${label}...`}
            className="w-full p-2 border-b outline-none"
          />

          {/* Options */}
          {filtered.length === 0 ? (
            <div className="p-2 text-gray-500 text-sm">No results</div>
          ) : (
            filtered.map((o) => (
              <div
                key={o}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSelected(o);
                  setQuery("");
                  setOpen(false);
                  onSelect(o);
                }}
              >
                {o}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
