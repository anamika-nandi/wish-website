"use client";
import React, { useEffect, useState } from "react";
import "@/styles/prosemirror.css";

import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { createClient } from "@/utils/supabase/client";
import { usePowerpointStore } from "@/lib/store/editor";

export default function PowerpointEditor({
  user,
  defaultValue,
}: {
  user: any;
  defaultValue?: JSONContent;
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Editor
        user={user}
        initialValue={defaultValue as any}
        type="PowerPoint"
      />
    </section>
  );
}
