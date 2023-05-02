import { isUndefined } from "lodash";
import { isServerSide } from "../helpers";
import { ColorTheme, StyleProps } from "./interfaces";

const validateCache = () => {
  // TODO: check if realm based themes are saved in public dir, if not -> fetch them
  // ? Should be run on log in
};

const loadTheme = (): ColorTheme => {
  // TODO: fetch theme from db using a useHook approach
  // ? how to cache user preferences. Will cache be persisted for a whole session?

  // ! mocked result
  const themeName = "default"; // realm preference
  const themeMode = "light"; // user preference

  // try to load preffered theme
  // if ^ fails, try to load default theme
  try {
    return require(`../../public/${themeName}.${themeMode}.json`) as ColorTheme;
  } catch (error) {
    console.error(error);

    // default to light mode if user preferences weren't fetched
    return require(`../../public/default.${
      isUndefined(themeMode) ? "light" : themeMode
    }`) as ColorTheme;
  }
};

export const getStyledComponentObject = (
  componentName: string
): StyleProps | undefined => {
  /**
   * This function retrieves theme-dependent styles for a specified React component.
   * @param {string} componentName - The name of the React component for which to fetch styling.
   * @return {Object} A JavaScript object containing CSS styling.
   */

  // do not run on client
  if (!isServerSide()) return;

  const theme = loadTheme();

  return theme.components[componentName];
};
