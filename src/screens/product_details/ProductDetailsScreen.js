import { Button, FormControl, TextField, CircularProgress, IconButton, Grid, Divider } from '@material-ui/core';
import { ContactMail } from '@material-ui/icons';

import { useHistory } from "react-router-dom";
import { useState, useRef } from 'react';
import { generalStyles } from '../../styles/mui/generalStyles';
import { convertPrice } from '../../helpers/price/priceHelper';
import { useForm, Controller } from 'react-hook-form';

import { sendEmail } from '../../backend/productsRepository';
import { showGeneralAlertError, SuccessSnackbar } from '../../components/alert/alerts';

import MUIRichTextEditor from 'mui-rte'

import productDetailsScreenStyles from './styles/productDetailsScreenStyles';
import previewModeRichTextTheme from './styles/richTextTheme';
import { MuiThemeProvider } from '@material-ui/core/styles'



function ProductDetailsScreen() {
    const styles = generalStyles();
    const screenStyles = productDetailsScreenStyles();
    const history = useHistory();
    const formRef = useRef(null);

    const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();
    const [isInProgress, setIsInProgress] = useState(false);
    const [isSuccessSnackbarVisible, setSuccessSnackbarVisibility] = useState(false);

    const productData = history.location.state.product;
    const previewMode = history.location.state.previewMode;

    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
    const currentUserEmail = localStorage.getItem('currentUserEmail');

    const scrollToForm = () => formRef.current.scrollIntoView()

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
            showGeneralAlertError(e.message);
        } finally {
            setIsInProgress(false);
        }
    }

    return (
        <Grid container spacing={3} alignItems="center" justify="center">
            <Grid item xs={12} className={`${styles.centerChildren} ${screenStyles.productImage}`}>
                {productData.imageUrl != null &&
                    <img src={productData.imageUrl} alt={"Product"} />
                }
            </Grid>
            <Grid item xs={12} className={`${styles.centerChildren} ${screenStyles.productInfo}`}><b>Nazwa:</b> {productData.name}</Grid>
            <Grid item xs={12} className={`${styles.centerChildren} ${screenStyles.productInfo}`}><b>Cena:</b> {convertPrice(productData.price)}</Grid>
            <Grid item xs={12} className={`${styles.centerChildren} ${screenStyles.productInfo}`}>
                <b>Sprzedawca: </b>{productData.ownerEmail} {(currentUserEmail != null && currentUserEmail !== productData.ownerEmail && !previewMode) && <IconButton className={screenStyles.icon} onClick={scrollToForm}> <ContactMail /> </IconButton>}
            </Grid>
            <Grid item xs={12}> <Divider className={screenStyles.divider} variant="middle" /> </Grid>
            <Grid item xs={12} className={`${styles.centerChildren} ${screenStyles.productDescription}`}>
                {JSON.parse(productData.description).blocks[0].text.length === 0
                    ? <div>Brak opisu</div>
                    : <MuiThemeProvider theme={previewModeRichTextTheme}> 
                        <MUIRichTextEditor
                            defaultValue={JSON.parse(productData.description).blocks[0].text.length !== 0 && productData.description}
                            readOnly={true}
                            inheritFontSize={true}
                            controls={[]}
                    />
                    </MuiThemeProvider>
                }
            </Grid>
            <Grid item xs={12}> <Divider className={screenStyles.divider} variant="middle" /> </Grid>
            { (!previewMode && currentUserEmail != null && currentUserEmail !== productData.ownerEmail) &&
                <Grid item xs={12} className={styles.centerChildren}>Kontakt ze sprzedawcą</Grid>
            }
            { (!previewMode && currentUserEmail != null && currentUserEmail !== productData.ownerEmail) &&
                <Grid item xs={12} className={styles.centerChildren} ref={formRef}>

                    <form onSubmit={handleSubmit(sendMessage)}>
                        <Grid item xs={12}>
                            <FormControl className={`${styles.margin} ${screenStyles.formItem}`} variant="standard">
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
                            <FormControl className={`${styles.margin} ${screenStyles.formItem}`} variant="standard">
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