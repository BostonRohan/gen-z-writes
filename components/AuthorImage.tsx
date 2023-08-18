"use client";

import { useState } from "react";
import { LoadImages } from "./VideoCard";
import Image from "next/image";

const AuthorImage = ({
  src,
  alt,
  loading,
}: {
  src: string;
  alt: string;
  loading: LoadImages;
}) => {
  const [loadedSuccessfully, setLoadedSuccessfully] = useState(true);
  return loadedSuccessfully ? (
    <Image
      src={src}
      height={30}
      width={30}
      className="rounded-full"
      style={{ width: "30px", height: "30px" }}
      alt={alt}
      onError={() => setLoadedSuccessfully(false)}
      loading={loading}
    />
  ) : (
    <Image
      src="/avatar_placeholder.png"
      height={30}
      width={30}
      className="rounded-full"
      style={{ width: "30px", height: "30px" }}
      alt={`${alt} Placeholder Image`}
    />
  );
};

export default AuthorImage;
