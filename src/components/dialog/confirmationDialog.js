import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import { generalStyles } from '../../styles/mui/generalStyles';

function ConfirmationDialog(props) {
    const styles = generalStyles();

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                style: {
                    backgroundColor: "#121212",
                },
             }}>
            <DialogTitle id="alert-dialog-title" className = {styles.text}>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div className = {styles.text}>{props.description}</div>
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