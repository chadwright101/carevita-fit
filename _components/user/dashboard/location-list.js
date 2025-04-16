"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  db,
  locationsCollectionRef,
  locationsStorageRef,
} from "@/_firebase/firebase";
import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProps } from "@/_lib/ToastProps";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLocationId, setEditingLocationId] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedHeading, setEditedHeading] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedSuburb, setEditedSuburb] = useState("");
  const [editedImage, setEditedImage] = useState(null);
  const [editedImageUrl, setEditedImageUrl] = useState("");
  const [editedStaffImage, setEditedStaffImage] = useState(null);
  const [editedStaffImageUrl, setEditedStaffImageUrl] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(locationsCollectionRef, (snapshot) => {
      const locationsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Sort locations by timestamp (newest first)
      locationsData.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setLocations(locationsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (locationId, image, staffImage) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this location?"
    );

    if (!confirmDelete) return;

    try {
      // Delete the location document first
      await deleteDoc(doc(db, "locations", locationId));

      // Then try to delete the images if they exist
      if (image) {
        try {
          const imagePath = decodeURIComponent(
            image.split("?")[0].split("/").pop()
          );
          const imageRef = ref(locationsStorageRef, imagePath);
          await deleteObject(imageRef);
        } catch (error) {
          console.error("Error deleting image:", error);
          // Continue even if image deletion fails
        }
      }

      if (staffImage) {
        try {
          const staffImagePath = decodeURIComponent(
            staffImage.split("?")[0].split("/").pop()
          );
          const staffImageRef = ref(locationsStorageRef, staffImagePath);
          await deleteObject(staffImageRef);
        } catch (error) {
          console.error("Error deleting staff image:", error);
          // Continue even if staff image deletion fails
        }
      }

      toast.success("Location deleted successfully!", toastProps);
    } catch (error) {
      console.error("Error deleting location:", error);
      toast.error("Failed to delete location. Please try again.", toastProps);
    }
  };

  const handleEdit = (locationId) => {
    const locationToEdit = locations.find(
      (location) => location.id === locationId
    );
    if (locationToEdit) {
      setEditedDescription(locationToEdit.description);
      setEditedHeading(locationToEdit.heading);
      setEditedLocation(locationToEdit.location);
      setEditedSuburb(locationToEdit.suburb);
      setEditedImageUrl(locationToEdit.image || "");
      setEditedStaffImageUrl(locationToEdit.staff_image || "");
    }
    setEditingLocationId(locationId);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditedImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditedImageUrl(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleStaffImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditedStaffImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditedStaffImageUrl(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageDelete = () => {
    setEditedImage(null);
    setEditedImageUrl("");
  };

  const handleStaffImageDelete = () => {
    setEditedStaffImage(null);
    setEditedStaffImageUrl("");
  };

  const handleSave = async (locationId) => {
    try {
      await updateDoc(doc(db, "locations", locationId), {
        description: editedDescription,
        heading: editedHeading,
        location: editedLocation,
        suburb: editedSuburb,
      });

      // Image Upload
      if (editedImage) {
        // Delete old image if it exists
        const location = locations.find((loc) => loc.id === locationId);
        if (location?.image) {
          try {
            const oldImagePath = decodeURIComponent(
              location.image.split("?")[0].split("/").pop()
            );
            const oldImageRef = ref(locationsStorageRef, oldImagePath);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.error("Error deleting old image:", error);
            // Continue with upload even if delete fails
          }
        }
        const imageRef = ref(locationsStorageRef, `images/${editedImage.name}`);
        await uploadBytes(imageRef, editedImage);
        const imageUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "locations", locationId), {
          image: imageUrl,
        });
      } else if (editedImageUrl === "") {
        // Delete existing image if no new image is selected
        const location = locations.find((loc) => loc.id === locationId);
        if (location?.image) {
          try {
            const oldImagePath = decodeURIComponent(
              location.image.split("?")[0].split("/").pop()
            );
            const oldImageRef = ref(locationsStorageRef, oldImagePath);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.error("Error deleting image:", error);
            // Continue with update even if delete fails
          }
          await updateDoc(doc(db, "locations", locationId), {
            image: "",
          });
        }
      }

      // Staff Image Upload
      if (editedStaffImage) {
        // Delete old staff image if it exists
        const location = locations.find((loc) => loc.id === locationId);
        if (location?.staff_image) {
          try {
            const oldStaffImagePath = decodeURIComponent(
              location.staff_image.split("?")[0].split("/").pop()
            );
            const oldStaffImageRef = ref(
              locationsStorageRef,
              oldStaffImagePath
            );
            await deleteObject(oldStaffImageRef);
          } catch (error) {
            console.error("Error deleting old staff image:", error);
            // Continue with upload even if delete fails
          }
        }
        const staffImageRef = ref(
          locationsStorageRef,
          `staff_images/${editedStaffImage.name}`
        );
        await uploadBytes(staffImageRef, editedStaffImage);
        const staffImageUrl = await getDownloadURL(staffImageRef);
        await updateDoc(doc(db, "locations", locationId), {
          staff_image: staffImageUrl,
        });
      } else if (editedStaffImageUrl === "") {
        // Delete existing staff image if no new image is selected
        const location = locations.find((loc) => loc.id === locationId);
        if (location?.staff_image) {
          try {
            const oldStaffImagePath = decodeURIComponent(
              location.staff_image.split("?")[0].split("/").pop()
            );
            const oldStaffImageRef = ref(
              locationsStorageRef,
              oldStaffImagePath
            );
            await deleteObject(oldStaffImageRef);
          } catch (error) {
            console.error("Error deleting staff image:", error);
            // Continue with update even if delete fails
          }
          await updateDoc(doc(db, "locations", locationId), {
            staff_image: "",
          });
        }
      }

      toast.success("Location updated successfully!", toastProps);
      setEditingLocationId(null);
      setEditedDescription("");
      setEditedHeading("");
      setEditedLocation("");
      setEditedSuburb("");
      setEditedImage(null);
      setEditedImageUrl("");
      setEditedStaffImage(null);
      setEditedStaffImageUrl("");
    } catch (error) {
      console.error("Error updating location:", error);
      toast.error("Failed to update location. Please try again.", toastProps);
    }
  };

  const handleCancel = () => {
    setEditingLocationId(null);
    setEditedDescription("");
    setEditedHeading("");
    setEditedLocation("");
    setEditedSuburb("");
    setEditedImage(null);
    setEditedImageUrl("");
    setEditedStaffImage(null);
    setEditedStaffImageUrl("");
  };

  const moveLocationToTop = async (locationId) => {
    try {
      await updateDoc(doc(db, "locations", locationId), {
        timestamp: new Date().getTime(),
      });
      toast.success("Location moved to the top!", toastProps);
    } catch (error) {
      console.error("Error updating location order:", error);
      toast.error("Failed to reorder location. Please try again.", toastProps);
    }
  };

  return (
    <section>
      <h2>Locations</h2>
      {loading ? (
        <p>Loading locations...</p>
      ) : locations.length === 0 ? (
        <p>No locations added yet.</p>
      ) : (
        <ul>
          {locations.map((location, index) => (
            <li key={location.id}>
              {editingLocationId === location.id ? (
                <>
                  <input
                    type="text"
                    value={editedHeading}
                    onChange={(e) => setEditedHeading(e.target.value)}
                  />
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editedLocation}
                    onChange={(e) => setEditedLocation(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editedSuburb}
                    onChange={(e) => setEditedSuburb(e.target.value)}
                  />
                  {editedImageUrl && (
                    <Image
                      src={editedImageUrl}
                      alt="Location Image Preview"
                      width={100}
                      height={100}
                    />
                  )}
                  <input type="file" onChange={handleImageChange} />
                  <button onClick={handleImageDelete}>Delete Image</button>
                  {editedStaffImageUrl && (
                    <Image
                      src={editedStaffImageUrl}
                      alt="Staff Image Preview"
                      width={100}
                      height={100}
                    />
                  )}
                  <input type="file" onChange={handleStaffImageChange} />
                  <button onClick={handleStaffImageDelete}>
                    Delete Staff Image
                  </button>
                  <button onClick={() => handleSave(location.id)}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{location.heading}</h3>
                  <p>Description: {location.description}</p>
                  <p>Location: {location.location}</p>
                  <p>Suburb: {location.suburb}</p>
                  {location.image && (
                    <Image
                      src={location.image}
                      alt={location.heading}
                      width={100}
                      height={100}
                    />
                  )}
                  {location.staff_image && (
                    <Image
                      src={location.staff_image}
                      alt={`${location.heading} - Staff`}
                      width={100}
                      height={100}
                    />
                  )}
                  <br />
                  <button onClick={() => handleEdit(location.id)}>Edit</button>
                  <br />
                  <button
                    onClick={() =>
                      handleDelete(
                        location.id,
                        location.image,
                        location.staff_image
                      )
                    }
                  >
                    Delete
                  </button>
                  <br />
                  {index !== 0 && (
                    <button
                      className=""
                      onClick={() => moveLocationToTop(location.id)}
                      aria-label="Move Location to Top"
                    >
                      reorder
                    </button>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <ToastContainer />
    </section>
  );
};

export default LocationList;
