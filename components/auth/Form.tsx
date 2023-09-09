"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleSignIn from "./GoogleSignIn";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Form({}: {
  //   formType: "Sign up" | "Sign in";
  //   onSubmit?: () => void;
  //   formik: any;
}) {
  const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
  };

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
      //   confirmPassword: Yup.string()
      //     .required("Please re-type your password")
      //     // use oneOf to match one of the values inside the array.
      //     // use "ref" to get the value of passwrod.
      //     .oneOf([Yup.ref("password")], "Passwords does not match"),
    }),
    onSubmit: async ({ email, password }) => {
      const test = await signIn("credentials", { email, password });
      console.log(test);
    },
  });

  return (
    <form
      className="bg-black bg-opacity-10 rounded-md p-8 flex flex-col gap-4 w-full max-w-[450px] text-slate-200"
      onSubmit={formik.handleSubmit}
    >
      <GoogleSignIn />
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
          <p className="text-red-200 xs:text-sm text-xs">
            {formik.errors.password}
          </p>
        )}
      </label>

      {/* {formType === "Sign up" && (
        <label className="flex flex-col">
          <span className="xs:text-base text-sm">Confirm Password</span>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="border bg-transparent border-slate-200 rounded-md p-2"
            autoComplete="confirm-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword && formik.submitCount > 0 && (
            <p className="text-red-200 text-sm">
              {formik.errors.confirmPassword}
            </p>
          )}
        </label>
      )} */}
      <button
        className="bg-primary hover:bg-opacity-80 p-2 rounded-md xs:text-base text-sm"
        type="submit"
      >
        {`Sign in with Email`}
      </button>
    </form>
  );
}
