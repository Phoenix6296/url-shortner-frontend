import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};
