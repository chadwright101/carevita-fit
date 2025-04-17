"use client";

import { useState, useEffect } from "react";
import ImageUploader from "../utils/image-uploader";
import { updateStaffMember } from "../utils/staff-service";

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

    // Validate form
    if (!name.trim()) {
      alert("Please enter a name");
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
    <form className="staff-edit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
        />
      </div>

      <div className="form-group">
        <label>Profile Image</label>
        <ImageUploader
          initialImageUrl={imageUrl}
          onImageChange={handleImageChange}
          onImageDelete={handleImageDelete}
        />
      </div>

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default StaffEditForm;
