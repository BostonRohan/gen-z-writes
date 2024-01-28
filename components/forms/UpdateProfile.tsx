"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import getCharacterValidationError from "@/utils/getCharacterValidationError";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import classNames from "classnames";
import { useToast } from "../ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  userId: string;
  serverSession: {
    username?: string | null;
    email: string;
    passwordLength?: number | null;
    name?: string | null;
    emailVerified?: Date | null;
  };
  emailJustVerified?: boolean | null;
}

//user id never changes so we can grab it from the server
export default function Form({
  userId,
  serverSession,
  emailJustVerified,
}: Props) {
  const [usernameActive, setUserNameActive] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(false);
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

  const handleVerifyEmail = async () => {
    try {
      const res = await fetch("/api/send-email-verify", {
        method: "POST",
        body: JSON.stringify({ email: data?.user.email }),
      });
      if (!res.ok) {
        toast({
          description:
            "There was an error sending your verification email, please try again.",
          variant: "destructive",
        });
        return;
      }
      toast({
        description: "An email has been sent to your inbox for next steps.",
      });
    } catch (err) {
      toast({
        description:
          "There was an error sending your verification email, please try again.",
        variant: "destructive",
      });
      console.error(err);
    }
  };

  const currentPasswordForm = useFormik({
    initialValues: {
      currentPassword: "",
      confirmCurrentPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .label("Password")
        // check minimum characters
        .min(8, "Password must have at least 8 characters")
        // different error messages for different requirements
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
        .required(),
      confirmCurrentPassword: Yup.string()
        .required("Please re-type your password")
        .label("Confirm Password")
        .required()
        // use oneOf to match one of the values inside the array.
        // use "ref" to get the value of password.
        .oneOf([Yup.ref("currentPassword")], "Passwords do not match"),
    }),
    onSubmit: async ({ currentPassword }) => {
      try {
        const verifyPassword = await fetch("/api/verify-password", {
          method: "POST",
          body: JSON.stringify({
            id: userId,
            password: currentPassword,
          }),
        });
        const { message } = await verifyPassword.json();

        if (!verifyPassword.ok) {
          toast({
            description:
              message ??
              "There as an issue verifying this password, please try again.",
            variant: "destructive",
          });
          return;
        }
        setChangePasswordModalOpen(false);
        setChangePassword(true);
      } catch (err) {
        toast({
          description:
            "There as an issue verifying this password, please try again.",
          variant: "destructive",
        });
        console.error(err);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      name: data?.user?.name ?? serverSession.name ?? "",
      username: data?.user?.username ?? serverSession.username ?? "",
      email: data?.user?.email ?? serverSession.email ?? "",
      password: "",
      confirmPassword: "",
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
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
        .notRequired()
        .nullable(),
      confirmPassword: Yup.string()
        .required("Please re-type your password")
        .label("Confirm Password")
        // use oneOf to match one of the values inside the array.
        // use "ref" to get the value of password.
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .notRequired()
        .nullable(),
    }),
    onSubmit: async ({ username, email, password, name }) => {
      try {
        const hasUsernameChanged = formik.initialValues.username !== username;

        if (hasUsernameChanged) {
          const validUsername = await fetch(
            `https://www.purgomalum.com/service/json?text=${username}`
          );

          const validUsernameBody = await validUsername.json();

          //profanity and things of that nature
          if (username && validUsernameBody.result !== username) {
            toast({ description: "Invalid username.", variant: "destructive" });
            return;
          }
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
            setSessionLoading(true);
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

  const handleUpdateClickError = () => {
    const errors = !!Object.values(formik.errors).length
      ? Object.values(formik.errors)
      : Object.values(currentPasswordForm.errors);

    errors.map((error) =>
      toast({ description: error, variant: "destructive" })
    );
  };

  const hasFormedChanged =
    formik.initialValues.name !== formik.values.name ||
    formik.initialValues.email !== formik.values.email ||
    formik.initialValues.username !== formik.values.username ||
    formik.initialValues.password !== formik.values.password;

  const hasCurrentPasswordChanged =
    currentPasswordForm.initialValues.confirmCurrentPassword !==
      currentPasswordForm.values.confirmCurrentPassword ||
    currentPasswordForm.initialValues.currentPassword !==
      currentPasswordForm.values.currentPassword;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="my-20 max-w-lg gap-4 flex flex-col">
      {/* {!data?.user?.name && status !== "loading" && (
        <div className="space-y-2">
          <label className="text-slate-200">
            <span>Name</span>
            <input
              className="p-2 bg-black bg-opacity-40 rounded-md w-full opacity-80"
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </label>
        </div>
      )} */}
      <div className="space-y-2">
        <label className="text-slate-200 font-semibold">Username</label>
        <input
          className="p-2 bg-black bg-opacity-40 rounded-md w-full opacity-80"
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
        <div className="flex justify-between items-center">
          <label className="font-semibold">Email</label>
          {!serverSession.emailVerified && !emailJustVerified && (
            <button
              type="button"
              onClick={handleVerifyEmail}
              className="text-blue-300 underline">
              Verify
            </button>
          )}
        </div>
        <input
          className="p-2 cursor-not-allowed outline-none bg-black bg-opacity-40 rounded-md w-full opacity-80 space-y-2"
          id="email"
          name="email"
          type="email"
          readOnly
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
      </div>
      {/* server side session comes before client side session */}
      {serverSession?.passwordLength && (
        <div className="flex gap-2 justify-center items-center w-full xs:flex-row flex-col">
          <div className="flex flex-col w-full gap-2">
            <label className="font-semibold">
              {changePassword && "Enter new "}Password
            </label>
            <input
              className={classNames(
                { hidden: changePassword },
                "p-2 bg-black bg-opacity-40 rounded-md cursor-not-allowed outline-none w-full block opacity-80"
              )}
              type="password"
              readOnly
              value={"•".repeat(
                data?.user.passwordLength ?? serverSession.passwordLength
              )}></input>
            <input
              className={classNames(
                { hidden: !changePassword },
                "p-2 bg-black bg-opacity-40 rounded-md w-full block opacity-80"
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
              className="bg-black bg-opacity-40 opacity-80 w-full block rounded-md p-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
          </div>
          {!changePassword &&
            (status === "loading" ? (
              <div className="w-full h-10 max-w-[160px] animate-pulse bg-slate-200 bg-opacity-40 rounded-md self-end" />
            ) : (
              <Dialog
                open={changePasswordModalOpen}
                onOpenChange={setChangePasswordModalOpen}>
                <DialogTrigger asChild>
                  <button className="w-full h-10 max-w-[160px] hover:bg-gray-600 bg-gray-500 rounded-md self-end">
                    Change Password
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] max-w-[320px] rounded-md">
                  <DialogHeader className="text-slate-200">
                    <DialogTitle className="xs:text-base text-sm">
                      Enter your current password
                    </DialogTitle>
                    <DialogDescription className="xs:text-sm text-xs">
                      Enter and confirm your current password. Click submit when
                      you are done.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={currentPasswordForm.handleSubmit}
                    className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2 text-slate-200 ">
                      <label className="xs:text-base text-sm font-medium">
                        Password
                      </label>
                      <input
                        className="p-2 bg-opacity-20 rounded-md w-full block opacity-80 bg-slate-200"
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        onChange={currentPasswordForm.handleChange}
                        onBlur={currentPasswordForm.handleBlur}
                        value={currentPasswordForm.values.currentPassword}
                      />
                    </div>
                    <div className="flex flex-col items gap-2 text-slate-200">
                      <label className="xs:text-base text-sm font-medium">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="p-2 bg-slate-200 bg-opacity-20 text-slate-200 rounded-md w-full block opacity-80"
                        id="confirmCurrentPassword"
                        name="confirmCurrentPassword"
                        onChange={currentPasswordForm.handleChange}
                        onBlur={currentPasswordForm.handleBlur}
                        value={
                          currentPasswordForm.values.confirmCurrentPassword
                        }
                      />
                    </div>
                    <DialogFooter>
                      <button
                        disabled={
                          currentPasswordForm.isSubmitting ||
                          !hasCurrentPasswordChanged
                        }
                        onClick={handleUpdateClickError}
                        type="submit"
                        className="bg-slate-200 hover:bg-slate-300 disabled:opacity-60 xs:text-base text-sm p-2 rounded-md max-w-md w-full">
                        Submit
                      </button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            ))}
        </div>
      )}

      <button
        onClick={handleUpdateClickError}
        disabled={formik.isSubmitting || !hasFormedChanged || sessionLoading}
        type="submit"
        className={classNames(
          { "animate-pulse": sessionLoading },
          "p-2 bg-truePrimary text-slate-200 w-full rounded-md hover:opacity-80 sm:max-w-[344px] disabled:opacity-60"
        )}>
        Update
      </button>
    </form>
  );
}
