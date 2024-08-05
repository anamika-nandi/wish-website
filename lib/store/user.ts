import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

interface UserStoreState {
  session: Session | null;
  sessionLoading: boolean;
  initialized: boolean;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
}

export const useUser = create<UserStoreState>((set) => ({
  session: null,
  sessionLoading: true,
  initialized: false,
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ sessionLoading: loading }),
  setInitialized: (initialized) => set({ initialized }),
}));
