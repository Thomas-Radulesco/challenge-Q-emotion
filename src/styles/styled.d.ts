import '../..node_modules/styled-components';
import { Theme } from '@mui/material/styles';

interface CustomTheme {
    background: {
        main: string,
        light: string
    },
    text: {
        main: string,
        focus: string
    },
    form: {
        submit: string,
        cancel: string,
    },
    button: {
        edit: string,
        delete: string,
    },

};

declare module '@mui/material/styles' {
    interface Theme extends CustomTheme {}
    interface ThemeOptions extends CustomTheme {}
};

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}