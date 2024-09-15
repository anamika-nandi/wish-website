"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/admin";
import { WishCard } from "@/components/WishCard";

interface CardData {
  backgroundType: "image" | "video" | null;
  backgroundSource: string | null;
  textElements: any[];
}

export default function WishCardPreview() {
  const router = useRouter();
  const { cardId } = useParams();
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCardData() {
      if (cardId) {
        try {
          const { data, error } = await supabase
            .from("wish_cards")
            .select("card_data")
            .eq("id", cardId)
            .single();

          if (error) {
            throw error;
          }

          if (data) {
            setCardData(data.card_data as CardData);
          } else {
            setError("Card not found");
          }
        } catch (err) {
          setError("Failed to fetch card data");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchCardData();
  }, [cardId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error: {error}
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="flex items-center justify-center h-screen">
        No card data found
      </div>
    );
  }

  console.log(cardData);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-[600px]">
        {" "}
        {/* Match the editor's 600px height */}
        <WishCard
          backgroundType={cardData.backgroundType}
          backgroundSource={cardData.backgroundSource}
          textElements={cardData.textElements}
        />
      </div>
    </div>
  );
}
