"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "./_ui/color-picker-component";
import { FontSelector } from "./_ui/font-selector-component";
import { Rnd } from "react-rnd";
import { supabase } from "@/utils/supabase/admin";

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
  backgroundType: "image" | "video" | null;
  backgroundSource: string | null;
  textElements: TextElement[];
}

export default function WishCardGenerator() {
  const [cardData, setCardData] = useState<CardData>({
    backgroundType: null,
    backgroundSource: null,
    textElements: [
      {
        id: "recipient",
        content: "Dear [Recipient]",
        style: {
          color: "#000000",
          fontSize: 24,
          fontFamily: "Arial",
          x: 20,
          y: 20,
          width: 200,
          height: 50,
        },
      },
      {
        id: "message",
        content: "Your wish message here...",
        style: {
          color: "#000000",
          fontSize: 18,
          fontFamily: "Arial",
          x: 20,
          y: 80,
          width: 300,
          height: 100,
        },
      },
      {
        id: "sender",
        content: "From: [Your Name]",
        style: {
          color: "#000000",
          fontSize: 16,
          fontFamily: "Arial",
          x: 20,
          y: 200,
          width: 150,
          height: 50,
        },
      },
    ],
  });
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [shareableUrl, setShareableUrl] = useState("");
  const [cardId, setCardId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileType = files[0].type.split("/")[0];
        setCardData((prev) => ({
          ...prev,
          backgroundType: fileType as "image" | "video",
          backgroundSource: reader.result as string,
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleTextChange = (id: string, content: string) => {
    setCardData((prev) => ({
      ...prev,
      textElements: prev.textElements.map((el) =>
        el.id === id ? { ...el, content } : el
      ),
    }));
  };

  const handleStyleChange = (id: string, property: string, value: any) => {
    setCardData((prev) => ({
      ...prev,
      textElements: prev.textElements.map((el) =>
        el.id === id ? { ...el, style: { ...el.style, [property]: value } } : el
      ),
    }));
  };

  const handleDragStop = (id: string, d: { x: number; y: number }) => {
    handleStyleChange(id, "x", d.x);
    handleStyleChange(id, "y", d.y);
  };

  const handleResizeStop = (
    id: string,
    ref: HTMLElement,
    position: { x: number; y: number },
    size: { width: number; height: number }
  ) => {
    handleStyleChange(id, "width", size.width);
    handleStyleChange(id, "height", size.height);
    handleStyleChange(id, "x", position.x);
    handleStyleChange(id, "y", position.y);
  };

  const saveCardToSupabase = async () => {
    const { data, error } = await supabase
      .from("wish_cards")
      .insert({
        card_data: cardData,
      })
      .select();

    if (error) {
      console.error("Error saving card:", error);
    } else if (data) {
      setCardId(data[0].id);
      generateShareableUrl(data[0].id);
    }
  };

  const generateShareableUrl = (id: string) => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/preview/${id}`;
    setShareableUrl(url);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-1/2 p-6 bg-white shadow-lg overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-primary">
          Wish Card Generator
        </h2>
        <div className="space-y-6">
          {cardData.textElements.map((element) => (
            <div key={element.id} className="space-y-4">
              <Label htmlFor={element.id}>
                {element.id.charAt(0).toUpperCase() + element.id.slice(1)}
              </Label>
              <Textarea
                id={element.id}
                value={element.content}
                onChange={(e) => handleTextChange(element.id, e.target.value)}
                rows={3}
              />
              {selectedElement === element.id && (
                <>
                  <div>
                    <Label>Text Color</Label>
                    <ColorPicker
                      color={element.style.color}
                      onChange={(color: string) =>
                        handleStyleChange(element.id, "color", color)
                      }
                    />
                  </div>
                  <div>
                    <Label>Font Size</Label>
                    <Slider
                      value={[element.style.fontSize]}
                      onValueChange={(value: number[]) =>
                        handleStyleChange(element.id, "fontSize", value[0])
                      }
                      min={12}
                      max={48}
                      step={1}
                    />
                  </div>
                  <div>
                    <Label>Font Family</Label>
                    <FontSelector
                      value={element.style.fontFamily}
                      onChange={(font: string) =>
                        handleStyleChange(element.id, "fontFamily", font)
                      }
                    />
                  </div>
                </>
              )}
            </div>
          ))}
          <div>
            <Label htmlFor="backgroundUpload">
              Upload Background Image or Video
            </Label>
            <Input
              id="backgroundUpload"
              type="file"
              accept="image/*,video/*"
              onChange={handleBackgroundUpload}
            />
          </div>
        </div>
        <div className="mt-6">
          <Button onClick={saveCardToSupabase}>
            Save and Generate Shareable URL
          </Button>
          {shareableUrl && (
            <div className="mt-4">
              <Label>Shareable URL:</Label>
              <Input value={shareableUrl} readOnly />
            </div>
          )}
        </div>
      </div>
      <div className="w-full md:w-1/2 p-6 bg-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-primary">Preview</h2>
        <div className="relative w-full h-[600px] bg-white border border-gray-300 overflow-hidden">
          {cardData.backgroundType === "image" && cardData.backgroundSource && (
            <img
              src={cardData.backgroundSource}
              alt="Background"
              className="w-full h-full object-cover absolute"
            />
          )}
          {cardData.backgroundType === "video" && cardData.backgroundSource && (
            <video
              ref={videoRef}
              src={cardData.backgroundSource}
              className="w-full h-full object-cover absolute"
              autoPlay
              loop
              muted
            />
          )}
          {cardData.textElements.map((element) => (
            <Rnd
              key={element.id}
              size={{
                width: element.style.width,
                height: element.style.height,
              }}
              position={{ x: element.style.x, y: element.style.y }}
              onDragStop={(e, d) => handleDragStop(element.id, d)}
              onResizeStop={(e, direction, ref, delta, position) =>
                handleResizeStop(element.id, ref, position, {
                  width: Number(ref.style.width.replace("px", "")),
                  height: Number(ref.style.height.replace("px", "")),
                })
              }
              bounds="parent"
            >
              <div
                style={{
                  color: element.style.color,
                  fontSize: `${element.style.fontSize}px`,
                  fontFamily: element.style.fontFamily,
                  width: "100%",
                  height: "100%",
                  cursor: "move",
                  border:
                    selectedElement === element.id ? "2px dashed blue" : "none",
                  padding: "5px",
                  overflow: "hidden",
                  wordWrap: "break-word",
                }}
                onClick={() => setSelectedElement(element.id)}
              >
                {element.content}
              </div>
            </Rnd>
          ))}
        </div>
      </div>
    </div>
  );
}
