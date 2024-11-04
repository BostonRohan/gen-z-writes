import ResetPassword from "@/components/forms/ResetPassword";
import Email from "@/components/home/Email";
import jwt from "jsonwebtoken";

interface TokenJWT {
  exp: number;
  data: string;
  iat: number;
}

export default async function ForgotPassword({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const token = searchParams?.token;
  const error = searchParams?.error;

  const EmailSection = ({ error }: { error?: string }) => {
    return (
      <section className="min-h-[calc(100vh_-_16px)] h-full w-full flex flex-col items-center overflow-hidden px-4 justify-center text-slate-200">
        <h1 className="text-4xl text-slate-200 font-bold text-center max-w-[450px]">
          Enter your email to reset your password
        </h1>
        <Email
          pageError={error ?? undefined}
          apiUrl="/api/forgot-password"
          submissionMessage="Check your email for next steps."
        />
      </section>
    );
  };

  if (!!error) {
    return (
      <EmailSection error="There was an error resetting your password, please try again." />
    );
  }
  if (token && typeof token === "string") {
    try {
      const forgotPasswordJwt = jwt.verify(
        token,
        process.env.FORGOT_PASSWORD_SECRET
      ) as TokenJWT;
      return (
        <section className="min-h-[calc(100vh_-_16px)] h-full flex items-center justify-center">
          <ResetPassword forgotPassword={forgotPasswordJwt.data} />
        </section>
      );
    } catch (err) {
      return (
        <EmailSection error="There was an error resetting your password, please try again." />
      );
    }
  } else {
    return <EmailSection />;
  }
}
