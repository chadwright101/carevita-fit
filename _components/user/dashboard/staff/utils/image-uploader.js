"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const ImageUploader = ({ initialImageUrl, onImageChange, onImageDelete }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl || "");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setImageUrl(initialImageUrl || "");
  }, [initialImageUrl]);

  // Method to reset the file input
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImage(null);
    setImageUrl("");
  };

  // Expose the reset method to parent via props if provided
  useEffect(() => {
    if (onImageChange && typeof onImageChange === "function") {
      // Attach the reset method to the onImageChange function
      onImageChange.resetFileInput = resetFileInput;
    }
  }, [onImageChange]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);

      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };
      reader.readAsDataURL(selectedImage);

      onImageChange(selectedImage);
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    setImageUrl("");
    onImageDelete();
  };

  return (
    <div className="image-uploader">
      {imageUrl && (
        <div className="image-preview">
          <Image
            src={imageUrl}
            alt="Staff Image Preview"
            width={150}
            height={150}
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        </div>
      )}
      <div className="image-controls">
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          ref={fileInputRef}
        />
        <button
          onClick={handleImageDelete}
          type="button"
          className="delete-image-btn"
        >
          Delete Image
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
