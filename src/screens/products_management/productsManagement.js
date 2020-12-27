import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Container from "@material-ui/core/Container";
import CircularProgress from '@material-ui/core/CircularProgress';
import ProductManagementDialog from '../../components/dialog/productManagementDialog';

import { SuccessSnackbar } from '../../components/alert/alerts';
import { getUsersProducts } from '../../backend/productsRepository';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
  }));


function ProducstManagement() {

    const classes = useStyles();
    const [isInProgress, setInProgress] = useState(false);
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

    const [open, setOpen] = useState(false);

    const onProductAdded = data => {
        setShowSuccessSnackbar(true);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(async () => {
        setInProgress(true);
        try {
            let response = await getUsersProducts();
            console.log(response.data);
        } catch (e) {
            console.log(e);
        } finally {
            setInProgress(false);
        }
    }, []);

    return (
        <Container>
            <Fab color = "primary" className={classes.fab} onClick = { handleClickOpen }>
                <AddIcon />
            </Fab>
            {isInProgress && 
                <CircularProgress />
            }
            <ProductManagementDialog open = { open } handleClose = { handleClose } isInEditMode = {false} onProductAdded = {onProductAdded} />
            <SuccessSnackbar open = {showSuccessSnackbar} onClose = {() => setShowSuccessSnackbar(false)} alertText = "Produkt został pomyślnie dodany!" />
        </Container> 
    );
}

export default ProducstManagement;