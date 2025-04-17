"use client";

import { useState, useRef } from "react";
import ImageUploader from "../utils/image-uploader";
import { addStaffMember } from "../utils/staff-service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProps } from "@/_lib/ToastProps";

const AddStaffForm = ({ onStaffAdded }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleImageChangeRef = useRef(null);

  const handleImageChange = (newImage) => {
    setImage(newImage);
    handleImageChangeRef.current = handleImageChange;
  };

  const handleImageDelete = () => {
    setImage(null);
    setImageUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a name", toastProps);
      return;
    }

    if (!image) {
      toast.error("Please upload a profile image", toastProps);
      return;
    }

    setIsSubmitting(true);

    try {
      const staffData = {
        name,
        bio,
        image,
      };

      const success = await addStaffMember(staffData);

      if (success) {
        // Reset form
        setName("");
        setBio("");
        setImage(null);
        setImageUrl("");

        // Reset file input using the exposed method
        if (
          handleImageChangeRef.current &&
          handleImageChangeRef.current.resetFileInput
        ) {
          handleImageChangeRef.current.resetFileInput();
        }

        // Notify parent component
        if (onStaffAdded) {
          onStaffAdded();
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-staff-form-container">
      <h3>Add New Staff Member</h3>
      <form className="add-staff-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="add-name">Name</label>
          <input
            id="add-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="add-bio">Bio</label>
          <textarea
            id="add-bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>
            Profile Image <span className="required">*</span>
          </label>
          <ImageUploader
            initialImageUrl={imageUrl}
            onImageChange={handleImageChange}
            onImageDelete={handleImageDelete}
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="add-staff-btn"
          >
            {isSubmitting ? "Adding..." : "Add Staff Member"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddStaffForm;
