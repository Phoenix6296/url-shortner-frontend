export const ACCESS_TOKEN_KEY = "access_token";

export const URL_REGEX =
  /^(https?:\/\/)?(([a-z\d]([a-z\d-]*[a-z\d])*\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(?::\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;

export const SIGNUP_INITIAL_FORM_VALUE = {
  full_name: "",
  email: "",
  password: "",
  confirm_password: "",
};
export const LOGIN_INITIAL_FORM_VALUE = {
  email: "",
  password: "",
};
