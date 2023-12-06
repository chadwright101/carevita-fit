import { listAll, getDownloadURL, getMetadata } from "firebase/storage";

import { secondaryGalleryStorageRef } from "@/app/_firebase/firebase";

export async function GET() {
  const res = await listAll(secondaryGalleryStorageRef);

  const imageInfoPromises = res.items.map(async (itemRef) => {
    const metadata = await getMetadata(itemRef);
    const filename = itemRef.name;
    const url = await getDownloadURL(itemRef);
    return {
      url,
      filename,
      timestamp: metadata.customMetadata.timestamp || 0,
    };
  });
  const imageInfo = await Promise.all(imageInfoPromises);

  imageInfo.sort((a, b) => b.timestamp - a.timestamp);

  return Response.json(imageInfo);
}
