"use client";

import { useContext } from "react";
import { LocationsContext } from "@/_context/locations-context";
import classNames from "classnames";
import utils from "@/_styles/partials/utils/utils.module.scss";

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
    return (
      <div className="property-filter--loading">
        <div className={utils.spinner}></div>
      </div>
    );
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
