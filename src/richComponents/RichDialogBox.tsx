import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { darken } from '@mui/material/styles';


interface RichDialogBoxProps {
    props: {
        open: boolean,
        setOpen: any,
        title: string,
        text: string,
        actions: {
            yesAction?: {
                bgColor: string,
                color: string,
                buttonText: string,
                handler: any,
            },
            noAction?: {
                bgColor: string,
                color: string,
                buttonText: string,
                handler: any,
            },
        },
    },
};

const defaultRichDialogBoxProps: RichDialogBoxProps = {
    'props': {
        'open': false,
        'setOpen': () => {},
        'title': 'Dialogue',
        'text': 'Ceci est une boîte de dialogue',
        'actions': {
            'yesAction': undefined,
            'noAction': undefined,
        },
    },
};


const RichDialogBox = ({props}: RichDialogBoxProps) => {
    
    const richDialogBoxProps = { ...defaultRichDialogBoxProps, ...props}
    
    const handleClose = () => {
        richDialogBoxProps.setOpen(false);
    };

return (
    <div>
      <Dialog
        open={richDialogBoxProps.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {richDialogBoxProps.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {richDialogBoxProps.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions
            sx={{
                display: "flex",
                justifyContent: Object.keys(richDialogBoxProps.actions).length > 1 ? 'space-around':'flex-end',
            }}
        >
            {richDialogBoxProps.actions.noAction &&
                <Button
                    onClick={richDialogBoxProps.actions.noAction?.handler}
                    variant="contained"
                    sx={{
                        backgroundColor: richDialogBoxProps.actions.noAction?.bgColor,
                        color: richDialogBoxProps.actions.noAction?.color,
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        '&:hover' : {
                            backgroundColor: darken(richDialogBoxProps.actions.noAction?.bgColor, 0.3)
                        },
                    }}>

                    {richDialogBoxProps.actions.noAction?.buttonText}
                </Button>
            }
            {richDialogBoxProps.actions.yesAction &&
                <Button 
                    onClick={richDialogBoxProps.actions.yesAction?.handler}
                    autoFocus
                    variant="contained"
                    sx={{
                        backgroundColor: richDialogBoxProps.actions.yesAction?.bgColor,
                        color: richDialogBoxProps.actions.yesAction?.color,
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        '&:hover' : {
                            backgroundColor: darken(richDialogBoxProps.actions.yesAction?.bgColor, 0.3)
                        },
                    }}>

                    {richDialogBoxProps.actions.yesAction?.buttonText}
                </Button>
            }
        </DialogActions>
      </Dialog>
    </div>
)

};

export default RichDialogBox;