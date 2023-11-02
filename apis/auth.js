import { postData } from "@/lib/services";
import toast from "react-hot-toast";

export const handleSignup = async ({ name, email, password, onClose }) => {
  try {
    const response = await postData("/auth/signup", { name, email, password });
    if (response.status === 201) {
      toast.success(`Welcome ${name.split(" ")[0]}!`);
      onClose();
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const handleLogin = async ({ email, password, onClose }) => {
  try {
    const response = await postData("/auth/login", { email, password });
    if (response.status === 200) {
      const name = response.data.name;
      toast.success(`Welcome ${name.split(" ")[0]}!`);
      onClose();
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};
