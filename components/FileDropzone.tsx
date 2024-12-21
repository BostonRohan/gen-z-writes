"use client";

import { useCallback, useState, SetStateAction, Dispatch } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";

interface FileDropzoneProps {
  setFile: Dispatch<SetStateAction<File | null>>;
  setFileError: Dispatch<SetStateAction<string | undefined>>;
  fileError?: string;
}

function FileDropzone({
  setFile,
  setFileError: setError,
  fileError: error,
}: FileDropzoneProps) {
  const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; //2GB;

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
    },
    [setFile],
  );

  const onDropRejected = useCallback(
    (rejections: FileRejection[]) => {
      const errors = rejections
        .map((rejection) => rejection.errors)
        .flat()
        .map((error) => error.message)
        .join(", ");

      setError(errors);
    },
    [setError],
  );

  const onError = useCallback(
    (error: Error) => {
      //TODO: sentry
      console.error(error);

      setError("An error occurred while uploading the file. Please try again.");
    },
    [setError],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropRejected,
    onDropAccepted,
    onError,
    accept: {
      "video/quicktime": [".mov"],
      "video/mp4": [".mp4"],
      "video/webm": [".webm"],
    },
    maxSize: MAX_FILE_SIZE,
    maxFiles: 1,
  });

  return (
    <div className="space-y-2">
      <div
        className="flex justify-center items-center w-full h-32 border-dashed hover:border-muted-foreground border-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all select-none cursor-pointer"
        {...getRootProps()}
      >
        <Input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the video here</p>
        ) : (
          <div className="flex flex-col text-center">
            <p>Drag &apos;n&apos; drop video here, or click to select video</p>
            <p className="text-sm text-muted-foreground">
              2GB limit (mov, mp4, webm)
            </p>
          </div>
        )}
      </div>
      {!!error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}

export default FileDropzone;
