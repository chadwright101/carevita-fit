import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/_firebase/firebase";

export const deleteImageFromStorage = async (imageUrl) => {
  try {
    const fullPath = imageUrl.split(
      "firebasestorage.googleapis.com/v0/b/carevita-fit.appspot.com/o/"
    )[1];
    const decodedPath = decodeURIComponent(fullPath.split("?")[0]);
    const imageRef = ref(storage, decodedPath);
    await deleteObject(imageRef);
    return true;
  } catch (error) {
    console.error("Error deleting image from storage:", error);
    return false;
  }
};
