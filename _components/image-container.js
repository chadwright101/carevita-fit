import Image from "next/image";

import classNames from "classnames";
import { addCacheBustingTimestamp } from "@/_lib/cache-busting-url";

const ImageContainer = ({
  src,
  alt,
  width,
  height,
  smallest,
  phone,
  tablet,
  tabletLarge,
  desktop,
  desktopSmall,
  cssClasses,
  quality,
  eager,
  onClick,
  timestamp,
}) => {
  return (
    <Image
      alt={alt || "Carevita #fit"}
      src={timestamp ? addCacheBustingTimestamp(src, timestamp) : src}
      width={width}
      height={height}
      quality={quality || 50}
      loading={eager ? "eager" : "lazy"}
      className={`image-transition ${cssClasses}`}
      onClick={onClick}
      sizes={`(max-width: 425px) ${smallest}vw,(max-width: 650px) ${phone}vw, (max-width: 900px) ${tablet}vw, (max-width: 1100px) ${tabletLarge}vw, (max-width: 1400px) ${desktopSmall}vw, ${desktop}vw `}
    />
  );
};

export default ImageContainer;
