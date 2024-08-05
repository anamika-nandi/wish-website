"use client";

import React, { useEffect, useState } from "react";
import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorContent,
  type JSONContent,
  EditorCommandList,
  EditorInstance,
} from "novel";
import { useDebouncedCallback } from "use-debounce";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { defaultExtensions } from "./extensions";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { ColorSelector } from "./selectors/color-selector";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";

import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "./image-upload";
import { Separator } from "../ui/separator";
import { saveContent } from "@/actions/powerpointstuff";
import { createClient } from "@/utils/supabase/client";
import { defaultValue } from "@/constants/default-value";

const extensions = [...defaultExtensions, slashCommand];

interface EditorProp {
  initialValue?: JSONContent;
  user?: any;
  type: string;
}
const Editor = ({ user, type, initialValue }: EditorProp) => {
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  const [content, setContent] = useState<JSONContent | null>(
    initialValue || null
  );
  const [saveStatus, setSaveStatus] = useState("Saved");

  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("realtime-editor-updates")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "PowerPoint" },
        (payload) => {
          if (user?.id !== payload.new.user_id && payload.new.type === type) {
            const newContent = payload.new.content && payload.new.content[0];
            setContent(newContent);
            window.localStorage.setItem(
              `content-${user?.id}-${type}`,
              JSON.stringify(newContent)
            );
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user, setContent, type, supabase]);

  useEffect(() => {
    // First, try to load from localStorage
    const storedContent = window.localStorage.getItem(`content-${type}`);

    if (storedContent && storedContent !== "undefined") {
      setContent(JSON.parse(storedContent));
    } else if (initialValue && initialValue !== null) {
      setContent(initialValue as JSONContent);
      window.localStorage.setItem(
        `content-${type}`,
        JSON.stringify(initialValue)
      );
    } else {
      setContent(defaultValue);
    }
  }, [user?.id, type, initialValue]);

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      setContent(json);
      window.localStorage.setItem(`content-${type}`, JSON.stringify(json));
      await saveContent(json, user?.id!, type);
      setSaveStatus("Saved");
    },
    2000
  );

  if (!content) return null;

  return (
    <div className="relative w-full ">
      {user ? (
        <div className="flex absolute right-5 top-5 z-10 mb-5 gap-2">
          <div className="rounded-lg bg-stone-200 px-2 py-1 text-sm text-stone-300">
            {saveStatus}
          </div>
        </div>
      ) : null}
      <EditorRoot>
        <EditorContent
          // TODO: make it to admin user
          editable={
            user?.id === "011305aa-0ee6-49ed-91f2-d572fc1bb47d" ? true : false
          }
          key={user ? undefined : JSON.stringify(content)}
          className="border p-4 rounded-xl"
          initialContent={content}
          extensions={extensions}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
            },
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
            setSaveStatus("Unsaved");
          }}
          // TODO: when not edible also no slotAfter
          slotAfter={user ? <ImageResizer /> : null}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent-100 aria-selected:bg-accent-100 `}
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />

            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </GenerativeMenuSwitch>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default Editor;
