import { cookies } from 'next/headers'
import { ThemePreferences } from './interfaces'

/**
 * This function retrieves cookies that define the user's preferred theme settings
 * @return {ThemePreferences} if the cookies exist, it returns an object containing the `theme name` and `mode`. Otherwise, it returns `undefined`.
 */
export const getThemeCookies = (): ThemePreferences => {
    const cookieStore = cookies()
    const themeName = cookieStore.get('themeName')?.value
    const themeMode = cookieStore.get('themeMode')?.value as THEME_MODE.LIGHT | THEME_MODE.DARK

    return { themeName, themeMode }
}
