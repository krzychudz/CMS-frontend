import { Fab, CircularProgress, GridList, GridListTile, GridListTileBar, ListSubheader, IconButton } from '@material-ui/core';
import { Add as AddIcon, Image, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';

import ProductManagementDialog from '../../components/dialog/productManagementDialog';
import ConfirmationDialog from '../../components/dialog/confirmationDialog';

import { SuccessSnackbar, showGeneralAlertError } from '../../components/alert/alerts';
import { getUsersProducts, removeProduct } from '../../backend/productsRepository';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

import { convertPrice } from '../../helpers/price/priceHelper';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fullScreen: {
        width: '100%'
    },
    gridList: {
        width: '100%'
    },
    gridItem: {
        padding: '60px'
    },
    imageIcon: {
        width: '100%',
        height: '100px'
    },
    icon: {
        color: '#ffffff'
    },
    icon_delete: {
        color: '#FF9494'
    },
    text: {
        color: "#ffffff"
    },
    centerText: {
        textAlign: 'center',
        marginTop: '16px'
    }
}));


function ProducstManagement() {

    const classes = useStyles();
    const [isInProgress, setInProgress] = useState(false);
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [productsData, setProductsData] = useState(null);
    const [isDeleteDialogShown, setDeleteDialogShown] = useState();
    const [productToRemoveId, setProductToRemove] = useState();

    const [open, setOpen] = useState(false);

    const onProductAdded = data => {
        let currentData = productsData;
        currentData.push(data);
        setProductsData(currentData);
        setShowSuccessSnackbar(true);
    }

    const performDeleteProduct = productId => {
        setProductToRemove(productId);
        setDeleteDialogShown(true);
    }

    const deleteProduct = async () => {
        try {
            let response = await removeProduct(productToRemoveId);
            let removedProductId = response.data.removedId;
            let currentData = productsData;
            let filteredData = currentData.filter((product) => product.productId != removedProductId);
            setProductsData(filteredData);
        } catch (e) {
            showGeneralAlertError(e.error);
        } finally {
            setDeleteDialogShown(false);
        }
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
            setProductsData(response.data);
        } catch (e) {
            showGeneralAlertError(e.error);
        } finally {
            setInProgress(false);
        }
    }, []);

    return (
        <div className={classes.root}>
            {productsData == null ? null :
                (productsData.length === 0)
                    ? <div className={classes.centerText}>Nie masz zadnych produktów.<br />Aby dodać nowe naciśnij + w prawym dolnym rogu ekranu.</div>
                    : <GridList cellHeight={180} className={classes.gridList} cols={3} spacing={12}>

                        {productsData.filter((product) => product.isPublished).length != 0 &&
                            <GridListTile key="Subheader_published" cols={3} style={{ height: 'auto', background: "rgba(0, 0, 0, 0.6)" }} >
                                <ListSubheader component="div" className={classes.text}>Opublikowane</ListSubheader>
                            </GridListTile>
                        }
                        {productsData.filter((product) => product.isPublished).map((product) => (
                            <GridListTile key={product.productId}>
                                {product.imageUrl == null
                                    ? <Image className={classes.imageIcon} />
                                    : <img src={product.imageUrl} />}
                                <GridListTileBar
                                    title={product.name}
                                    subtitle={convertPrice(product.price)}
                                    actionIcon={[
                                        <IconButton className={classes.icon}>
                                            <EditIcon />
                                        </IconButton>,
                                        <IconButton className={classes.icon_delete} onClick={() => performDeleteProduct(product.productId)}>
                                            <DeleteIcon />
                                        </IconButton>]
                                    }
                                />
                            </GridListTile>
                        ))}

                        {productsData.filter((product) => !product.isPublished).length != 0 &&
                            <GridListTile key="Subheader_unpublished" cols={3} style={{ height: 'auto', background: "rgba(0, 0, 0, 0.6)" }}  >
                                <ListSubheader component="div" className={classes.text}>Nieopublikowane</ListSubheader>
                            </GridListTile>
                        }
                        {productsData.filter((product) => !product.isPublished).map((product) => (
                            <GridListTile key={product.productId} className={classes.gridItem}>
                                {product.imageUrl == null
                                    ? <Image className={classes.imageIcon} />
                                    : <img src={product.imageUrl} />}
                                <GridListTileBar
                                    title={product.name}
                                    subtitle={convertPrice(product.price)}
                                    actionIcon={[
                                        <IconButton className={classes.icon}>
                                            <EditIcon />
                                        </IconButton>,
                                        <IconButton className={classes.icon_delete} onClick={() => performDeleteProduct(product.productId)}>
                                            <DeleteIcon />
                                        </IconButton>]
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
            }


            <Fab color="primary" className={classes.fab} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            {isInProgress &&
                <div className={classes.centerText}>
                    <CircularProgress />
                </div>
            }
            <ProductManagementDialog open={open} handleClose={handleClose} isInEditMode={false} onProductAdded={onProductAdded} />
            <ConfirmationDialog
                open={isDeleteDialogShown}
                title="Usuwanie produktu"
                description="Czy na pewno chcesz usunąć ten produkt?"
                negativeButton="Nie"
                positiveButton="Tak"
                negativeButtonCallback={() => setDeleteDialogShown(false)}
                positiveButtonCallback={deleteProduct} />
            <SuccessSnackbar open={showSuccessSnackbar} onClose={() => setShowSuccessSnackbar(false)} alertText="Produkt został pomyślnie dodany!" />
        </div>
    );
}

export default ProducstManagement;