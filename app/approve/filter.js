import { useState } from "react";

export default function LocationFilter({
  locations,
  selectedLocations,
  setSelectedLocations,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleChange = (id) => {
    if (selectedLocations.includes(id)) {
      setSelectedLocations(
        selectedLocations.filter((locationId) => locationId !== id),
      );
    } else {
      setSelectedLocations([...selectedLocations, id]);
    }
  };

  return (
    <div
      className="relative z-20 w-64"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div className="rounded border bg-white p-2">
        {selectedLocations.length === 0
          ? "Select Locations"
          : selectedLocations
              .map(
                (id) => locations.find((location) => location.id === id).title,
              )
              .join(", ")}
      </div>
      {showDropdown && (
        <div className="absolute w-64 rounded-b border bg-white p-2 shadow-md">
          {locations.map((location) => (
            <div key={location.id}>
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedLocations.includes(location.id)}
                  onChange={() => handleChange(location.id)}
                />
                {location.title}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
