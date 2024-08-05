import { redirect } from "next/navigation";
import { getDefaultSignInView } from "@/utils/auth-helpers/settings";
import { cookies } from "next/headers";

export default function SignIn() {
  const preferredSignInView =
    cookies().get("preferredSignInView")?.value || "email_signin";
  const signuptype = cookies().get("signuptype")?.value || "user";

  const defaultView = getDefaultSignInView(preferredSignInView);

  if (signuptype === "shop") {
    return redirect(`/signin/shop/${defaultView}`);
  }

  if (defaultView) {
    return redirect(`/signin/user/${defaultView}`);
  }
}
