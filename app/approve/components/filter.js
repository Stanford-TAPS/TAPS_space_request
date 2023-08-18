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
      <div className="truncate rounded border bg-white p-2 dark:border-black dark:bg-neutral-800">
        {selectedLocations.length === 0
          ? "Filter by Location"
          : selectedLocations
              .map(
                (id) => locations.find((location) => location.id === id).title,
              )
              .join(", ")}
      </div>
      {showDropdown && (
        <div className="absolute w-64 rounded-b border bg-white shadow-md dark:border-t-0 dark:border-black dark:bg-neutral-800">
          {locations.map((location) => (
            <div
              key={location.id}
              className="flex cursor-pointer items-center p-2 hover:outline hover:outline-1 hover:outline-white"
              onClick={() => handleChange(location.id)}
            >
              {selectedLocations.includes(location.id) && (
                <span className="mr-2 text-green-500">✔</span>
              )}
              <span>{location.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
