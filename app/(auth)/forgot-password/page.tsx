import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="p-6 sm:p-8">
        <h1 className="text-xl font-semibold text-header">Forgot Password?</h1>
        <p className="mt-2 text-sm text-sub-text">Fill details below for reset instructions</p>
        <ForgotPasswordForm />
      </div>
    </>
  );
}
