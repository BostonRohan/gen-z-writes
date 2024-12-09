"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function FileDropzone() {
  const [error, setError] = useState<string>();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 1) {
      setError("You may only submit on video at a time");
    }

    console.log(acceptedFiles);

    //TODO: validate file type of video
    //
    //TODO: limit file size
    //
    //TODO: upload to cloud storage
    //https://www.cloudflare.com/developer-platform/products/r2/
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="space-y-2">
      <div
        className="flex justify-center items-center w-full h-32 border-dashed hover:border-muted-foreground border-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all select-none cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the video here</p>
        ) : (
          <p>Drag &apos;n&apos; drop video here, or click to select video</p>
        )}
      </div>
      {!!error && <p className="text-red-300 text-sm">{error}</p>}
    </div>
  );
}

export default FileDropzone;
