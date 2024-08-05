"use client";
import React from "react";
import { signOut } from "@/utils/auth-helpers/server";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Signout() {
  const router = useRouter();
  async function handleLogoutClick() {
    const response = await signOut();

    if (response?.error) {
      toast.error(
        "An error occurred while logging out. Please try again or contact support."
      );
    } else {
      router.refresh();

      toast.success("You have been logged out.");
    }
  }
  return (
    <div
      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      onClick={handleLogoutClick}
    >
      <span>Sign Out</span>
    </div>
  );
}
