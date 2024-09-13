import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export const ColorPicker = ({ color, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="colorPicker" className="sr-only">
        Choose a color
      </Label>
      <Input
        id="colorPicker"
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-10 cursor-pointer"
      />
      <Input
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-24"
        placeholder="#000000"
      />
    </div>
  )
}
