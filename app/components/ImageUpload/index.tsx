"use client";

import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var coudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
}) => {
  const handleUpload = React.useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="xe3r8vtz"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
          relative 
          cursor-pointer 
          hover:opacity-70
          transition
          border-dashed 
          border-2
          flex
          flex-col
          justify-center
          items-center
          gap-4
          text-neutral-600
          p-20
          border-neutral-300"
          >
            <TbPhotoPlus size={50} />
            <div
              className="
              font-semibold 
              text-lg
              "
            >
              Click to upload
            </div>
            {value && (
              <div
                className="absolute
                inset-0 w-full h-full"
              >
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
