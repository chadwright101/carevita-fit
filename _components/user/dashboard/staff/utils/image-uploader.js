"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const ImageUploader = ({
  initialImageUrl,
  onImageChange,
  onImageDelete,
  required,
}) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl || "");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setImageUrl(initialImageUrl || "");
  }, [initialImageUrl]);

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImage(null);
    setImageUrl("");
  };

  useEffect(() => {
    if (onImageChange && typeof onImageChange === "function") {
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

  return (
    <div className="image-uploader">
      {imageUrl && (
        <div className="image-preview">
          <Image
            src={imageUrl}
            alt="Staff Image Preview"
            width={150}
            height={150}
          />
        </div>
      )}
      <div className="image-controls">
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          ref={fileInputRef}
          required={required}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
