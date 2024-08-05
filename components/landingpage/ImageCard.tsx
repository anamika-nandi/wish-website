import Image, { StaticImageData } from "next/image";
import React from "react";

interface ImageCardProps {
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  description,
  imageSrc,
  className,
}) => {
  return (
    <div className={`flex flex-col px-1 ${className}`}>
      <div className="flex flex-col grow justify-center text-white max-md:mt-7 max-md:max-w-full">
        <div className="relative flex flex-col items-start px-11 py-16 w-full rounded-xl min-h-[294px] max-md:px-5 max-md:max-w-full overflow-hidden">
          {typeof imageSrc === "string" ? (
            <img
              loading="lazy"
              src={imageSrc}
              alt={title}
              className="object-cover absolute inset-0 w-full h-full"
            />
          ) : (
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="absolute inset-0 object-cover"
            />
          )}
          <h3 className="relative mt-14 text-3xl font-medium uppercase max-md:mt-10 max-md:max-w-full">
            {title.charAt(0)}
            <span className="lowercase">{title.slice(1)}</span>
          </h3>
          <p className="relative mt-4 text-lg leading-6 max-md:max-w-full">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
