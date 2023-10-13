import { postData } from "@/lib/services";

export const handleGenerateURL = async (url) => {
  return postData("/url", { url });
};
