import { listAll, getMetadata, getDownloadURL } from "firebase/storage";

import { mainGalleryStorageRef } from "@/app/_firebase/firebase";

export async function GET() {
  const storageResponse = await listAll(mainGalleryStorageRef);

  const imageInfoPromises = storageResponse.items.map(async (itemRef) => {
    const metadata = await getMetadata(itemRef);
    const url = await getDownloadURL(itemRef);
    return {
      url,
      timestamp: metadata.customMetadata.timestamp || 0,
    };
  });

  const newImageInfo = await Promise.all(imageInfoPromises);

  newImageInfo.sort((a, b) => b.timestamp - a.timestamp);

  return Response.json(newImageInfo);
}
