import { useState, useEffect } from "react";

function ImageLoader({ src, alternativeSrc, alt, imageClass, userInitial }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(src);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setIsLoading(false);
      setImageUrl(src);
    };
    image.onerror = () => {
      setIsLoading(false);
      if (alternativeSrc != undefined) setImageUrl(alternativeSrc);
    };
  });

  return (
    <>
      {isLoading ? (
        <div></div>
      ) : imageUrl != undefined ? (
        <img src={imageUrl} alt={alt} className={imageClass} />
      ) : (
        <div className={imageClass}>{userInitial}</div>
      )}
    </>
  );
}

export default ImageLoader;
