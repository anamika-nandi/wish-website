"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/lib/store/user";

export default function SessionInitializer() {
  const { session, initialized, setSession, setLoading, setInitialized } =
    useUser();

  useEffect(() => {
    const supabase = createClient();

    const getSession = async () => {
      if (initialized && session) {
        // If session is already initialized, skip re-fetching
        // checkUTMExpiry();
        return;
      }
      setLoading(true);
      const {
        data: { session: newSession },
      } = await supabase.auth.getSession();
      if (newSession) {
        setSession(newSession);
        setInitialized(true); // Mark the session as initialized
      } else {
        // clearUTMParameters();
        // Handle anonymous signup or other logic
        // tracks every user
        console.log("No session found, signing up anonymously");
        const { data: session, error } =
          await supabase.auth.signInAnonymously();
        if (error) {
          console.error("Anonymous signup error:", error);
          return error;
        }
        setSession("session" in session ? session.session : null);
        setInitialized(true);
      }
      setLoading(false);
    };

    getSession();
  }, [initialized, session, setLoading, setSession, setInitialized]);

  return null;
}
