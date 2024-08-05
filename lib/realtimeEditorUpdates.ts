import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

export default function useRealTimeEditorUpdates(user: any) {
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("realtime-editor-updates")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "PowerPoint" },
        async (payload) => {
          if (user?.id !== payload.new.user_id) {
            // if user is not the user that edits show the update
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user, supabase]);
  return null;
}
