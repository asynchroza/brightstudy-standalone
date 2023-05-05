import { cookies } from "next/headers";

export const getThemeCookies = () => {
  const cookieStore = cookies();
  const themeName = cookieStore.get("themeName")?.value;
  const themeMode = cookieStore.get("themeMode")?.value;

  return { themeName, themeMode };
};
