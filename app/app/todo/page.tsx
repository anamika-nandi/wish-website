import React from "react";
import "@/styles/prosemirror.css";
import Editor from "@/components/editor/advanced-editor";

import { getUser } from "@/app/actions";
import { fetchDefaultValue } from "@/actions/powerpointstuff";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Eric's Todo List",
  alternates: {
    canonical: "/todo",
  },
};

export default async function Todo() {
  const user = await getUser();
  const type = "Todo-Eric";

  const data = await fetchDefaultValue(user?.id!, type);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Editor
        user={user}
        initialValue={data?.content?.[0] as any}
        type={type}
      />
    </section>
  );
}
