import React, { useState, useEffect } from "react";

function ImageLoader({ src, alternativeSrc, alt, imageClass }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(src);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setIsLoading(false);
    };
    image.onerror = () => {
      setIsLoading(false);
      setImageUrl(alternativeSrc);
    };
  }, [src]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <img src={imageUrl} alt={alt} className={imageClass} />
      )}
    </>
  );
}

export default ImageLoader;
