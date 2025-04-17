"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { deleteLocation, moveLocationToTop } from "./location-service";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/_firebase/firebase";

const LocationItem = ({ location, index, totalLocations, onEdit }) => {
  const [staffName, setStaffName] = useState("");

  useEffect(() => {
    const fetchStaffMember = async () => {
      if (location.staffMember) {
        try {
          const staffDocRef = doc(db, "staff", location.staffMember);
          const staffDoc = await getDoc(staffDocRef);

          if (staffDoc.exists()) {
            setStaffName(staffDoc.data().name);
          }
        } catch (error) {
          console.error("Error fetching staff member:", error);
        }
      }
    };

    fetchStaffMember();
  }, [location.staffMember]);
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
        {staffName && <p>Staff Member: {staffName}</p>}

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
