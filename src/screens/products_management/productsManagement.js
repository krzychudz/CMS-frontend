import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Box from "@material-ui/core/Box";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
  }));


function ProducstManagement() {

    const classes = useStyles();

    return (
        <Fab color = "primary" className={classes.fab}>
            <AddIcon />
        </Fab>
    );
}

export default ProducstManagement;