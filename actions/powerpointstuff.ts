import { supabaseAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/client";
import { uuid } from "uuidv4";

const supabase = createClient();

export async function saveContent(
  content: any,
  userId: string,
  type: string
): Promise<any> {
  try {
    // Check if content already exists for the user
    const { data: existingData, error: selectError } = await supabase
      .from("PowerPoint")
      .select("id")
      .eq("user_id", userId)
      .eq("type", type)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      // code 'PGRST116' is for no rows found
      throw selectError;
    }

    let result;
    if (existingData) {
      // Content exists, update it
      const { data: updateData, error: updateError } = await supabase
        .from("PowerPoint")
        .update({ content: [content] })
        .eq("user_id", userId)
        .eq("type", type)
        .select();

      if (updateError) {
        throw updateError;
      }
      result = updateData;
    } else {
      // Content does not exist, insert it
      const { data: insertData, error: insertError } = await supabase
        .from("PowerPoint")
        .insert({
          id: uuid(),
          content: [content],
          user_id: userId,
          type: type,
        })
        .select();

      if (insertError) {
        throw insertError;
      }
      result = insertData;
    }

    return result;
  } catch (error) {
    console.error("Error saving content:", error);
    return error;
  }
}

export async function fetchDefaultValue(userId: string, type: string) {
  const { data, error } = await supabase
    .from("PowerPoint")
    .select("*")
    .eq("user_id", userId || "011305aa-0ee6-49ed-91f2-d572fc1bb47d")
    .eq("type", type)
    .single();

  if (error) {
    console.error("Error fetching default value:", error);
    return null;
  } else {
    return data;
  }
}
