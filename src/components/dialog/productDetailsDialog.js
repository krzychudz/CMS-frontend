import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';
import { Image } from '@material-ui/icons';

import { generalStyles } from '../../styles/mui/generalStyles';
import { convertPrice } from '../../helpers/price/priceHelper';

import { makeStyles } from '@material-ui/core/styles';

export const dialogStyles = makeStyles({
    dialogTitle: {
        padding: 0
    },
    dialogProductInfo: {
        textAlign: 'center',
        padding: '16px'
    },
    dialogProductImage: {
        maxWidth: '100%'
    }
});

function ProductDetailslDialog(props) {
    const styles = generalStyles();
    const classes = dialogStyles();
    const { product } = props;

    if (product == null) return (<div></div>);

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            scroll="paper"
            PaperProps={{
                style: {
                    backgroundColor: "#121212",
                },
            }}>
            <DialogTitle className={`${classes.dialogTitle}`}>
                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        {product.imageUrl == null
                            ? <Image className={styles.dialogImage} />
                            : <img src={product.imageUrl} className={classes.dialogProductImage} />}
                    </Grid>
                    <Grid item xs={8} className={`${styles.text} ${classes.dialogProductInfo}`}>
                        <Grid item xs={12}> <b>Nazwa:</b> {product.name} </Grid>
                        <Grid item xs={12}> <b>Cena:</b> {convertPrice(product.price)} </Grid>
                    </Grid>
                </Grid>
            </DialogTitle>

            <DialogContent className={styles.text}>

                <DialogContentText
                    id="scroll-dialog-description"
                    className={styles.text}
                    tabIndex={-1}>
                    <div className={styles.text}>
                        {product.description}
                    </div>
                </DialogContentText>
            </DialogContent>

            {props.isPreviewMode ? null :
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Dodaj do koszyka
                </Button>
                </DialogActions>
            }
        </Dialog>

    );
}

export default ProductDetailslDialog;