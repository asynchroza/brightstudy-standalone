import { isUndefined } from "lodash";

import { isServerSide } from "../helpers";
import { ColorTheme, StyleProps, ThemePreferences } from "./interfaces";
import { getThemeCookies } from "./cookieFetcher";

// TODO: define descriptions for all functions which might be used externally

const validateCache = () => {
  // TODO: check if realm based themes are saved in public dir, if not -> fetch them
  // ? Should be run on log in
};

/**
 * Load theme preferences for the realm and the user
 * @summary realm preferences define the selected theme (theme name) and user preferences define the theme mode (e.g. light or dark).
 * @param {string} user - TO BE DEFINED -> a way to define queried user. Pass realm as param as well?
 * @return {ThemePreferences} theme preferences
 */

const loadTheme = (
  themeName: string | undefined,
  themeMode: string | undefined
): ColorTheme => {
  // try to load preffered theme
  // if ^ fails, try to load default theme
  try {
    return require(`../../public/themes/${themeName}.${themeMode}.json`) as ColorTheme;
  } catch (error) {
    console.error(error);

    // default to light mode if user preferences weren't fetched
    return require(`../../public/themes/default.${
      isUndefined(themeMode) ? "light" : themeMode
    }.json`) as ColorTheme;
  }
};

/**
 * This function retrieves theme-dependent styles for a specified React component.
 * @param {string} componentName - The name of the React component for which to fetch styling.
 * @return {Object} A JavaScript object containing CSS styling.
 */
export const getStyledComponentObject = (
  componentName: string
): StyleProps | undefined => {
  // do not run on client
  if (!isServerSide()) return;

  const { themeName, themeMode } = getThemeCookies();

  const theme = loadTheme(themeName, themeMode);

  return theme.components[componentName];
};
