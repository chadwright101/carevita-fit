"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const ImageUploader = ({ initialImageUrl, onImageChange, onImageDelete }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl || "");
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImageUrl(initialImageUrl || "");
  }, [initialImageUrl]);

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
            alt="Location Image Preview"
            width={100}
            height={100}
          />
        </div>
      )}
      <div className="image-controls">
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleImageDelete}>Delete Image</button>
      </div>
    </div>
  );
};

export default ImageUploader;
