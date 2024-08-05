import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { getUser } from "@/app/actions";

export async function GET() {
  noStore();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong...");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    const account = await stripe.accounts.create({
      email: user.email as string,
      controller: {
        losses: {
          payments: "application",
        },
        fees: {
          payer: "application",
        },
        stripe_dashboard: {
          type: "express",
        },
      },
    });

    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.user_metadata.firstName ?? "",
        lastName: user.user_metadata.lastName ?? "",
        email: user.email ?? "",
        profileImage: `https://avatar.vercel.sh/${user.email}`,
        connectedAccountId: account.id,
      },
    });
  }

  return NextResponse.redirect("/dashboard");
}
