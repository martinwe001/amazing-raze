import Cookies from "js-cookie";

export const setCookie = (code: string) => {
  Cookies.set("amazingraze", code, { expires: 7 });
};

export const getCookie = (): string | undefined => {
  return Cookies.get("amazingraze");
};
