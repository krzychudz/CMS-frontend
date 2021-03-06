import { Dialog, DialogContent, Button, Slide, AppBar, Toolbar, Typography, FormControl, Box, TextField, CircularProgress, IconButton, FormControlLabel, Grid, Switch } from '@material-ui/core';
import { Close as CloseIcon, Image } from '@material-ui/icons';

import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef, useEffect, useState, useRef } from 'react';
import { generalStyles } from '../../styles/mui/generalStyles';
import { showGeneralAlertError } from '../alert/alerts';

import { addProduct, editProduct } from '../../backend/productsRepository';
import { uploadImageToFirebaseStorage } from '../../helpers/firebase/image/imageUpload';

import MUIRichTextEditor from 'mui-rte'

import { convertToRaw } from 'draft-js'

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

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function ProductManagementDialog(props) {

    const { productData, isInEditMode, open } = props;

    const classes = useStyles();
    const styles = generalStyles();

    const { handleSubmit, control, errors: fieldsErrors } = useForm();
    const [isPublished, setIsPublished] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [isInProgress, setInProgress] = useState(false);
    const [descriptionText, setDescriptionText] = useState(false);
    const prevVisibility = usePrevious(open);

    useEffect(() => {
        if (open && !prevVisibility) {
            if (productData != null) {
                setIsPublished(productData.isPublished);
                setImageUrl(productData.imageUrl);
            }
        }
    }, [open, prevVisibility, productData]);


    const clearDialogData = () => {
        setImageUrl(null);
        setIsPublished(false);
    }

    const clearAndClose = () => {
        clearDialogData();
        props.handleClose();
    }

    const manageProduct = async data => {
        try {
            setInProgress(true);

            let body = {
                name: data.name,
                description: descriptionText,
                price: data.price,
                isPublished: isPublished,
                imageUrl: imageUrl
            }

            let response = isInEditMode ? await editProduct(productData.productId, body) : await addProduct(body);

            clearDialogData();
            if (isInEditMode) {
                props.onProductEdited(response.data);
            } else {
                props.onProductAdded(response.data);
            }
            props.handleClose();
        } catch (e) {
            showGeneralAlertError(e.message);
        } finally {
            setInProgress(false);
        }
    }

    const handleSwitchStateChange = () => {
        setIsPublished(!isPublished);
    }

    const handleFileUpload = async (e) => {
        try {
            setImageUrl("");
            const image = e.target.files[0];
            let imageUrl = await uploadImageToFirebaseStorage(image);
            setImageUrl(imageUrl);
        } catch (e) {
            onImageFetchedError(e.message);
        }
    }

    const onImageFetchedError = (e) => {
        setImageUrl(null);
        showGeneralAlertError(e.message);
    }

    const keepEditorContent = (editorState) => {
        const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        setDescriptionText(content);
        console.log(content);
    }

    return (
        <Dialog
            open={open}
            onClose={clearAndClose}
            fullScreen
            TransitionComponent={Transition}>

            <AppBar className={classes.appBar} color="primary">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={clearAndClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {isInEditMode ? "Edytuj Produkt" : "Dodaj nowy produkt"}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleSubmit(manageProduct)}>
                        {isInEditMode ? "Zapisz" : "Dodaj"}
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent className={classes.dialog}>
                <Grid container spacing={3} className={classes.container} justify="center">

                    <ImageUploader imageUrl={imageUrl} handleFileUpload={handleFileUpload} styles={styles} classes={classes} />

                    <Grid item xs={6}>
                        <form onSubmit={handleSubmit(manageProduct)}>
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
                                        defaultValue={productData == null ? "" : productData.name}
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
                                                label="Cena [gr]"
                                                error={fieldsErrors.price !== undefined}
                                                InputProps={{
                                                    className: styles.input
                                                }}
                                            />
                                        }
                                        control={control}
                                        defaultValue={productData == null ? "" : productData.price}
                                        rules={{
                                            required: 'Pole wymagane',
                                            pattern: {
                                                value: /^[0-9]+$/i,
                                                message: 'Dozwolone tylko liczby'
                                            }
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl className={classes.margin} variant="standard">
                                    <MUIRichTextEditor
                                        label="Opis..."
                                        defaultValue={productData == null ? "" : productData.description}
                                        inlineToolbar={true}
                                        onChange={keepEditorContent}
                                        controls={["title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "numberList", "bulletList", "quote", "clear"]}
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
                        : <img className={classes.imageIcon} src={imageUrl} alt={"Product"} />}
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