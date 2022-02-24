import { createTheme } from "@mui/material";


let theme = createTheme({
    palette: {
        primary: {
            main: '#272727' // dark grey
        },
        secondary: {
            main: '#505050' // light grey
        },
        mode: 'dark',
    },
    //custom theme variables
    background: {
        main: '#505050', // light grey
        light: '#272727' // dark grey
    },
    text: {
        main: '#ffffff', // white
        focus: '#ff0000' // red
    },
    form: {
        submit: '#2a96fc', // blue
        cancel: '#fc1983', // crimson
    },
    button: {
        edit: '#FFE649', // yellow
        delete: '#FC1983', // crimson
    },
    typography: {
        fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace',
    },
});

theme = createTheme(theme, {
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                      color: theme.text.main,
                    },
                },
            },
        },
    },
});

export default theme;