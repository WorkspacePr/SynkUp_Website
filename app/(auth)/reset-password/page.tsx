import ResetPasswordForm from "@/components/forms/ResetPasswordForm";


export default function ResetPasswordPage() {
  return (
    <>
      <div className="p-6 sm:p-8">
        <h1 className="text-xl font-semibold text-header">Reset Password</h1>
        <p className="mt-2 text-sm text-sub-text">
          Please create new password below to complete the reset process
        </p>
        <ResetPasswordForm />
      </div>
    </>
  );
}
