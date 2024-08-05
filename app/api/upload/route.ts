import { supabaseAdmin } from "@/utils/supabase/admin";
import { NextResponse } from "next/server";

export const runtime = "edge";

const supabase = supabaseAdmin();

export async function POST(req: Request) {
  if (!supabase) {
    return new Response("Supabase is missing.", { status: 401 });
  }

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
    return new Response(`Error uploading file: ${error.message}`, {
      status: 500,
    });
  }
  console.log("File uploaded successfully.", data);

  const url = data; // Adjust this based on your Supabase API response

  return NextResponse.json({ url });
}
