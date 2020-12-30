import { CircularProgress, GridList, GridListTile, GridListTileBar, ListSubheader } from '@material-ui/core';
import { Image } from '@material-ui/icons';

import ProductDetailslDialog from '../../components/dialog/productDetailsDialog';

import { getAllProducts } from '../../backend/productsRepository';
import { useEffect, useState } from 'react';

import { convertPrice } from '../../helpers/price/priceHelper';
import { productManagementStyles } from '../products_management/styles/productManagementStyles';
import { showGeneralAlertError } from '../../components/alert/alerts';
import { getGridListCols } from '../../helpers/grid/gridColumns';
import withWidth from '@material-ui/core/withWidth';

function HomeScreen(props) {

    const classes = productManagementStyles();
    const [isInProgress, setInProgress] = useState(false);
    const [productsData, setProductsData] = useState(null);
    const [productToDisplay, setProductToDisplay] = useState(null);

    useEffect(async () => {
        setInProgress(true);
        try {
            let response = await getAllProducts();
            console.log(response.data);
            setProductsData(response.data);
        } catch (e) {
            showGeneralAlertError(e.error);
        } finally {
            setInProgress(false);
        }
    }, []);

    const onProductClicked = data => {
        setProductToDisplay(data);
    }

    return (
        <div className={classes.root}>

            {productsData == null ? null :
                (productsData.length === 0)
                    ? <div className={classes.centerText}>Brak produktów do wyświetlenia.</div>
                    : <GridList cellHeight={180} className={classes.gridList} cols={getGridListCols(props)} spacing={12}>


                        <GridListTile key="Subheader_all_products" cols={getGridListCols(props)} style={{ height: 'auto', background: "rgba(0, 0, 0, 0.6)" }} >
                            <ListSubheader component="div" className={classes.text}>Produkty</ListSubheader>
                        </GridListTile>

                        {productsData.filter((product) => product.isPublished).map((product) => (
                            <GridListTile key={product.productId} className={classes.gridItem} onClick={() => onProductClicked(product)}>
                                {product.imageUrl == null
                                    ? <Image className={classes.imageIcon} />
                                    : <img src={product.imageUrl} />}
                                <GridListTileBar
                                    title={product.name}
                                    subtitle={convertPrice(product.price)}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
            }
            {isInProgress &&
                <div className={classes.centerText}>
                    <CircularProgress />
                </div>
            }
            <ProductDetailslDialog open={productToDisplay != null} handleClose={() => setProductToDisplay(null)} product={productToDisplay} isPreviewMode={true} />
        </div>
    );
}

export default withWidth()(HomeScreen);