import { isNil, isUndefined } from 'lodash'

import { isServerSide } from '../helpers'
import { ColorTheme, StyleProps } from './interfaces'
import { getThemeCookies } from './cookieManager'
import { fetchUserTheme } from './databaseManager'

/**
 * Load color theme
 * @return {ColorTheme} returns the loaded theme if successful
 */
const loadTheme = (): ColorTheme | undefined => {
    if (!isServerSide()) return undefined

    const { themeName, themeMode } = getThemeCookies()

    if (isNil(themeName)) {
        const themePreferences = fetchUserTheme()
        console.log(themePreferences)
    }

    try {
        return require(`../../public/themes/${themeName}.${themeMode}.json`) as ColorTheme
    } catch (error) {
        console.warn('Failed loading user preferred theme.')

        // default to light mode if user preferences weren't fetched
        return require(`../../public/themes/default.${isUndefined(themeMode) ? 'light' : themeMode}.json`) as ColorTheme
    }
}

/**
 * This function retrieves theme-dependent styles for a specified React component.
 * @param {string} componentName - The name of the React component for which to fetch styling.
 * @return {Object} A JavaScript object containing CSS styling.
 */
export const getStyledComponentObject = (componentName: string): StyleProps | undefined => {
    const theme = loadTheme()
    console.log(theme)
    return theme?.components[componentName]
}
