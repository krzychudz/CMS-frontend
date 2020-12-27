import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

function ConfirmationDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.description}
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.negativeButtonCallback} color="primary">
                    {props.negativeButton}
          </Button>
                <Button onClick={props.positiveButtonCallback} color="primary" autoFocus>
                    {props.positiveButton}
          </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;