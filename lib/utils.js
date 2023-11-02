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

export const addProtocol = (url) => {
  if (!url.startsWith("http://") && !url.startsWith("https://"))
    return `https://${url}`;
};

export const removeProtocol = (url) => {
  if (url.startsWith("https://")) return url.replace("https://", "");
  if (url.startsWith("http://")) return url.replace("http://", "");
};

export const removeValidationError = (errors) => {
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });
};

export const firstName = (string) => {
  return string?.split(" ")[0];
};

export const capitalize = (string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};
