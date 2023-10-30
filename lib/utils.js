import { clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const copyToClipboard = (text, message) => {
  navigator.clipboard.writeText(text);
  toast.success(message);
};
