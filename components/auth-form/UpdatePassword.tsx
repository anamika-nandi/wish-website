"use client";

import { updatePassword } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface UpdatePasswordProps {
  redirectMethod: string;
}

export default function UpdatePassword({
  redirectMethod,
}: UpdatePasswordProps) {
  const router = useRouter();
  const routerMethod = redirectMethod === "client" ? router : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, updatePassword, routerMethod);
    setIsSubmitting(false);
  };

  return (
    <div className="my-8">
      <form
        noValidate={true}
        className="mb-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              className="w-full rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-transparent"
            />
            <label htmlFor="passwordConfirm">Confirm New Password</label>
            <input
              id="passwordConfirm"
              placeholder="Password"
              type="password"
              name="passwordConfirm"
              autoComplete="current-password"
              className="w-full rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-transparent"
            />
          </div>
          <Button
            variant="slim"
            type="submit"
            className="mt-1 font-semibold"
            loading={isSubmitting}
          >
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}
