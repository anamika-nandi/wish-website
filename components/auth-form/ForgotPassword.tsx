"use client";

import Link from "next/link";
import { requestPasswordUpdate } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Define prop type with allowEmail boolean
interface ForgotPasswordProps {
  allowEmail: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function ForgotPassword({
  allowEmail,
  redirectMethod,
  disableButton,
}: ForgotPasswordProps) {
  const router = useRouter();
  const routerMethod = redirectMethod === "client" ? router : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, requestPasswordUpdate, routerMethod);
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
          </div>
          <Button
            variant="slim"
            type="submit"
            className="mt-1 font-semibold"
            loading={isSubmitting}
            disabled={disableButton}
          >
            Send Email
          </Button>
        </div>
      </form>
      <p>
        <Link
          href="/signin/password_signin"
          className="text-sm font-light underline hover:font-normal"
        >
          Sign in with email and password
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
