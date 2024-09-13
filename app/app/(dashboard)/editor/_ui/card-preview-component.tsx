import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

export const CardPreview = ({ cardData, onDrag }) => {
  const { recipientName, message, senderName, senderNote, image, video, textColor, fontSize, fontFamily, textPosition } = cardData

  return (
    <Card className="w-full h-[500px] relative overflow-hidden">
      <CardContent className="p-0 h-full">
        {image && (
          <img src={image} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
        )}
        {video && (
          <video src={video} autoPlay loop muted className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div
          className="absolute"
          style={{
            color: textColor,
            fontSize: `${fontSize}px`,
            fontFamily,
            left: `${textPosition.x}px`,
            top: `${textPosition.y}px`,
            cursor: 'move',
          }}
          draggable
          onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}
          onDrag={(e) => onDrag(e, { x: e.clientX, y: e.clientY })}
        >
          <p className="font-bold">{recipientName}</p>
          <p>{message}</p>
          <p className="mt-4">{senderName}</p>
          <p className="text-sm">{senderNote}</p>
        </div>
      </CardContent>
    </Card>
  )
}
