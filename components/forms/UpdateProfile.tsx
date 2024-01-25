"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import getCharacterValidationError from "@/utils/getCharacterValidationError";
import Error from "../auth/Error";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import classNames from "classnames";
import { useToast } from "../ui/use-toast";

//user id never changes so we can grab it from the server
export default function Form({ userId }: { userId: string }) {
  const [usernameActive, setUserNameActive] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const { toast } = useToast();

  const { data, update, status } = useSession();

  const handleReset = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    signIn("credentials", { email, password });
  };

  const formik = useFormik({
    initialValues: {
      name: data?.user?.name ?? "",
      username: data?.user?.username ?? "",
      email: data?.user?.email ?? "",
      password: "",
      ...(changePassword && {
        confirmPassword: "",
      }),
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .label("Name")
        .min(3)
        .max(60)
        .matches(
          /^[A-Za-z ]+$/g,
          "Name cannot contain non-alphanumeric characters or numbers."
        ),
      username: Yup.string()
        .label("Username")
        .min(4)
        .max(20)
        .matches(
          /^[A-Za-z ]+$/,
          "Username cannot contain non-alphanumeric characters or numbers."
        ),
      email: Yup.string().email("Invalid email address"),
      password: Yup.string()
        .label("Password")
        // check minimum characters
        .min(8, "Password must have at least 8 characters")
        // different error messages for different requirements
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
      ...(changePassword && {
        confirmPassword: Yup.string()
          .required("Please re-type your password")
          .label("Confirm Password")
          // use oneOf to match one of the values inside the array.
          // use "ref" to get the value of password.
          .oneOf([Yup.ref("password")], "Passwords do not match"),
      }),
    }),
    onSubmit: async ({ username, email, password, name }) => {
      try {
        const validUsername = await fetch(
          `https://www.purgomalum.com/service/json?text=${username}`
        );

        const validUsernameBody = await validUsername.json();

        //profanity and things of that nature
        if (username && validUsernameBody.result !== username) {
          toast({ description: "Invalid username.", variant: "destructive" });
          return;
        }

        const res = await fetch("/api/update-user", {
          method: "POST",
          body: JSON.stringify({
            ...(username && { username }),
            // ...(email && { email }),
            ...(password && { password }),
            id: userId,
          }),
        });

        if (res.ok) {
          //create a new session for the user if they changed their password
          if (password) {
            toast({ description: "Password updated" });
            setTimeout(() => handleReset({ email, password }), 2500);
            return;
          }
          //TODO: improve on this when more fields are added to this view
          if (username) {
            toast({ description: "Username updated" });
          }

          update({
            data: {
              ...(username && { username }),
              // ...(email && { email }),
            },
          });
        }
        const resBody = await res.json();

        if (resBody.data === "Existing user") {
          formik.initialValues.email !== email
            ? toast({
                description: "There is already a user with that email.",
                variant: "destructive",
              })
            : toast({
                description: "There is already a user with that username.",
                variant: "destructive",
              });
        }
      } catch (err) {
        console.error(err);
      }
    },
    enableReinitialize: true,
  });

  const handleUpdateClick = () => {
    const errors = Object.values(formik.errors);

    errors.map((error) =>
      toast({ description: error, variant: "destructive" })
    );
  };

  const hasFormedChanged =
    formik.initialValues.name !== formik.values.name ||
    formik.initialValues.email !== formik.values.email ||
    formik.initialValues.username !== formik.values.username ||
    formik.initialValues.password != formik.values.password;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="my-20 max-w-lg gap-4 flex flex-col">
      {!data?.user?.name && status !== "loading" && (
        <div className="space-y-2">
          <label className="text-slate-200">
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
          </label>
        </div>
      )}
      <div className="space-y-2">
        <label className="text-slate-200 font-semibold">Username</label>
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
      </div>
      <div className="space-y-2">
        <label className="font-semibold">Email</label>
        <input
          className="p-2 cursor-not-allowed outline-none bg-black bg-opacity-10 rounded-md w-full opacity-80 space-y-2"
          id="email"
          name="email"
          type="email"
          readOnly
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
      </div>
      {!!data?.user.passwordLength && (
        <div className="flex gap-2 justify-center items-center w-full">
          <div className="flex flex-col w-full gap-2">
            <label className="font-semibold">
              {changePassword && "Enter new "}Password
            </label>
            <input
              className={classNames(
                { hidden: changePassword },
                "p-2 bg-black bg-opacity-10 rounded-md cursor-not-allowed outline-none w-full block opacity-80"
              )}
              type="password"
              readOnly
              value={"•".repeat(data.user.passwordLength)}></input>
            <input
              className={classNames(
                { hidden: !changePassword },
                "p-2 bg-black bg-opacity-10 rounded-md w-full block opacity-80"
              )}
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </div>
          {changePassword &&
            formik.initialValues.password != formik.values.password && (
              <div
                className={classNames(
                  { hidden: !changePassword },
                  "flex flex-col w-full gap-2"
                )}>
                <label className="font-semibold">Confirm new Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="confirm-password"
                  className="bg-black bg-opacity-10 opacity-80 w-full block rounded-md p-2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
              </div>
            )}

          {!changePassword && (
            <button
              onClick={() => setChangePassword(true)}
              className="w-full h-10 max-w-[160px] hover:bg-gray-600 bg-gray-500 rounded-md self-end">
              Change Password
            </button>
          )}
        </div>
      )}
      <button
        onClick={handleUpdateClick}
        disabled={formik.isSubmitting || !hasFormedChanged}
        type="submit"
        className="p-2 bg-truePrimary text-slate-200 w-full rounded-md hover:opacity-80 sm:max-w-[344px] disabled:opacity-60">
        Update
      </button>
    </form>
  );
}
