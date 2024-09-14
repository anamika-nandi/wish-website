"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { WishCard } from "@/components/WishCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export default function PreviewCardPage() {
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const encodedCardData = searchParams.get("cardData");

    if (encodedCardData) {
      try {
        const decodedCardData = JSON.parse(decodeURIComponent(encodedCardData));
        setCardData(decodedCardData);
      } catch (err) {
        setError("Invalid card data");
      }
    } else {
      setError("No card data provided");
    }
  }, [searchParams]);

  console.log(cardData);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p>{error}</p>
          <Link href="/" passHref>
            <Button className="mt-4">Create Your Own Card</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Preview Card</h1>
      <div className="w-full max-w-md bg-white shadow-lg overflow-hidden mb-6">
        <WishCard cardData={cardData} />
      </div>
      <Link href="/" passHref>
        <Button>Create Your Own Card</Button>
      </Link>
    </div>
  );
}
