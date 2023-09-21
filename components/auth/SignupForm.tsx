"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleSignIn from "./GoogleSignIn";
import getCharacterValidationError from "@/utils/getCharacterValidationError";
import Error from "./Error";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Form() {
  const router = useRouter();
  const [exsistingUser, setExsistingUser] = useState(false);
  const searchParams = useSearchParams();
  const referrer = searchParams.get("referrer");
  const queryParam = referrer ? `?referrer=${referrer}` : "";

  const formik = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "" },
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
      confirmPassword: Yup.string()
        .required("Please re-type your password")
        // use oneOf to match one of the values inside the array.
        // use "ref" to get the value of passwrod.
        .oneOf([Yup.ref("password")], "Passwords does not match"),
    }),
    onSubmit: async ({ email, password }) => {
      try {
        const res = await fetch("/api/create-user", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
          router.replace(`/login${queryParam}`);
        } else {
          const resBody = await res.json();
          if (resBody.data === "Existing user") {
            setExsistingUser(true);
            formik.setErrors({
              confirmPassword: "You already have an account with that email.",
            });
          }
        }
      } catch (err) {
        console.error(err);
        formik.setErrors({
          confirmPassword:
            "An error occurred creating your account, please try again.",
        });
      }
    },
  });

  return (
    <div className="bg-black bg-opacity-10 rounded-md p-8 flex flex-col gap-4 w-full max-w-[450px] text-slate-200">
      <GoogleSignIn callbackUrl={`/profile${queryParam}`} />
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
        <label className="flex flex-col">
          <span className="xs:text-base text-sm">Confirm Password</span>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="confirm-password"
            className="border bg-transparent border-slate-200 rounded-md p-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword && formik.submitCount > 0 && (
            <Error>{formik.errors.confirmPassword}</Error>
          )}
        </label>
        {exsistingUser && (
          <Link className="xs:text-sm text-xs text-blue-200" href="/login">
            Try logging in
          </Link>
        )}
        <button
          className="bg-truePrimary hover:bg-opacity-80 p-2 rounded-md xs:text-base w-full text-sm"
          type="submit"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
