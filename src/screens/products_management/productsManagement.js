import { Fab, CircularProgress, GridList, GridListTile, GridListTileBar, ListSubheader, IconButton } from '@material-ui/core';
import { Add as AddIcon, Image, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';

import ProductManagementDialog from '../../components/dialog/productManagementDialog';
import ConfirmationDialog from '../../components/dialog/confirmationDialog';

import { SuccessSnackbar, showGeneralAlertError } from '../../components/alert/alerts';
import { getUsersProducts, removeProduct } from '../../backend/productsRepository';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import { convertPrice } from '../../helpers/price/priceHelper';
import { productManagementStyles } from './styles/productManagementStyles';
import { getGridListCols } from '../../helpers/grid/gridColumns';
import withWidth from '@material-ui/core/withWidth';

function ProducstManagement(props) {

    const classes = productManagementStyles();
    const [isInProgress, setInProgress] = useState(false);
    const [successSnackbarMessage, setSuccessSnackbarMessage] = useState("");
    const [productsData, setProductsData] = useState(null);
    const [isDeleteDialogShown, setDeleteDialogShown] = useState();
    const [productToRemoveId, setProductToRemove] = useState();
    const [productToEdit, setProductToEdit] = useState(null);
    const [isProductManagementShown, setProductManagementShown] = useState(false);
    const history = useHistory();

    const onProductEditClicked = (element, data) => {
        element.stopPropagation();
        setProductToEdit(data);
        setProductManagementShown(true);
    }

    const onProductClicked = (element, data) => {
        element.stopPropagation();
        history.push('/product_details', {
            product: data,
            previewMode: true
        })
    }

    const onProductAdded = data => {
        let currentData = productsData;
        currentData.push(data);
        setProductsData(currentData);
        setSuccessSnackbarMessage("Produkt został dodany!");
    }

    const onProductEdited = data => {
        let currentData = productsData;
        let indexToUpdate = currentData.findIndex((item) => item.productId === data.productId);
        if (indexToUpdate !== -1) {
            let updatedProduct = currentData[indexToUpdate];
            updatedProduct.name = data.name;
            updatedProduct.description = data.description;
            updatedProduct.price = data.price;
            updatedProduct.isPublished = data.isPublished;
            updatedProduct.imageUrl = data.imageUrl;
            currentData[indexToUpdate] = updatedProduct;
            setProductsData(currentData);
            setSuccessSnackbarMessage("Produkt został zaktualizowany!");
        }
    }

    const performDeleteProduct = (element, productId) => {
        element.stopPropagation();
        setProductToRemove(productId);
        setDeleteDialogShown(true);
    }

    const deleteProduct = async () => {
        try {
            let response = await removeProduct(productToRemoveId);
            let removedProductId = response.data.removedId;
            let currentData = productsData;
            let filteredData = currentData.filter((product) => product.productId !== removedProductId);
            setProductsData(filteredData);
            setSuccessSnackbarMessage("Produkt został usunięty!");
        } catch (e) {
            showGeneralAlertError(e.message);
        } finally {
            setDeleteDialogShown(false);
        }
    }

    const handleClickOpen = () => {
        setProductManagementShown(true);
    };

    const handleClose = () => {
        setProductManagementShown(false);
        setProductToEdit(null);
    };

    useEffect(() => {
        async function fetchData() {
            setInProgress(true);
            try {
                let response = await getUsersProducts();
                setProductsData(response.data);
            } catch (e) {
                showGeneralAlertError(e.message);
            } finally {
                setInProgress(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className={classes.root}>
            {productsData === null ? null :
                (productsData.length === 0)
                    ? <div className={classes.centerText}>Nie masz zadnych produktów.<br />Aby dodać nowe naciśnij + w prawym dolnym rogu ekranu.</div>
                    : <GridList cellHeight={180} className={classes.gridList} cols={getGridListCols(props)} spacing={12}>

                        {productsData.filter((product) => product.isPublished).length !== 0 &&
                            <GridListTile key="Subheader_published" cols={getGridListCols(props)} style={{ height: 'auto', background: "rgba(0, 0, 0, 0.6)" }} >
                                <ListSubheader component="div" className={classes.text}>Opublikowane</ListSubheader>
                            </GridListTile>
                        }
                        {productsData.filter((product) => product.isPublished).map((product) => (
                            <GridListTile key={product.productId} className={classes.gridItem} onClick={(e) => onProductClicked(e, product)}>
                                {product.imageUrl == null
                                    ? <Image className={classes.imageIcon} />
                                    : <img src={product.imageUrl} alt={"Product"} />}
                                <GridListTileBar
                                    title={product.name}
                                    subtitle={convertPrice(product.price)}
                                    actionIcon={[
                                        <IconButton className={classes.icon}>
                                            <EditIcon onClick={(e) => onProductEditClicked(e, product)} />
                                        </IconButton>,
                                        <IconButton className={classes.icon_delete} onClick={(e) => performDeleteProduct(e, product.productId)}>
                                            <DeleteIcon />
                                        </IconButton>]
                                    }
                                />
                            </GridListTile>
                        ))}

                        {productsData.filter((product) => !product.isPublished).length !== 0 &&
                            <GridListTile key="Subheader_unpublished" cols={getGridListCols(props)} style={{ height: 'auto', background: "rgba(0, 0, 0, 0.6)" }}  >
                                <ListSubheader component="div" className={classes.text}>Nieopublikowane</ListSubheader>
                            </GridListTile>
                        }
                        {productsData.filter((product) => !product.isPublished).map((product) => (
                            <GridListTile key={product.productId} className={classes.gridItem} onClick={(e) => onProductClicked(e, product)} >
                                {product.imageUrl == null
                                    ? <Image className={classes.imageIcon} />
                                    : <img src={product.imageUrl} alt={"Product"} />}
                                <GridListTileBar
                                    title={product.name}
                                    subtitle={convertPrice(product.price)}
                                    actionIcon={[
                                        <IconButton className={classes.icon}>
                                            <EditIcon onClick={(e) => onProductEditClicked(e, product)} />
                                        </IconButton>,
                                        <IconButton className={classes.icon_delete} onClick={(e) => performDeleteProduct(e, product.productId)}>
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
            <ProductManagementDialog open={isProductManagementShown} handleClose={handleClose} isInEditMode={productToEdit !== null} onProductAdded={onProductAdded} onProductEdited={onProductEdited} productData={productToEdit} />
            <ConfirmationDialog
                open={isDeleteDialogShown}
                title="Usuwanie produktu"
                description="Czy na pewno chcesz usunąć ten produkt?"
                negativeButton="Nie"
                positiveButton="Tak"
                negativeButtonCallback={() => setDeleteDialogShown(false)}
                positiveButtonCallback={deleteProduct} />
            <SuccessSnackbar open={successSnackbarMessage !== ""} onClose={() => setSuccessSnackbarMessage("")} alertText={successSnackbarMessage} />
        </div>
    );
}

export default withWidth()(ProducstManagement);