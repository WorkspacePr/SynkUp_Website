import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="p-6 sm:p-8">
        <h1 className="text-xl font-semibold text-header">Welcome back</h1>
        <p className="mt-2 text-sm text-sub-text">Sign in to your account</p>
        <LoginForm />
      </div>
    </>
  );
}
