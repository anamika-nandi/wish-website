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
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  mediaStyle: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  textElements: TextElement[];
}

const CARD_WIDTH = 400;
const CARD_HEIGHT = 600;
const DEFAULT_MEDIA_WIDTH = 240;
const DEFAULT_MEDIA_HEIGHT = 168;

export default function WishCardGenerator() {
  const [cardData, setCardData] = useState<CardData>({
    backgroundType: "color",
    backgroundColor: "#ffffff",
    gradientFrom: "#ff9a9e",
    gradientTo: "#fad0c4",
    mediaType: null,
    mediaSource: null,
    mediaStyle: {
      x: (CARD_WIDTH - DEFAULT_MEDIA_WIDTH) / 2,
      y: (CARD_HEIGHT - DEFAULT_MEDIA_HEIGHT) / 2,
      width: DEFAULT_MEDIA_WIDTH,
      height: DEFAULT_MEDIA_HEIGHT,
    },
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const loadedCardData = urlParams.get("cardData");
    if (loadedCardData) {
      setCardData(JSON.parse(decodeURIComponent(loadedCardData)));
    }
  }, []);

  const handleBackgroundTypeChange = (value: "color" | "gradient") => {
    setCardData((prev) => ({ ...prev, backgroundType: value }));
  };

  const handleBackgroundColorChange = (color: string) => {
    setCardData((prev) => ({ ...prev, backgroundColor: color }));
  };

  const handleGradientChange = (type: "from" | "to", color: string) => {
    setCardData((prev) => ({
      ...prev,
      [`gradient${type.charAt(0).toUpperCase() + type.slice(1)}`]: color,
    }));
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const mediaType = file.type.startsWith("image/") ? "image" : "video";

      setIsImageLoading(true);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: file,
          headers: {
            "x-user-id": "1",
            "x-filename": file.name,
            "content-type": file.type,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Upload failed: ${response.status} ${response.statusText}`
          );
        }

        const { url } = await response.json();

        setCardData((prev) => ({
          ...prev,
          mediaType,
          mediaSource: url,
          mediaStyle: prev.mediaSource
            ? prev.mediaStyle
            : {
                x: (CARD_WIDTH - DEFAULT_MEDIA_WIDTH) / 2,
                y: (CARD_HEIGHT - DEFAULT_MEDIA_HEIGHT) / 2,
                width: DEFAULT_MEDIA_WIDTH,
                height: DEFAULT_MEDIA_HEIGHT,
              },
        }));

        toast.success("Upload successful", {
          description: `Your ${mediaType} has been uploaded and set.`,
        });
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Upload failed", {
          description:
            error instanceof Error
              ? error.message
              : "There was an error uploading your file. Please try again.",
        });
      } finally {
        setIsImageLoading(false);
      }
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

  const handleMediaDragStop = (d: { x: number; y: number }) => {
    setCardData((prev) => ({
      ...prev,
      mediaStyle: { ...prev.mediaStyle, x: d.x, y: d.y },
    }));
  };

  const handleMediaResizeStop = (
    ref: HTMLElement,
    position: { x: number; y: number },
    size: { width: number; height: number }
  ) => {
    setCardData((prev) => ({
      ...prev,
      mediaStyle: {
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
      },
    }));
  };

  const generateShareableUrl = () => {
    const baseUrl = window.location.origin + "/preview";
    const encodedCardData = encodeURIComponent(JSON.stringify(cardData));
    const url = `${baseUrl}?cardData=${encodedCardData}`;
    setShareableUrl(url);

    // Copy to clipboard
    navigator.clipboard.writeText(url).then(
      () => {
        toast.success("URL copied to clipboard", {
          description: "The shareable URL has been copied to your clipboard.",
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy URL", {
          description: "Please try copying the URL manually.",
        });
      }
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-1/2 p-6 bg-white shadow-lg overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-primary">
          Wish Card Generator
        </h2>
        <div className="space-y-6">
          <div>
            <Label>Background Type</Label>
            <Select
              onValueChange={handleBackgroundTypeChange}
              value={cardData.backgroundType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select background type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="color">Solid Color</SelectItem>
                <SelectItem value="gradient">Gradient</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {cardData.backgroundType === "color" && (
            <div>
              <Label>Background Color</Label>
              <ColorPicker
                color={cardData.backgroundColor}
                onChange={handleBackgroundColorChange}
              />
            </div>
          )}
          {cardData.backgroundType === "gradient" && (
            <>
              <div>
                <Label>Gradient From</Label>
                <ColorPicker
                  color={cardData.gradientFrom}
                  onChange={(color: string) =>
                    handleGradientChange("from", color)
                  }
                />
              </div>
              <div>
                <Label>Gradient To</Label>
                <ColorPicker
                  color={cardData.gradientTo}
                  onChange={(color: string) =>
                    handleGradientChange("to", color)
                  }
                />
              </div>
            </>
          )}
          <div>
            <Label htmlFor="mediaUpload">
              Upload Image or Video (optional)
            </Label>
            <Input
              id="mediaUpload"
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaUpload}
            />
          </div>
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
        <div
          className="relative border border-gray-300 overflow-hidden rounded-lg"
          style={{
            width: `${CARD_WIDTH}px`,
            height: `${CARD_HEIGHT}px`,
            background:
              cardData.backgroundType === "color"
                ? cardData.backgroundColor
                : `linear-gradient(to bottom, ${cardData.gradientFrom}, ${cardData.gradientTo})`,
          }}
        >
          {cardData.mediaSource && (
            <Rnd
              size={{
                width: cardData.mediaStyle.width,
                height: cardData.mediaStyle.height,
              }}
              position={{ x: cardData.mediaStyle.x, y: cardData.mediaStyle.y }}
              onDragStop={(e, d) => handleMediaDragStop(d)}
              onResizeStop={(e, direction, ref, delta, position) =>
                handleMediaResizeStop(ref, position, {
                  width: Number(ref.style.width.replace("px", "")),
                  height: Number(ref.style.height.replace("px", "")),
                })
              }
              bounds="parent"
            >
              {isImageLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : cardData.mediaType === "image" ? (
                <img
                  src={cardData.mediaSource}
                  alt="Uploaded image"
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  style={{ pointerEvents: "none" }}
                />
              ) : (
                <video
                  src={cardData.mediaSource}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  controls
                  style={{ pointerEvents: "none" }}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </Rnd>
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
