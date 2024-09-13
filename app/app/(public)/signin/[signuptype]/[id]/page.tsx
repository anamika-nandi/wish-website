import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod,
} from "@/utils/auth-helpers/settings";
import Logo from "@/components/app/icons/logo";
import EmailSignIn from "@/components/auth-form/EmailSignIn";
import ForgotPassword from "@/components/auth-form/ForgotPassword";
import OauthSignIn from "@/components/auth-form/OauthSignIn";
import PasswordSignIn from "@/components/auth-form/PasswordSignIn";
import SignUp from "@/components/auth-form/signup";
import UpdatePassword from "@/components/auth-form/UpdatePassword";
import Separator from "@/components/auth-form/Seperator";
import Card from "@/components/ui/auth-card";

export default async function SignIn({
  params,
  searchParams,
}: {
  params: { id: string; signuptype: string };
  searchParams: { disable_button: boolean };
}) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();

  let viewProp: string;

  if (typeof params.id === "string" && viewTypes.includes(params.id)) {
    viewProp = params.id;
  } else {
    const cookieStore = cookies();
    const preferredSignInView =
      cookieStore.get("preferredSignInView")?.value || null;
    const signuptype = cookies().get("signuptype")?.value || "user";
    viewProp = getDefaultSignInView(preferredSignInView);
    return redirect(`/signin/${signuptype}/${viewProp}`);
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && viewProp !== "update_password") {
    return redirect("/");
  } else if (!user && viewProp === "update_password") {
    return redirect("/signin");
  }
  if (params.signuptype !== "shop" && params.signuptype !== "user") {
    return redirect(`/signin`);
  }

  return (
    <div className="height-screen-helper flex justify-center text-zinc-700">
      <div className="m-auto flex w-80 max-w-lg flex-col justify-between">
        {/* <div className="flex justify-center pb-3">
          <Logo width="64px" height="64px" />
        </div> */}
        <Card
          title={
            viewProp === "forgot_password"
              ? "Reset Password"
              : viewProp === "update_password"
              ? "Update Password"
              : viewProp === "signup"
              ? "Sign Up"
              : "Easy Sign In"
          }
        >
          {viewProp === "password_signin" && (
            <PasswordSignIn
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
            />
          )}
          {viewProp === "email_signin" && (
            <EmailSignIn
              signuptype={params.signuptype}
              allowPassword={allowPassword}
              redirectMethod={redirectMethod}
              disableButton={searchParams.disable_button}
            />
          )}
          {viewProp === "forgot_password" && (
            <ForgotPassword
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
              disableButton={searchParams.disable_button}
            />
          )}
          {viewProp === "update_password" && (
            <UpdatePassword redirectMethod={redirectMethod} />
          )}
          {viewProp === "signup" && (
            <SignUp allowEmail={allowEmail} redirectMethod={redirectMethod} />
          )}
          {viewProp !== "update_password" &&
            viewProp !== "signup" &&
            allowOauth && (
              <>
                <Separator text="Third-party sign-in" />
                <OauthSignIn signuptype={params.signuptype} />
              </>
            )}
        </Card>
      </div>
    </div>
  );
}
