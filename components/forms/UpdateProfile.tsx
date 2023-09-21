"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import getCharacterValidationError from "@/utils/getCharacterValidationError";
import Error from "../auth/Error";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

//user id never changes so we can grab it from the server
export default function Form({ userId }: { userId: string }) {
  const [usernameActive, setUserNameActive] = useState(false);
  const [updatedPassword, setUpdatedPassword] = useState(false);

  const { data, update, status } = useSession();

  const handleReset = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setUpdatedPassword(false);
    signIn("credentials", { email, password });
  };

  const formik = useFormik({
    initialValues: {
      name: data?.user?.name ?? "",
      username: data?.user?.username ?? "",
      email: data?.user?.email ?? "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3)
        .max(60)
        .matches(
          /^[A-Za-z ]+$/g,
          "Name cannot contain non-alphanumeric characters or numbers."
        ),
      username: Yup.string()
        .min(4)
        .max(20)
        .matches(
          /^[A-Za-z ]+$/,
          "Username cannot contain non-alphanumeric characters or numbers."
        ),
      email: Yup.string().email("Invalid email address"),
      password: Yup.string()
        // check minimum characters
        .min(8, "Password must have at least 8 characters")
        // different error messages for different requirements
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    }),
    onSubmit: async ({ username, email, password, name }) => {
      try {
        const validUsername = await fetch(
          `https://www.purgomalum.com/service/json?text=${username}`
        );

        const validUsernameBody = await validUsername.json();

        //profanity and things of that nature
        if (username && validUsernameBody.result !== username) {
          formik.setErrors({ username: "Invalid username." });
          return;
        }

        const res = await fetch("/api/update-user", {
          method: "POST",
          body: JSON.stringify({
            username,
            email,
            password,
            name,
            id: userId,
          }),
        });

        if (res.ok) {
          //create a new session for the user if they changed their password
          if (password) {
            setUpdatedPassword(true);
            setTimeout(() => handleReset({ email, password }), 2500);
            return;
          }
          update({
            data: {
              ...(username && { username }),
              ...(email && { email }),
              ...(name && { name }),
            },
          });
        }
        const resBody = await res.json();

        if (resBody.data === "Existing user") {
          formik.setErrors({
            email: "There is already a user with that email.",
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
    enableReinitialize: true,
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mt-20 max-w-lg gap-4 flex flex-col"
    >
      {!data?.user?.name && status !== "loading" && (
        <label className="text-slate-200 space-y-2">
          <span>Name</span>
          <input
            className="p-2 bg-black bg-opacity-10 rounded-md w-full opacity-80"
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.submitCount > 0 && (
            <Error>{formik.errors.name}</Error>
          )}
        </label>
      )}

      <label className="text-slate-200 space-y-2">
        <span>Username</span>
        <input
          className="p-2 bg-black bg-opacity-10 rounded-md w-full opacity-80"
          type="text"
          id="username"
          readOnly={!usernameActive}
          name="username"
          autoComplete="false"
          onFocus={() => setUserNameActive(true)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.errors.username && formik.submitCount > 0 && (
          <Error>{formik.errors.username}</Error>
        )}
      </label>
      <label className="space-y-2">
        <span>Email</span>
        <input
          className="p-2 bg-black bg-opacity-10 rounded-md w-full opacity-80 space-y-2"
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.submitCount > 0 && (
          <Error>{formik.errors.email}</Error>
        )}
      </label>
      <label className="space-y-2">
        <span>Password</span>
        <input
          className="p-2 bg-black bg-opacity-10 rounded-md w-full opacity-80"
          type="password"
          id="password"
          name="password"
          autoComplete="new-password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && formik.submitCount > 0 && (
          <Error>{formik.errors.password}</Error>
        )}
        {updatedPassword && (
          <p className="text-truePrimary xs:text-xs text-sm">
            Password updated.
          </p>
        )}
      </label>
      <button
        disabled={formik.isSubmitting || updatedPassword}
        type="submit"
        className="p-2 bg-truePrimary text-slate-200 w-full rounded-md hover:opacity-80 ml-auto max-w-[120px]"
      >
        Update
      </button>
    </form>
  );
}
