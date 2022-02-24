import { useAppDispatch } from '../app/hooks';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    // StyledSimpleButton,
    StyledRichBoxHeader,
    StyledReturnActionsButtons,
    StyledFurtherActionsButtons,
    StyledRichBoxTitle } from '../styles/styledComponents';
import IconButton from '@mui/material/IconButton';

interface RichBoxHeaderProps {
    props: {
        title?: string,
        actions?: {
            returnActions?: {
                backButton?: {
                    action: any,
                    color: string,
                },
                closeButton?: {
                    action: any,
                    color: string,
                },
            },
            furtherActions?: {
                editButton?: {
                    action: any,
                    color: string,
                },
                deleteButton?: {
                    action: any,
                    color: string,
                },
            },
        },
    },
};

const defaultRichBoxHeaderProps: RichBoxHeaderProps = {
    'props': {
        'title': '',
        'actions': {
            'returnActions': undefined,
            'furtherActions': undefined,
        },
    },
};

const RichBoxHeader = ({props}: RichBoxHeaderProps) => {

    const dispatch = useAppDispatch();

    const richBoxHeaderProps = { ...defaultRichBoxHeaderProps, ...props}
    
    return (
        <StyledRichBoxHeader>
            {richBoxHeaderProps.actions && richBoxHeaderProps.actions.returnActions &&
                <StyledReturnActionsButtons>
                    {richBoxHeaderProps.actions.returnActions.backButton && richBoxHeaderProps.actions.returnActions.backButton.action && 
                        <IconButton aria-label="back" onClick={() => {dispatch(richBoxHeaderProps!.actions!.returnActions!.backButton!.action())}} sx={{ color: richBoxHeaderProps.actions.returnActions.backButton.color }}>
                            <ArrowBackIcon />
                        </IconButton>
                    }
                    {richBoxHeaderProps.actions.returnActions.closeButton && richBoxHeaderProps.actions.returnActions.closeButton.action && 
                        <IconButton aria-label="close" onClick={() => {dispatch(richBoxHeaderProps!.actions!.returnActions!.closeButton!.action())}} sx={{ color: richBoxHeaderProps.actions.returnActions.closeButton.color }}>
                            <CloseIcon />
                        </IconButton>
                    }
                </StyledReturnActionsButtons>
            }
            <StyledRichBoxTitle>{richBoxHeaderProps.title}</StyledRichBoxTitle>
            {richBoxHeaderProps.actions && richBoxHeaderProps.actions.furtherActions &&
                <StyledFurtherActionsButtons>
                    {richBoxHeaderProps.actions.furtherActions.editButton && richBoxHeaderProps.actions.furtherActions.editButton.action && 
                        <IconButton aria-label="edit" onClick={richBoxHeaderProps.actions!.furtherActions!.editButton!.action} sx={{ color: richBoxHeaderProps.actions.furtherActions.editButton.color }}>
                            <EditIcon />
                        </IconButton>
                    }
                    {richBoxHeaderProps.actions.furtherActions.deleteButton && richBoxHeaderProps.actions.furtherActions.deleteButton.action && 
                        <IconButton aria-label="delete" onClick={richBoxHeaderProps.actions!.furtherActions!.deleteButton!.action} sx={{ color: richBoxHeaderProps.actions.furtherActions.deleteButton.color }}>
                            <DeleteIcon />
                        </IconButton>
                    }
                </StyledFurtherActionsButtons>
            }
        </StyledRichBoxHeader>
    );

};

export default RichBoxHeader;