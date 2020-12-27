import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function SuccessSnackbar(props) {
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose = {props.onClose}>
            <Alert severity="success">
                {props.alertText}
            </Alert>
        </Snackbar>
    );
}