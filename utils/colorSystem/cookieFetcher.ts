import { cookies } from 'next/headers'

//TODO: Load preferences if cookies are empty, setCookie as well

export const getThemeCookies = () => {
    const cookieStore = cookies()
    const themeName = cookieStore.get('themeName')?.value
    const themeMode = cookieStore.get('themeMode')?.value

    return { themeName, themeMode }
}
