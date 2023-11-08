"use client";

import Image from "next/image";
import { useState } from "react";

import classNames from "classnames";

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
}) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      alt={alt || "Carevita #fit"}
      src={src}
      width={width}
      height={height}
      quality={isLoading ? 5 : quality || 50}
      loading={eager ? "eager" : "lazy"}
      className={classNames(`image-transition ${cssClasses}`, {
        blur: isLoading,
        "no-blur": !isLoading,
      })}
      onClick={onClick}
      onLoadStart={() => setLoading(true)}
      onLoad={() => setLoading(false)}
      sizes={`(max-width: 425px) ${
        isLoading ? smallest / 10 : smallest
      }vw,(max-width: 650px) ${
        isLoading ? phone / 10 : phone
      }vw, (max-width: 900px) ${
        isLoading ? tablet / 10 : tablet
      }vw, (max-width: 1100px) ${
        isLoading ? tabletLarge / 10 : tabletLarge
      }vw, (max-width: 1400px) ${
        isLoading ? desktopSmall / 10 : desktopSmall
      }vw, ${isLoading ? desktop / 10 : desktop}vw `}
    />
  );
};

export default ImageContainer;
