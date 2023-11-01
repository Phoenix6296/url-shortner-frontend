import { URL_REGEX } from "@/lib/constant";
import { getData, postData } from "@/lib/services";
import { addProtocol } from "@/lib/utils";
import toast from "react-hot-toast";

export const handleGenerateURL = async (url) => {
  if (!URL_REGEX.test(url)) throw new Error("Invalid URL");
  url = addProtocol(url);
  await postData("/url", { url });
  toast.success("URL shortened successfully");
};

export const showAllURLs = async (setAllURLs) => {
  const response = await getData("/url");
  setAllURLs(response.data);
};
