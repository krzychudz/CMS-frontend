import { Fab, CircularProgress, GridList, GridListTile, GridListTileBar, ListSubheader, IconButton } from '@material-ui/core';
import { Add as AddIcon, Image, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';

import ProductManagementDialog from '../../components/dialog/productManagementDialog';

import { SuccessSnackbar } from '../../components/alert/alerts';
import { getUsersProducts } from '../../backend/productsRepository';
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
    text: {
        color: "#ffffff"
    },
    centerText: {
        textAlign: 'center'
    }
}));


function ProducstManagement() {

    const classes = useStyles();
    const [isInProgress, setInProgress] = useState(false);
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [productsData, setProductsData] = useState([]);

    const [open, setOpen] = useState(false);

    const productManagementButtons =  [
        <IconButton className={classes.icon}>
            <EditIcon />
        </IconButton>,
        <IconButton className={classes.icon}>
            <DeleteIcon />
        </IconButton>]

    const onProductAdded = data => {
        let currentData = productsData;
        currentData.push(data);
        setProductsData(currentData);
        setShowSuccessSnackbar(true);
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
            console.log(response.data);
            setProductsData(response.data);
        } catch (e) {
            console.log(e);
        } finally {
            setInProgress(false);
        }
    }, []);

    return (
        <div className={classes.root}>
            {productsData &&
                (productsData.length === 0)
                ? <div className={classes.centerText}>Nie masz zadnych produktów.<br />Aby dodać nowe naciśnij + w prawym dolnym rogu ekranu.</div>
                : <GridList cellHeight={180} className={classes.gridList} cols={3} spacing={12}>

                    {productsData.filter((product) => product.isPublished).length != 0 &&
                        <GridListTile key="Subheader" cols={3} style={{ height: 'auto', background: "rgba(0, 0, 0, 0.6)" }} >
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
                                subtitle={ convertPrice(product.price) }
                                actionIcon={productManagementButtons}
                            />
                        </GridListTile>
                    ))}

                    {productsData.filter((product) => !product.isPublished).length != 0 &&
                        <GridListTile key="Subheader" cols={3} style={{ height: 'auto', background: "rgba(0, 0, 0, 0.6)" }}  >
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
                                subtitle={ convertPrice(product.price) }
                                actionIcon={productManagementButtons}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            }


            <Fab color="primary" className={classes.fab} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            {isInProgress &&
                <CircularProgress />
            }
            <ProductManagementDialog open={open} handleClose={handleClose} isInEditMode={false} onProductAdded={onProductAdded} />
            <SuccessSnackbar open={showSuccessSnackbar} onClose={() => setShowSuccessSnackbar(false)} alertText="Produkt został pomyślnie dodany!" />
        </div>
    );
}

export default ProducstManagement;