import { getUser, setThemeCookies } from './cookieManager'
import { ThemePreferences } from './interfaces'

export const fetchUserTheme = (): ThemePreferences => {
    const user = getUser()
    // TODO: fetch user theme from db
    const resp = { themeName: 'test', themeMode: 'dark' } as ThemePreferences

    setThemeCookies(resp)

    return resp
}
