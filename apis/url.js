import { getData, postData } from "@/lib/services";
import toast from "react-hot-toast";

export const handleGenerateURL = async (url) => {
  const urlRegex =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if (!urlRegex.test(url)) toast.error("Invalid URL");
  await postData("/url", { url });
  toast.success("URL shortened successfully");
};

export const showAllURLs = async (setAllURLs) => {
  const response = await getData("/url");
  setAllURLs(response.data);
};
