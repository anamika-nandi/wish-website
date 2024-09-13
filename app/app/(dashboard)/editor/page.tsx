"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPicker } from "./_ui/color-picker-component";
import { FontSelector } from "./_ui/font-selector-component";
import { CardPreview } from "./_ui/card-preview-component";

interface CardData {
  recipientName: string;
  message: string;
  senderName: string;
  senderNote: string;
  image: string | null;
  video: string | null;
  textColor: string;
  fontSize: number;
  fontFamily: string;
  textPosition: { x: number; y: number };
}

export default function BirthdayCardDashboard() {
  const [cardData, setCardData] = useState<CardData>({
    recipientName: "",
    message: "",
    senderName: "",
    senderNote: "",
    image: null,
    video: null,
    textColor: "#000000",
    fontSize: 16,
    fontFamily: "Arial",
    textPosition: { x: 0, y: 0 },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setCardData((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(files[0]),
      }));
    }
  };

  const handleStyleChange = (
    property: keyof CardData,
    value: string | number
  ) => {
    setCardData((prev) => ({ ...prev, [property]: value }));
  };

  const handleDrag = (e: React.MouseEvent, ui: { x: number; y: number }) => {
    const { x, y } = ui;
    setCardData((prev) => ({ ...prev, textPosition: { x, y } }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 p-6 bg-white shadow-lg overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-primary">
          Birthday Card Editor
        </h2>
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="space-y-4">
            <div>
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input
                id="recipientName"
                name="recipientName"
                value={cardData.recipientName}
                onChange={handleInputChange}
                placeholder="Enter recipient's name"
              />
            </div>
            <div>
              <Label htmlFor="message">Birthday Message</Label>
              <Textarea
                id="message"
                name="message"
                value={cardData.message}
                onChange={handleInputChange}
                placeholder="Write your birthday message"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="senderName">Your Name</Label>
              <Input
                id="senderName"
                name="senderName"
                value={cardData.senderName}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label htmlFor="senderNote">Your Note (optional)</Label>
              <Input
                id="senderNote"
                name="senderNote"
                value={cardData.senderNote}
                onChange={handleInputChange}
                placeholder="E.g., With love, Cheers, etc."
              />
            </div>
          </TabsContent>
          <TabsContent value="style" className="space-y-4">
            <div>
              <Label>Text Color</Label>
              <ColorPicker
                color={cardData.textColor}
                onChange={(color: string) =>
                  handleStyleChange("textColor", color)
                }
              />
            </div>
            <div>
              <Label>Font Size</Label>
              <Slider
                value={[cardData.fontSize]}
                onValueChange={(value: number[]) =>
                  handleStyleChange("fontSize", value[0])
                }
                min={12}
                max={48}
                step={1}
              />
              <div className="text-sm text-muted-foreground mt-1">
                {cardData.fontSize}px
              </div>
            </div>
            <div>
              <Label>Font Family</Label>
              <FontSelector
                value={cardData.fontFamily}
                onChange={(font: string) =>
                  handleStyleChange("fontFamily", font)
                }
              />
            </div>
          </TabsContent>
          <TabsContent value="media" className="space-y-4">
            <div>
              <Label htmlFor="image">Upload Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
            <div>
              <Label htmlFor="video">Upload Video</Label>
              <Input
                id="video"
                name="video"
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-1/2 p-6 bg-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-primary">Preview</h2>
        <CardPreview cardData={cardData} onDrag={handleDrag} />
      </div>
    </div>
  );
}
