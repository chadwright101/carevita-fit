"use client";

import { useState, useEffect } from "react";
import ImageUploader from "../utils/image-uploader";
import { updateStaffMember } from "../utils/staff-service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProps } from "@/_lib/ToastProps";

const StaffEditForm = ({ staff, onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (staff) {
      setName(staff.name || "");
      setBio(staff.bio || "");
      setImageUrl(staff.image || "");
    }
  }, [staff]);

  const handleImageChange = (newImage) => {
    setImage(newImage);
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

    if (!image && !imageUrl) {
      toast.error("Please upload a profile image", toastProps);
      return;
    }

    const staffData = {
      name,
      bio,
      newImage: image,
      imageUrl,
    };

    const success = await updateStaffMember(staff.id, staffData, staff.image);
    if (success) {
      onSave();
    }
  };

  return (
    <form
      className="admin-staff__list__item__edit-form"
      onSubmit={handleSubmit}
    >
      <h3>{name}</h3>
      <div className="admin-staff__list__item__edit-form__field-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="admin-staff__list__item__edit-form__field-group">
        <div className="admin-staff__list__item__edit-form__field-group__bio">
          <label htmlFor="bio">Bio:</label>
          <p>Staff member must have a bio to be displayed on the website.</p>
        </div>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={8}
        />
      </div>

      <div className="admin-staff__list__item__edit-form__field-group">
        <label>Image:</label>
        <ImageUploader
          initialImageUrl={imageUrl}
          onImageChange={handleImageChange}
          onImageDelete={handleImageDelete}
        />
      </div>

      <div className="admin-staff__list__item__edit-form__buttons">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default StaffEditForm;
