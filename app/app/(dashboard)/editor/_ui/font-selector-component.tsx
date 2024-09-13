import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const fontOptions = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact"
]

export const FontSelector = ({ value, onChange }) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a font" />
      </SelectTrigger>
      <SelectContent>
        {fontOptions.map((font) => (
          <SelectItem key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
