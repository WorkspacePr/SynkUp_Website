import TwoFactorForm from "@/components/forms/TwoFactorForm";

export default function TwoFactorPage() {
  return (
    <>
      <div className="p-6 sm:p-8">
        <h1 className="text-xl font-semibold text-header">Enter OTP</h1>
        <p className="mt-2 text-sm text-sub-text">
          Enter the 6-digit code sent to your email or authenticator app
        </p>
        <TwoFactorForm />
      </div>
    </>
  );
}
