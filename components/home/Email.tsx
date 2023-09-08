"use client";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Image from "next/image";
import classnames from "classnames";

export default function Email() {
  const [animateSend, setAnimateSend] = useState(false);

  const handleReset = () => {
    setAnimateSend(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async ({ email }) => {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const { error } = await res.json();
      if (error) {
        formik.setErrors({ email: "An error occurred please try again." });
      } else {
        setAnimateSend(true);
        setTimeout(() => handleReset(), 5000);
      }
    },
  });

  const variants = {
    initial: { opacity: 1, x: 0 },
    sent: { opacity: 0, x: 800, y: -600 },
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 1.5 }}
      className="relative w-full max-w-[300px]"
      onSubmit={formik.handleSubmit}
    >
      <label hidden>Email</label>
      <input
        className="p-1 rounded-2xl placeholder:text-slate-200 focus:outline-none pl-4 placeholder:opacity-50 mt-4 bg-neutral-500 bg-opacity-20 w-full"
        placeholder="Enter your email"
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email &&
        formik.errors.email &&
        formik.submitCount > 0 && (
          <p className="text-red-200 text-sm mt-4">{formik.errors.email}</p>
        )}
      {animateSend && (
        <p className="text-primary text-sm mt-4 font-semibold">
          Thank you for joining!
        </p>
      )}
      <motion.img
        alt="paper plane icon"
        src="/icons/paper-plane.svg"
        className={`mx-auto w-4 h-4 absolute right-1 top-5 ${
          animateSend ? "block" : "hidden"
        }`}
        animate={animateSend ? "sent" : "initial"}
        transition={{ duration: 15 }}
        variants={variants}
      />
      <button
        type="submit"
        disabled={animateSend || formik.isSubmitting}
        className="items-center justify-center absolute top-4 right-0 rounded-full text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none ring-offset-background-primary bg-primary text-primary-foreground hover:bg-primary/90 h-8 w-8 email-button group mx-auto overflow-hidden p-[1px] font-bold transition-all duration-300 block dark:hover:shadow-[0_0_2rem_-0.5rem_#fff8] md:mr-0 lg:mr-auto"
      >
        <span
          className={classnames(
            "inline-flex h-full w-fit items-center rounded-xl p-2 transition-all duration-300 bg-neutral-900 group-hover:bg-black",
            { "w-full": animateSend }
          )}
        >
          <Image
            alt="paper plane icon"
            src="/icons/paper-plane.svg"
            className={classnames({
              hidden: animateSend,
              "w-4 h-4": animateSend,
            })}
            width={16}
            height={16}
          />
        </span>
      </button>
    </motion.form>
  );
}
