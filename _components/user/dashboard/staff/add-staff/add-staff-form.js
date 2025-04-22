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
        setName("");
        setBio("");
        setImage(null);
        setImageUrl("");

        if (
          handleImageChangeRef.current &&
          handleImageChangeRef.current.resetFileInput
        ) {
          handleImageChangeRef.current.resetFileInput();
        }

        if (onStaffAdded) {
          onStaffAdded();
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-staff__add-staff">
      <h3>Add New Staff Member</h3>
      <form className="admin-staff__add-staff__form" onSubmit={handleSubmit}>
        <div className="admin-staff__add-staff__form__field-group">
          <label htmlFor="add-name">Name:</label>
          <input
            id="add-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="admin-staff__add-staff__form__field-group">
          <div className="admin-staff__add-staff__form__field-group__bio">
            <label htmlFor="add-bio">Bio:</label>
            <p>Staff member must have a bio to be displayed on the website.</p>
          </div>
          <textarea
            id="add-bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        <div className="admin-staff__add-staff__form__field-group">
          <label>Profile Image:</label>
          <ImageUploader
            initialImageUrl={imageUrl}
            onImageChange={handleImageChange}
            onImageDelete={handleImageDelete}
            required
          />
        </div>

        <div className="admin-staff__add-staff__form__buttons">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Submit"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddStaffForm;
