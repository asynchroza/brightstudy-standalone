import { getUser, setThemeCookies } from './cookieManager'

export const fetchUserTheme = () => {
    const user = getUser()

    // TODO: fetch user theme from db
    const resp = { themeName: 'test', themeMode: 'dark' }

    setThemeCookies(resp.themeName, resp.themeMode as THEME_MODE)
}
