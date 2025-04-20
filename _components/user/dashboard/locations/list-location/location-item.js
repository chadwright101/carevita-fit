"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { deleteLocation, moveLocationToTop } from "./location-service";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/_firebase/firebase";
import ImageContainer from "@/_components/image-container";

const LocationItem = ({ location, index, totalLocations, onEdit }) => {
  const [staffName, setStaffName] = useState("");
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

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
    <>
      <h3 className="admin-locations__cities__list__item__heading">
        {location.heading}
      </h3>
      <div className="admin-locations__cities__list__item__image-container">
        <Image
          src={location.image}
          alt={location.heading}
          width={650}
          height={650}
          className="admin-locations__cities__list__item__image-container__image"
        />
        <button
          className="admin-locations__cities__list__item__image-container__edit"
          type="button"
          onClick={() => onEdit(location.id)}
        >
          <Image
            src="/icons/edit.svg"
            alt="Edit location"
            width={40}
            height={40}
          />
        </button>
        {index !== 0 && index < totalLocations && (
          <button
            className="admin-locations__cities__list__item__image-container__arrow"
            type="button"
            onClick={handleMoveToTop}
            aria-label="Move Location Up"
          >
            <Image
              src="/icons/up-arrow.svg"
              alt="Move Location to start"
              width={40}
              height={40}
            />
          </button>
        )}
        <button
          className="admin-locations__cities__list__item__image-container__delete"
          type="button"
          onClick={handleDelete}
          aria-label="Delete Location"
        >
          <Image
            src="/icons/close-icon2.svg"
            alt="Delete Location"
            width={40}
            height={40}
          />
        </button>
      </div>
      <div className="admin-locations__cities__list__item__details">
        <p>
          {descriptionExpanded || location.description.length <= 200
            ? location.description
            : `${location.description.substring(0, 180)}...`}
          {location.description.length > 180 && (
            <button
              onClick={() => setDescriptionExpanded(!descriptionExpanded)}
              className="link italic cursor-pointer"
            >
              {descriptionExpanded ? "...See less" : "...See more"}
            </button>
          )}
        </p>
        <p>
          <span className="font-medium">City:</span> {location.city}
        </p>
        <p>
          <span className="font-medium">Suburb:</span> {location.suburb}
        </p>
        {staffName && (
          <p>
            <span className="font-medium">Staff Member:</span> {staffName}
          </p>
        )}
        {location.googleMapsLink && (
          <p>
            <a
              href={location.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link italic"
            >
              Google Maps link
            </a>
          </p>
        )}
      </div>
    </>
  );
};

export default LocationItem;
