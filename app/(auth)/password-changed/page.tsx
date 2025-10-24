import PasswordChangedForm from "@/components/forms/PasswordChangedForm";

export default function PasswordChangedPage() {
  return (
    <>
      <div className="p-6 sm:p-8 flex-col justify-center">
        {/* <div className="flex justify-center">
          <SuccessCheckIcon className="text-primary"/>
        </div> */}
        <h1 className="text-xl font-semibold text-header text-center mt-4">
          Password Successfully
          <br /> Changed
        </h1>
        <PasswordChangedForm />
      </div>
    </>
  );
}
