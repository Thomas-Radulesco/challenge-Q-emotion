import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import Box, { BoxProps } from '@mui/material/Box';
import styled from 'styled-components';
import { darken } from '@mui/material/styles';

export const StyledFabAddFormButton = styled(Fab) `
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1;
`;

export const StyledSubmitFormButton = styled(LoadingButton)<LoadingButtonProps>(({ theme } : { theme: any}) => ({
    backgroundColor: theme.form.submit,
    color: theme.text.main,
    fontWeight: 700,
    fontSize: "1.1rem",
    '&:hover' : {
        backgroundColor: darken(theme.form.submit, 0.3)
    },
}));

export const StyledFabSearchFormButton = styled(StyledFabAddFormButton) `
    top: 7rem;
`;

export const StyledAddFormBox = styled(Box)<BoxProps>(() => ({
    position: "fixed",
    top: "1rem",
    left: "2rem",
    boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
    padding: "1rem 2rem 2rem 2rem",
    marginRight: "2rem",
    zIndex: 1,
}));

export const StyledSearchFormBox = styled(StyledAddFormBox) `
    top: 7rem;
`;

export const StyledTextField = styled(TextField) `
    margin-top: 1rem;
`;

export const StyledDeleteIconButton = styled(IconButton) `
    color : ${(props: any) => props.theme.button.delete};
`;

export const StyledEditIconButton = styled(IconButton) `
    color : ${(props: any) => props.theme.button.edit};
`;

export const StyledRichBoxHeader = styled(Box) `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const StyledReturnActionsButtons = styled(Box) `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items : center;
    position: absolute;
    left: 0.5rem;
`; 

export const StyledFurtherActionsButtons = styled(Box) `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items : center;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
`; 

export const StyledRichBoxTitle = styled(Box) `
    font-size: 1.2rem;
    font-weight: 700;
`;
