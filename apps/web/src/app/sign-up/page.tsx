import { Suspense } from "react";

import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Sign up · SpecBoard" };

export default function SignUpPage() {
  return (
    <Suspense>
      <AuthForm mode="sign-up" />
    </Suspense>
  );
}
