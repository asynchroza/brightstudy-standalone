import { isNull } from "lodash"

/*
    Theme template:

    {
        "themeName": "default.light",
        "global": {
            "backgroundColor": "blue"
        },
        "components": {
            "GalleryComponent": {
                "backgroundColor": "white"
            }
        }
    }


*/

interface StyleProps {
    [key: string]: string | number
}

interface ColorTheme {
    themeName: string, 
    global: StyleProps,
    components: StyleProps 
}

const fetchTheme = (): ColorTheme => {
    // checks if theme properties are set in localStorage
    // otherwise, fetch them from DB and set them

    if(isNull(localStorage.getItem("colorTheme"))){
        // TODO: fetch colorTheme for realm from DB
        localStorage.setItem("colorTheme", "default")
    }


    if(isNull(localStorage.getItem("colorMode"))){
        if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
            localStorage.setItem("colorMode", "dark")
        } else {
            localStorage.setItem("colorMode", "light")
        }
    }

    const themeName = localStorage.getItem('colorTheme')
    const themeMode = localStorage.getItem('colorMode')

    try {
        const theme = require(`../../public/${themeName}.${themeMode}.json`)
        return theme;
    } catch (error) {
        console.error(error);
        return {themeName: '', global: {}, components: {}} as ColorTheme;
    }
}

export const getStyledComponentObject = (componentName: string): Object => {
    // gets object which stores the styling for a specific component
    if (typeof window === "undefined") return {}
    const theme = fetchTheme();

    return theme.components[componentName]
}

const getGlobalStyling = () => {
    // validateCache();
    // gets object which stores the global styling for the chosen theme 

}