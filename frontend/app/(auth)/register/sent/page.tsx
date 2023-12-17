import emailSent from "@/public/assets/images/emailSent.gif";
import Image from "next/image";

const RegisterSent = () => {
  return (
    <div className="m-auto flex flex-col items-center gap-3 p-10 shadow-2xl">
      <h1 className="text-3xl font-bold">Register request sent!</h1>
      <Image
        src={emailSent}
        alt="Email Sent"
        className="h-auto w-[70%] rounded"
      />
      <p>
        We have sent you a request to confirm your account on email.
        <br />
        If you have not received it, please try to register again.
      </p>
    </div>
  );
};

export default RegisterSent;
