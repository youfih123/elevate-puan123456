import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";
import { loginCopy } from "@/lib/auth-content";

export const metadata = { title: "Masuk | Elevate Puan" };

export default function LoginPage() {
  return (
    <AuthShell
      active="login"
      title={loginCopy.title}
      subtitle={loginCopy.subtitle}
    >
      <LoginForm />
    </AuthShell>
  );
}