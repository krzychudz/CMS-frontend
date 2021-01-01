import { Dialog, DialogContent, Button, Slide, AppBar, Toolbar, Typography, FormControl, Box, TextField, CircularProgress, IconButton, FormControlLabel, Grid, Switch, Divider } from '@material-ui/core';
import { Image } from '@material-ui/icons';

import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { generalStyles } from '../../styles/mui/generalStyles';
import { makeStyles } from '@material-ui/core/styles';
import { convertPrice } from '../../helpers/price/priceHelper';

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
    }
}));

function ProductDetailsScreen() {
    const styles = generalStyles();
    const productDetailsScreenStyles = screenStyles();
    const history = useHistory(); 

    const productData = history.location.state.product;

    return (
        <Grid container spacing={3} alignItems = "center" justify = "center">
            <Grid item xs = {12} className={`${styles.centerChildren} ${productDetailsScreenStyles.productImage}`}>
                {productData.imageUrl != null 
                ? <img src={productData.imageUrl}/>
                : <Image className = {productDetailsScreenStyles.customImage} /> }
            </Grid>
            <Grid item xs = {12} className={`${styles.centerChildren} ${productDetailsScreenStyles.productInfo}`}><b>Nazwa:</b> {productData.name}</Grid>
            <Grid item xs = {12} className={`${styles.centerChildren} ${productDetailsScreenStyles.productInfo}`}><b>Cena:</b> {convertPrice(productData.price)}</Grid>
            <Grid item xs = {12} className={`${styles.centerChildren} ${productDetailsScreenStyles.productInfo}`}><b>Właściciel: </b>{productData.ownerEmail}</Grid>
            <Grid item xs = {12}> <Divider className = {productDetailsScreenStyles.divider} variant="middle" /> </Grid>
            <Grid item xs = {12} className={`${styles.centerChildren} ${productDetailsScreenStyles.productDescription}`}>
                {productData.description}
            </Grid>
        </Grid>
    );
}

export default ProductDetailsScreen;