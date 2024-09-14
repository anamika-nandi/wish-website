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

interface CardData {
  backgroundType: "color" | "gradient";
  backgroundColor: string;
  gradientFrom: string;
  gradientTo: string;
  mediaType: "image" | "video" | null;
  mediaSource: string | null;
  mediaPath: string | null;
  mediaStyle: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  textElements: TextElement[];
}

interface WishCardProps {
  cardData: CardData;
}

export const WishCard: React.FC<WishCardProps> = ({ cardData }) => {
  const backgroundStyle =
    cardData.backgroundType === "color"
      ? { backgroundColor: cardData.backgroundColor }
      : {
          backgroundImage: `linear-gradient(to bottom, ${cardData.gradientFrom}, ${cardData.gradientTo})`,
        };

  return (
    <div
      className="relative w-full h-full"
      style={{
        ...backgroundStyle,
        width: "400px",
        height: "600px",
      }}
    >
      {cardData.mediaSource && (
        <div
          style={{
            position: "absolute",
            left: cardData.mediaStyle.x,
            top: cardData.mediaStyle.y,
            width: cardData.mediaStyle.width,
            height: cardData.mediaStyle.height,
          }}
        >
          {cardData.mediaType === "image" ? (
            <img
              src={cardData.mediaSource}
              alt="Card media"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          ) : (
            <video
              src={cardData.mediaSource}
              className="w-full h-full object-cover"
              controls
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
      {cardData.textElements.map((element) => (
        <div
          key={element.id}
          style={{
            position: "absolute",
            left: element.style.x,
            top: element.style.y,
            width: element.style.width,
            height: element.style.height,
            color: element.style.color,
            fontSize: `${element.style.fontSize}px`,
            fontFamily: element.style.fontFamily,
          }}
        >
          {element.content}
        </div>
      ))}
    </div>
  );
};
