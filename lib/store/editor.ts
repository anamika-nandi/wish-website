import { JSONContent } from "novel";
import { create } from "zustand";

interface EditorState {
  content: JSONContent | null;
  setContent: (newContent: any) => void;
}

export const usePowerpointStore = create<EditorState>()((set) => ({
  content: null,
  setContent: (newContent) => set({ content: newContent }),
}));
