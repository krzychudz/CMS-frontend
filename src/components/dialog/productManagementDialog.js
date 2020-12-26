import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    dialog: {
        background: '#232323',
      },
}));


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function ProductManagementDialog(props) {
    const classes = useStyles();

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullScreen
            TransitionComponent={Transition}>

            <AppBar className={classes.appBar} color = "primary">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.isInEditMode ? "Edytuj Produkt" : "Dodaj nowy produkt"}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={props.handleClose}>
                    {props.isInEditMode ? "Zapisz" : "Dodaj"}
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent className = {classes.dialog}>
                <DialogContentText>Text</DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default ProductManagementDialog;