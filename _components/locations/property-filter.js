"use client";

import { useContext } from "react";
import { LocationsContext } from "@/_context/locations-context";
import classNames from "classnames";

const PropertyFilter = () => {
  const {
    availableCities,
    isLoading,
    showClearFilter,
    toggleCity,
    showAllCities,
    isCitySelected,
  } = useContext(LocationsContext);

  if (isLoading) {
    return <div className="property-filter">Loading filters...</div>;
  }

  if (availableCities.length === 0) {
    return null;
  }

  return (
    <div className="property-filter">
      <ul className="property-filter__list">
        {availableCities.map((city, index) => (
          <div key={city}>
            <li
              onClick={() => toggleCity(city)}
              className={classNames("property-filter__list-item", {
                underline: isCitySelected(city) && showClearFilter,
              })}
            >
              {index > 0 && <span>|</span>}
              {city}
            </li>
          </div>
        ))}
      </ul>
      {showClearFilter && (
        <button
          onClick={showAllCities}
          className="property-filter__clear-filter"
        >
          Clear filter
        </button>
      )}
    </div>
  );
};

export default PropertyFilter;
