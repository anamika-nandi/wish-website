"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "./_ui/color-picker-component";
import { FontSelector } from "./_ui/font-selector-component";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

interface TextElement {
  id: string;
  content: string;
  style: {
    color: string;
    fontSize: number;
    fontFamily: string;
    position: { x: number; y: number };
    width: number;
    height: number;
  };
}

interface CardData {
  backgroundImage: string | null;
  textElements: TextElement[];
}

export default function WishCardGenerator() {
  const [cardData, setCardData] = useState<CardData>({
    backgroundImage: null,
    textElements: [
      {
        id: "recipient",
        content: "Dear [Recipient]",
        style: {
          color: "#000000",
          fontSize: 24,
          fontFamily: "Arial",
          position: { x: 20, y: 20 },
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
          position: { x: 20, y: 80 },
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
          position: { x: 20, y: 200 },
          width: 150,
          height: 50,
        },
      },
    ],
  });
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [shareableUrl, setShareableUrl] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const loadedCardData = urlParams.get("cardData");
    if (loadedCardData) {
      setCardData(JSON.parse(decodeURIComponent(loadedCardData)));
    }
  }, []);

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardData((prev) => ({
          ...prev,
          backgroundImage: reader.result as string,
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

  const handleDrag = (id: string, e: any, data: { x: number; y: number }) => {
    handleStyleChange(id, "position", { x: data.x, y: data.y });
  };

  const handleResize = (
    id: string,
    e: any,
    { size }: { size: { width: number; height: number } }
  ) => {
    handleStyleChange(id, "width", size.width);
    handleStyleChange(id, "height", size.height);
  };

  const generateShareableUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const encodedCardData = encodeURIComponent(JSON.stringify(cardData));
    const url = `${baseUrl}?cardData=${encodedCardData}`;
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
            <Label htmlFor="backgroundImage">Upload Background Image</Label>
            <Input
              id="backgroundImage"
              type="file"
              accept="image/*"
              onChange={handleBackgroundUpload}
            />
          </div>
        </div>
        <div className="mt-6">
          <Button onClick={generateShareableUrl}>Generate Shareable URL</Button>
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
          {cardData.backgroundImage && (
            <img
              src={cardData.backgroundImage}
              alt="Background"
              className="w-full h-full object-cover absolute"
            />
          )}
          {cardData.textElements.map((element) => (
            <Draggable
              key={element.id}
              position={element.style.position}
              onStop={(e, data) => handleDrag(element.id, e, data)}
              bounds="parent"
            >
              <Resizable
                width={element.style.width}
                height={element.style.height}
                onResize={(e, data) => handleResize(element.id, e, data)}
                minConstraints={[100, 50]}
                maxConstraints={[500, 300]}
              >
                <div
                  style={{
                    ...element.style,
                    position: "absolute",
                    cursor: "move",
                    border:
                      selectedElement === element.id
                        ? "2px dashed blue"
                        : "none",
                    padding: "5px",
                    overflow: "hidden",
                    wordWrap: "break-word",
                  }}
                  onClick={() => setSelectedElement(element.id)}
                >
                  {element.content}
                </div>
              </Resizable>
            </Draggable>
          ))}
        </div>
      </div>
    </div>
  );
}
