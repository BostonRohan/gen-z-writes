"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleSignIn from "./GoogleSignIn";
import { signIn } from "next-auth/react";
import Link from "next/link";
import getCharacterValidationError from "@/utils/getCharacterValidationError";
import Error from "./Error";
import { useSearchParams } from "next/navigation";

export default function Form() {
  const searchParams = useSearchParams();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Please enter a password")
        // check minimum characters
        .min(8, "Password must have at least 8 characters")
        // different error messages for different requirements
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    }),
    onSubmit: async ({ email, password }) => {
      try {
        await signIn("credentials", {
          email,
          password,
        });
      } catch (err) {
        formik.setErrors({
          password:
            "There was an issue signing you in, please retry your email or password.",
        });
      }
    },
  });

  return (
    <div className="bg-black bg-opacity-10 rounded-md p-8 flex flex-col gap-4 w-full max-w-[450px] text-slate-200">
      <GoogleSignIn />
      <form onSubmit={formik.handleSubmit} className="space-y-4 w-full">
        <input name="csrfToken" type="hidden" defaultValue={""} />
        <label className="flex flex-col">
          <span className="xs:text-base text-sm">Email address</span>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            className="border bg-transparent border-slate-200 rounded-md p-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </label>
        <label className="flex flex-col">
          <span className="xs:text-base text-sm">Password</span>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            className="border bg-transparent border-slate-200 rounded-md p-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.submitCount > 0 && (
            <Error>{formik.errors.password}</Error>
          )}
        </label>
        {searchParams.get("error") && (
          <Error>
            There was an error signing you in, please retry your password.
          </Error>
        )}

        <Link
          href="/forgot-password"
          className="text-truePrimary opacity-80 text-sm"
        >
          Forgot password?
        </Link>

        <button
          className="bg-truePrimary hover:bg-opacity-80 p-2 rounded-md xs:text-base w-full text-sm"
          type="submit"
        >
          Sign in with Email
        </button>
      </form>
    </div>
  );
}
