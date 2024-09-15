"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/admin";
import { WishCard } from "@/components/WishCard";
import confetti from "canvas-confetti";

interface CardData {
  backgroundType: "image" | "video" | null;
  backgroundSource: string | null;
  textElements: any[];
}

type Shape = "square" | "circle" | "star";

export default function WishCardPreview() {
  const router = useRouter();
  const { cardId } = useParams();
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const animationFrameId = useRef<number | null>(null);

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
            triggerConfetti();
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

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [cardId]);

  const triggerConfetti = () => {
    const duration = 15 * 1000; // 15 seconds
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const colors = [
      "#FF0000",
      "#FF7F00",
      "#FFFF00",
      "#00FF00",
      "#0000FF",
      "#4B0082",
      "#9400D3",
    ];
    const shapes: Shape[] = ["square", "circle", "star"];

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function runAnimation() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return cancelAnimationFrame(animationFrameId.current!);
      }

      const particleCount = 7; // One for each color

      // Side streams
      confetti(
        Object.assign({}, defaults, {
          particleCount: particleCount,
          origin: { x: randomInRange(0, 0.3), y: Math.random() - 0.2 },
          colors: colors,
          shapes: shapes,
        })
      );

      confetti(
        Object.assign({}, defaults, {
          particleCount: particleCount,
          origin: { x: randomInRange(0.7, 1), y: Math.random() - 0.2 },
          colors: colors,
          shapes: shapes,
        })
      );

      animationFrameId.current = requestAnimationFrame(runAnimation);
    }

    runAnimation();
  };

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-[600px]">
        <WishCard
          backgroundType={cardData.backgroundType}
          backgroundSource={cardData.backgroundSource}
          textElements={cardData.textElements}
        />
      </div>
    </div>
  );
}
