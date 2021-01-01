import { Dialog, DialogContent, Button, Slide, AppBar, Toolbar, Typography, FormControl, Box, TextField, CircularProgress, IconButton, FormControlLabel, Grid, Switch, Divider } from '@material-ui/core';
import { Image } from '@material-ui/icons';

import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { generalStyles } from '../../styles/mui/generalStyles';
import { makeStyles } from '@material-ui/core/styles';
import { convertPrice } from '../../helpers/price/priceHelper';
import { useForm, Controller } from 'react-hook-form';

import { sendEmail } from '../../backend/productsRepository';
import { showGeneralAlertError, SuccessSnackbar } from '../../components/alert/alerts';

const screenStyles = makeStyles(theme => ({
    productImage: {
        margin: '16px'
    },
    image: {
        width: '100%'
    },
    productInfo: {
        fontSize: '18px'
    },
    divider: {
        background: "#333333"
    },
    productDescription: {
        margin: '0.5em 2.5em',
        textAlign: 'left'
    },
    formItem: {
        width: '60%',
        margin: '16px'
    }
}));

function ProductDetailsScreen(props) {
    const styles = generalStyles();
    const productDetailsScreenStyles = screenStyles();
    const history = useHistory();
    const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();
    const [isInProgress, setIsInProgress] = useState(false);
    const [isSuccessSnackbarVisible, setSuccessSnackbarVisibility] = useState(false);

    const productData = history.location.state.product;

    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');

    const sendMessage = async (data) => {
        try {
            setIsInProgress(true);
            await sendEmail({
                recEmail: productData.ownerEmail,
                subject: data.subject,
                message: data.message
            });
            setSuccessSnackbarVisibility(true);
            reset();
        } catch (e) {
            showGeneralAlertError(e.error);
        } finally {
            setIsInProgress(false);
        }
    }

    return (
        <Grid container spacing={3} alignItems="center" justify="center">
            <Grid item xs={12} className={`${styles.centerChildren} ${productDetailsScreenStyles.productImage}`}>
                {productData.imageUrl != null
                    ? <img src={productData.imageUrl} />
                    : <Image className={productDetailsScreenStyles.customImage} />}
            </Grid>
            <Grid item xs={12} className={`${styles.centerChildren} ${productDetailsScreenStyles.productInfo}`}><b>Nazwa:</b> {productData.name}</Grid>
            <Grid item xs={12} className={`${styles.centerChildren} ${productDetailsScreenStyles.productInfo}`}><b>Cena:</b> {convertPrice(productData.price)}</Grid>
            <Grid item xs={12} className={`${styles.centerChildren} ${productDetailsScreenStyles.productInfo}`}><b>Sprzedawca: </b>{productData.ownerEmail}</Grid>
            <Grid item xs={12}> <Divider className={productDetailsScreenStyles.divider} variant="middle" /> </Grid>
            <Grid item xs={12} className={`${styles.centerChildren} ${productDetailsScreenStyles.productDescription}`}>
                {productData.description}
            </Grid>
            <Grid item xs={12}> <Divider className={productDetailsScreenStyles.divider} variant="middle" /> </Grid>
            <Grid item xs={12} className={styles.centerChildren}>Kontakt ze sprzedawcą</Grid>
            { isUserLoggedIn != null &&
                <Grid item xs={12} className={styles.centerChildren}>

                    <form onSubmit={handleSubmit(sendMessage)}>
                        <Grid item xs={12}>
                            <FormControl className={styles.margin} variant="standard" className={productDetailsScreenStyles.formItem}>
                                <Controller
                                    name="subject"
                                    as={
                                        <TextField
                                            id="subject"
                                            helperText={fieldsErrors.subject ? fieldsErrors.subject.message : null}
                                            variant="standard"
                                            label="Temat"
                                            error={fieldsErrors.subject !== undefined}
                                            InputProps={{
                                                className: styles.input
                                            }} />
                                    }
                                    control={control}
                                    defaultValue={`Pytanie o produkt: ${productData.name}`}
                                    rules={{
                                        required: 'Pole wymagane',
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl className={styles.margin} variant="standard" className={productDetailsScreenStyles.formItem}>
                                <Controller
                                    name="message"
                                    as={
                                        <TextField
                                            id="message"
                                            helperText={fieldsErrors.message ? fieldsErrors.message.message : null}
                                            variant="standard"
                                            label="Wiadomość"
                                            error={fieldsErrors.message !== undefined}
                                            multiline
                                            InputProps={{
                                                className: styles.input
                                            }}
                                        />
                                    }
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                        required: 'Pole wymagane',
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} className={`${styles.centerChildren} ${styles.margin}`}>
                            {isInProgress && <CircularProgress />}
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" className={styles.margin}>
                                Wyślij
                         </Button>
                        </Grid>
                    </form>
                </Grid>
            }
            <SuccessSnackbar open={isSuccessSnackbarVisible} onClose={() => setSuccessSnackbarVisibility(false)} alertText="Wiadomość została wysłana!" />
        </Grid>
    );
}

export default ProductDetailsScreen;