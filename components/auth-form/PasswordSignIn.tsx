"use client";

import Link from "next/link";
import { signInWithPassword } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

// Define prop type with allowEmail boolean
interface PasswordSignInProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function PasswordSignIn({
  allowEmail,
  redirectMethod,
}: PasswordSignInProps) {
  const router = useRouter();
  const routerMethod = redirectMethod === "client" ? router : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithPassword, routerMethod);
    setIsSubmitting(false);
  };

  return (
    <div className="my-8">
      <form
        noValidate={true}
        className="mb-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="grid gap-2 text-zinc-700">
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="w-full rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-transparent"
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="Password"
              type="password"
              name="password"
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
            Sign in
          </Button>
        </div>
      </form>
      <p>
        <Link
          href="/signin/forgot_password"
          className="text-sm font-light underline hover:font-normal"
        >
          Forgot your password?
        </Link>
      </p>
      {allowEmail && (
        <p>
          <Link
            href="/signin/email_signin"
            className="text-sm font-light underline hover:font-normal"
          >
            Sign in via magic link
          </Link>
        </p>
      )}
      <p>
        <Link
          href="/signin/signup"
          className="text-sm font-light underline hover:font-normal"
        >
          Don&apos;t have an account? Sign up
        </Link>
      </p>
    </div>
  );
}
