import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CircularProgress from '@material-ui/core/CircularProgress';

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
            <Fab color = "primary" className={classes.fab}>
                <AddIcon />
            </Fab>
            {isInProgress && 
                <CircularProgress />
            }
        </Container>
    );
}

export default ProducstManagement;