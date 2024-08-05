import { UserIdTypePageProps } from "@/app/app/u/[usertype]/[id]/page";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { redirect } from "next/navigation";
import React from "react";

export default async function UserServer({
  params,
  searchParams,
}: UserIdTypePageProps) {
  // todo validate id based on user type

  const supabase = supabaseAdmin();

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    console.log("error", error);
    redirect("/");
  }
  console.log("user", user);

  return <div>UserServer</div>;
}
