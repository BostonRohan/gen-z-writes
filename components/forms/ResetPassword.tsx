"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import getCharacterValidationError from "@/utils/getCharacterValidationError";
import { useRouter } from "next/navigation";
import Error from "../auth/Error";

export default function ResetPassword({
  forgotPassword,
}: {
  forgotPassword: string;
}) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: Yup.object({
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
    onSubmit: async ({ password }) => {
      try {
        const res = await fetch("/api/reset-password", {
          method: "POST",
          body: JSON.stringify({ password, forgotPassword }),
        });
        if (res.ok) {
          router.replace("/login");
        }
      } catch (err) {
        console.error(err);
        formik.setErrors({
          confirmPassword:
            "An error occurred updating your password, please try again.",
        });
      }
    },
  });

  return (
    <div className="bg-black bg-opacity-10 rounded-md p-8 flex flex-col gap-4 w-full max-w-[450px] text-slate-200">
      <form onSubmit={formik.handleSubmit} className="space-y-4 w-full">
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

        <button
          className="bg-truePrimary hover:bg-opacity-80 p-2 rounded-md xs:text-base w-full text-sm"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
