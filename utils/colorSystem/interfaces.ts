export interface StyleProps {
    [key: string]: string | number
}

export interface Components {
    [key: string]: StyleProps
}

export interface ColorTheme extends Object {
    themeName: string
    global: StyleProps
    components: Components
}

export interface ThemePreferences {
    themeName: string | undefined
    themeMode: THEME_MODE.LIGHT | THEME_MODE.DARK | undefined
}
