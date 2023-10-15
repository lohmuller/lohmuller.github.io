import {createTheme} from "@mui/material";

interface IBreakpoints {
    values: {
        xs: number,
        sm: number,
        md: number,
        lg: number,
        xl: number,
    }
}

interface IComponents {
    MuiContainer: {
        // eslint-disable-next-line @typescript-eslint/ban-types
        styleOverrides: {}
    },
}

interface IPalette {
    primary?: {
        main: string,
        light: string,
        hover?: string,
    },
    secondary?: {
        main: string,
        dark: string,
        bg?: string,
        stroke: string,
    },
    status?: {
        error: string,
        warning: string,
        success: string,
    },
    text?: {
        primary: string,
        muted?: string,
    },
    basic: {
        white: string,
        black: string,
    },
    background?: {
        default: string,
        paper: string,
        footer: string
    },
    success: {
        main: string,
        bg: string
    },
    error: {
        main: string,
        bg: string
    },
    warning: {
        main: string,
        bg: string
    },
    info: {
        main: string,
        bg: string
    },
    tableRow?: {
        hover?: string,
    }
}

interface ITypography {
    fontFamily: string,
}

interface ITheme {
    palette: IPalette,
    breakpoints: IBreakpoints,
    components: IComponents,
    typography?: ITypography,
}


const typography: ITypography = {
    fontFamily: [
        'Kanit',
        'sans-serif'
    ].join(','),
}

const purpleBasedPalette: IPalette = {
    primary: {
        main: "#8a2be2",
        light: "#e6d9f2",
        hover: '#b069e1'
    },
    secondary: {
        main: "#c4c4c4",
        dark: "#52525C",
        bg: "#fafafa",
        stroke: "#0f0f0f",
    },
    status: {
        error: "#ff6363",
        warning: "#fe8e31",
        success: "#00e44e",
    },
    text: {
        primary: "#000",
        muted: "#9b9b9b",
    },
    basic: {
        white: "#fff",
        black: "#000",
    },
    background: {
        default: "#fafafae1",
        paper: "#fff",
        footer: "#e9e9e9"
    },
    success: {
        main: '#00e44e',
        bg: 'rgba( 0, 228, 78, 0.2 )'
    },
    error: {
        main: '#ff6363',
        bg: 'rgba(255, 99, 99, 0.2 )'
    },
    warning: {
        main: '#fe8e31',
        bg: 'rgba( 254, 142, 49, 0.2 )'
    },
    info: {
        main: '#2196f3',
        bg: 'rgba(  117, 124, 232, 0.2 )'
    },
    tableRow: {
        hover: "#E3F2FD",
    }
}

const paletteLight: IPalette = {
    primary: {
        main: "#f75e1f",
        light: "#fef7f3",
        hover: '#f9b7a2'
    },
    secondary: {
        main: "#c4c4c4",
        dark: "#52525C",
        bg: "#fafafa",
        stroke: "#0f0f0f",
    },
    status: {
        error: "#ff6363",
        warning: "#fe8e31",
        success: "#00e44e",
    },
    text: {
        primary: "#000",
        muted: "#9b9b9b",
    },
    basic: {
        white: "#fff",
        black: "#000",
    },
    background: {
        default: "#fafafae1",
        paper: "#fff",
        footer: "#e9e9e9"
    },
    success: {
        main: '#00e44e',
        bg: 'rgba( 0, 228, 78, 0.2 )'
    },
    error: {
        main: '#ff6363',
        bg: 'rgba(255, 99, 99, 0.2 )'
    },
    warning: {
        main: '#fe8e31',
        bg: 'rgba( 254, 142, 49, 0.2 )'
    },
    info: {
        main: '#2196f3',
        bg: 'rgba(  117, 124, 232, 0.2 )'
    },
    tableRow: {
        hover: "#E3F2FD",
    }
}

