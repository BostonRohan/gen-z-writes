import { ReactNode } from "react";

export default function Input({
  type,
  children,
  label,
}: {
  type?: "email";
  children?: string | null;
  label: string;
}) {
  return (
    <label className="text-slate-200 space-y-2">
      <span>{label}</span>
      <input
        className="p-2 bg-black bg-opacity-10 rounded-md w-full"
        type={type ?? "text"}
        placeholder={children ?? ""}
      ></input>
    </label>
  );
}
