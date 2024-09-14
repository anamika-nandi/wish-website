import { supabaseAdmin } from "@/utils/supabase/admin";
import { NextResponse } from "next/server";

export const runtime = "edge";

const supabase = supabaseAdmin();

export async function POST(req: Request) {
  if (!supabase) {
    return new Response("Supabase is missing.", { status: 401 });
  }

  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return new Response("Missing user ID.", { status: 400 });
    }

    const contentType = req.headers.get("content-type") || "text/plain";
    const filename = req.headers.get("x-filename") || "file.bin";

    const file = await req.blob();

    const uploadPath = `${userId}/${filename}`;
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(uploadPath, file, {
        contentType,
        upsert: true,
    });

    if (error) {
      console.error("Supabase upload error:", error);
      return new Response(`Error uploading file: ${error.message}`, {
        status: 500,
      });
    }

    console.log("File uploaded successfully.", data);

    const { data: publicUrlData } = supabase.storage
      .from("uploads")
      .getPublicUrl(uploadPath);

    const url = publicUrlData.publicUrl;
    const path = uploadPath; // This is the permanent path

    return NextResponse.json({ url, path });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`, {
      status: 500,
    });
  }
}
