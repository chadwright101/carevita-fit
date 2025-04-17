"use client";

import Image from "next/image";
import { deleteLocation, moveLocationToTop } from "./location-service";

const LocationItem = ({ location, index, totalLocations, onEdit }) => {
  const handleDelete = async () => {
    await deleteLocation(location.id, location.image);
  };

  const handleMoveToTop = async () => {
    await moveLocationToTop(location.id);
  };

  return (
    <div className="location-item">
      <h3>{location.heading}</h3>

      <div className="location-details">
        <p>Description: {location.description}</p>
        <p>City: {location.city || location.location}</p>
        <p>Suburb: {location.suburb}</p>

        {location.image && (
          <div className="location-image">
            <Image
              src={location.image}
              alt={location.heading}
              width={100}
              height={100}
            />
          </div>
        )}

        {(location.googleMapsLink || location.google_maps_link) && (
          <p>
            <a
              href={location.googleMapsLink || location.google_maps_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps
            </a>
          </p>
        )}
      </div>

      <div className="location-actions">
        <button onClick={() => onEdit(location.id)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        {index !== 0 && index < totalLocations && (
          <button onClick={handleMoveToTop} aria-label="Move Location to Top">
            Reorder
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationItem;
