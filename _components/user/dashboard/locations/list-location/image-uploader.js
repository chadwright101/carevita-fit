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

  return (
    <div className="image-uploader">
      {imageUrl && (
        <div className="image-uploader__image-preview">
          <Image
            src={imageUrl}
            alt="Location Image Preview"
            width={200}
            height={200}
          />
        </div>
      )}
      <input type="file" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUploader;
