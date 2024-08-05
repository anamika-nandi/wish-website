"use server";

import { getUser } from "@/app/actions";
import { Navbar } from "./Navbar";

export async function NavbarServer() {
  const user = await getUser();
  return <Navbar user={user} />;
}
