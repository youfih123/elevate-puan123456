import AuthShell from "@/components/auth/AuthShell";
import SignupForm from "@/components/auth/SignupForm";
import { signupCopy } from "@/lib/auth-content";

export const metadata = { title: "Daftar | Elevate Puan" };

export default function SignupPage() {
  return (
    <AuthShell
      active="signup"
      title={signupCopy.title}
      subtitle={signupCopy.subtitle}
    >
      <SignupForm />
    </AuthShell>
  );
}