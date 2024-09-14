import React from "react";

interface TextElement {
  id: string;
  content: string;
  style: {
    color: string;
    fontSize: number;
    fontFamily: string;
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface WishCardProps {
  backgroundType: "image" | "video" | null;
  backgroundSource: string | null;
  textElements: TextElement[];
}

export const WishCard: React.FC<WishCardProps> = ({
  backgroundType,
  backgroundSource,
  textElements,
}) => {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      {backgroundType === "image" && backgroundSource && (
        <img
          src={backgroundSource}
          alt="Background"
          className="w-full h-full object-cover absolute"
        />
      )}
      {backgroundType === "video" && backgroundSource && (
        <video
          src={backgroundSource}
          className="w-full h-full object-cover absolute"
          autoPlay
          loop
          muted
        />
      )}
      {textElements.map((element) => (
        <div
          key={element.id}
          style={{
            position: "absolute",
            left: `${element.style.x}px`,
            top: `${element.style.y}px`,
            width: `${element.style.width}px`,
            height: `${element.style.height}px`,
            color: element.style.color,
            fontSize: `${element.style.fontSize}px`,
            fontFamily: element.style.fontFamily,
            overflow: "hidden",
            wordWrap: "break-word",
          }}
        >
          {element.content}
        </div>
      ))}
    </div>
  );
};
