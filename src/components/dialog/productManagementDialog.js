import { Dialog, DialogContent, Button, Slide, AppBar, Toolbar, Typography, FormControl, Box, TextField, CircularProgress, IconButton, FormControlLabel, Grid, Switch } from '@material-ui/core';
import { Close as CloseIcon, Image } from '@material-ui/icons';

import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef, useState } from 'react';
import { generalStyles } from '../../styles/mui/generalStyles';
import { showGeneralAlertError } from '../alert/alerts';

import { addProduct } from '../../backend/productsRepository';

import 'firebase/storage';
import firebaseApp from '../../firebaseConfig';

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
    container: {
        padding: '16px',
        width: '100%'
    },
    margin: {
        margin: '16px',
        width: "100%"
    },
    imageLoader: {
        margin: '22px 0 0 0'
    },
    imageIcon: {
        color: "white",
        width: "120px",
        height: "120px",
        padding: "6px"
    }
}));


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function ProductManagementDialog(props) {
    const classes = useStyles();
    const styles = generalStyles();

    const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();
    const [isPublished, setIsPublished] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [isInProgress, setInProgress] = useState(false);

    const clearDialogData = () => {
        setImageUrl(null);
        setIsPublished(false);
    }

    const clearAndClose = () => {
        clearDialogData();
        props.handleClose();
    }

    const onCreateProductClicked = async data => {
        try {
            setInProgress(true);
            let response = await addProduct({
                name: data.name,
                description: data.description,
                price: data.price,
                isPublished: isPublished,
                imageUrl: imageUrl
            });

            clearDialogData();
            props.onProductAdded(response.data);
            props.handleClose();
        } catch (e) {
            showGeneralAlertError(e.error);
        } finally {
            setInProgress(false);
        }
    }

    const handleSwitchStateChange = () => {
        setIsPublished(!isPublished);
    }

    const handleFileUpload = (e) => {
        const image = e.target.files[0];
        if (image) {
            const storage = firebaseApp.storage();
            const fileName = `${Date.now()}_${image.name}}`;
            const imageUploadTask = storage.ref(`images/${fileName}`).put(image);

            setImageUrl(""); // Set image URL uploading in progress

            imageUploadTask.on('state_changed',
                (snapshot) => {

                }, (e) => {
                    onImageFetchedError(e);
                }, async () => {
                    try {
                        let imageUrl = await storage.ref('images').child(`${fileName}`).getDownloadURL();
                        setImageUrl(imageUrl);
                    } catch (e) {
                        onImageFetchedError(e);
                    }
                });
        }
    }

    const onImageFetchedError = (e) => {
        setImageUrl(null);
        showGeneralAlertError(e.error);
    }

    return (
        <Dialog
            open={props.open}
            onClose={clearAndClose}
            fullScreen
            TransitionComponent={Transition}>

            <AppBar className={classes.appBar} color="primary">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={clearAndClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.isInEditMode ? "Edytuj Produkt" : "Dodaj nowy produkt"}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleSubmit(onCreateProductClicked)}>
                        {props.isInEditMode ? "Zapisz" : "Dodaj"}
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent className={classes.dialog}>
                <Grid container spacing={3} className={classes.container} justify="center">

                    <ImageUploader imageUrl={imageUrl} handleFileUpload={handleFileUpload} styles={styles} classes={classes} />

                    <Grid item xs={6}>
                        <form onSubmit={handleSubmit(onCreateProductClicked)}>
                            <Grid item xs={12}>
                                <FormControl className={classes.margin} variant="standard">
                                    <Controller
                                        name="name"
                                        as={
                                            <TextField
                                                id="name"
                                                helperText={fieldsErrors.name ? fieldsErrors.name.message : null}
                                                variant="standard"
                                                label="Nazwa"
                                                error={fieldsErrors.name !== undefined}
                                                InputProps={{
                                                    className: styles.input
                                                }} />
                                        }
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Pole wymagane',
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl className={classes.margin} variant="standard">
                                    <Controller
                                        name="price"
                                        as={
                                            <TextField
                                                id="price"
                                                helperText={fieldsErrors.price ? fieldsErrors.price.message : null}
                                                variant="standard"
                                                label="Cena"
                                                error={fieldsErrors.price !== undefined}
                                                InputProps={{
                                                    className: styles.input
                                                }}
                                            />
                                        }
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Pole wymagane',
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl className={classes.margin} variant="standard">
                                    <Controller
                                        name="description"
                                        as={
                                            <TextField
                                                id="description"
                                                helperText={fieldsErrors.description ? fieldsErrors.description.message : null}
                                                variant="standard"
                                                label="Opis"
                                                error={fieldsErrors.description !== undefined}
                                                multiline
                                                InputProps={{
                                                    className: styles.input
                                                }}
                                            />
                                        }
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Pole wymagane',
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    className={`${classes.margin} ${styles.text}`}
                                    control={
                                        <Switch
                                            color="primary"
                                            checked={isPublished}
                                            onClick={handleSwitchStateChange}
                                            name="isPublished"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />}
                                    label="Czy opublikować?"
                                />
                            </Grid>

                            <Grid item xs={12} className={`${styles.margin} ${styles.centerChildren}`}>
                                {isInProgress && <CircularProgress />}
                            </Grid>

                        </form>
                    </Grid>
                </Grid>
            </DialogContent>
        
        </Dialog>
    );
}

function ImageUploader(props) {
    const { imageUrl } = props;
    const { classes } = props;
    const { styles } = props;

    return (
        <Grid container className={classes.imageLoader} justify="center">
            <Grid item xs={12} sm={3} md={2} className={styles.centerChildren}>
                {imageUrl === null
                    ? <Image className={classes.imageIcon} />
                    : imageUrl === "" ? <Box className={`${classes.imageIcon} ${styles.centerChildrenVertically}`}> <CircularProgress /> </Box>
                        : <img className={classes.imageIcon} src={imageUrl} />}
            </Grid>
            <Grid item xs={12} sm={3} md={2} className={styles.centerChildrenVertically}>
                <Button
                    variant="contained"
                    component="label"
                    color="primary">
                    Dodaj zdjęcie
                        <input type="file" hidden onChange={props.handleFileUpload} />
                </Button>
            </Grid>
        </Grid>
    );
}

export default ProductManagementDialog;