const darkPalette = {
    type: 'dark',
    primary: {
        main: '#f75e1f',
        light: '#2a2a2a',
        hover: '#f9b7a2'
    },
    secondary: {
        main: '#c4c4c4',
        dark: '#52525C',
        bg: '#1E1E1E',
        stroke: '#f5f5f5',
    },
    status: {
        error: '#ff6363',
        warning: '#fe8e31',
        success: '#00e44e',
    },
    text: {
        primary: '#f5f5f5',
        muted: '#9b9b9b',
    },
    basic: {
        white: '#f5f5f5',
        black: '#1E1E1E',
    },
    background: {
        default: '#1E1E1E',
        paper: '#212121',
        footer: '#2C2C2C'
    },
    success: {
        main: '#00e44e',
        bg: 'rgba( 0, 228, 78, 0.2 )'
    },
    error: {
        main: '#ff6363',
        bg: 'rgba( 255, 99, 99, 0.2 )'
    },
    warning: {
        main: '#fe8e31',
        bg: 'rgba( 254, 142, 49, 0.2 )'
    },
    info: {
        main: '#2196f3',
        bg: 'rgba( 117, 124, 232, 0.2 )'
    },
    tableRow: {
        hover: '#1C2A3C',
    }
};

const darkPurplePalette = {
    type: 'dark',
    primary: {
        main: '#9c27b0',
        light: '#2a2a3a',
        hover: '#ce93d8'
    },
    secondary: {
        main: '#c4c4c4',
        dark: '#52525C',
        bg: '#1E1E1E',
        stroke: '#f5f5f5',
    },
    status: {
        error: '#ff6363',
        warning: '#fe8e31',
        success: '#00e44e',
    },
    text: {
        primary: '#f5f5f5',
        muted: '#9b9b9b',
    },
    basic: {
        white: '#f5f5f5',
        black: '#1E1E1E',
    },
    background: {
        default: '#1E1E1E',
        paper: '#212121',
        footer: '#2C2C2C'
    },
    success: {
        main: '#00e44e',
        bg: 'rgba( 0, 228, 78, 0.2 )'
    },
    error: {
        main: '#ff6363',
        bg: 'rgba( 255, 99, 99, 0.2 )'
    },
    warning: {
        main: '#fe8e31',
        bg: 'rgba( 254, 142, 49, 0.2 )'
    },
    info: {
        main: '#2196f3',
        bg: 'rgba( 117, 124, 232, 0.2 )'
    },
    tableRow: {
        hover: '#1C2A3C',
    }
};


const breakpoints: IBreakpoints = {
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1700,
    },
}

const components: IComponents = {
    MuiContainer: {
        styleOverrides: {
            root: {
                margin: '0 auto',
                width: '100%',
                maxWidth: 'calc(100% - 40px)',
                [`@media (min-width:920px) and (max-width:1700)`]: {
                    maxWidth: 'calc(100% - 80px)',
                    margin: '0 40px',
                },
            },
        },
    },
}


const mainTheme: ITheme = {
    palette: paletteLight,
    breakpoints,
    components,
    typography,
}

export const darkTheme: ITheme = {
    ...mainTheme,
    palette: darkPalette,
}

export const purpleTheme: ITheme = {
    ...mainTheme,
    palette: purpleBasedPalette,
}

export const purpleTheme_: ITheme = {
    ...mainTheme,
    palette: darkPurplePalette,
}


const theme = createTheme(mainTheme);
const secondTheme = createTheme(darkTheme);
const purpleThemeLight = createTheme(purpleTheme);
const purpleThemeDark = createTheme(purpleTheme_);

export const getThemeMode = (chooseTheme: 0 | 1 | 2 | 3) => {
    switch (chooseTheme) {
        case 0:
            return theme;
        case 1:
            return secondTheme;
        case 2:
            return purpleThemeLight;
        case 3:
            return purpleThemeDark;
        default:
            return theme;
    }
}
export default theme;






