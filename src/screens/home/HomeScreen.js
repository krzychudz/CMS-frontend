import { CircularProgress, GridList, GridListTile, GridListTileBar, ListSubheader } from '@material-ui/core';
import { Image } from '@material-ui/icons';

import { getAllProducts } from '../../backend/productsRepository';
import { useEffect, useState } from 'react';

import { convertPrice } from '../../helpers/price/priceHelper';
import { productManagementStyles } from '../products_management/styles/productManagementStyles';
import { showGeneralAlertError } from '../../components/alert/alerts';
import { getGridListCols } from '../../helpers/grid/gridColumns';
import { useHistory } from "react-router-dom";
import withWidth from '@material-ui/core/withWidth';



function HomeScreen(props) {

    const classes = productManagementStyles();
    const [isInProgress, setInProgress] = useState(false);
    const [productsData, setProductsData] = useState(null);

    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            setInProgress(true);
            try {
                let response = await getAllProducts();
                setProductsData(response.data);
                localStorage.setItem("testData", "true");
            } catch (e) {
                showGeneralAlertError(e.error);
            } finally {
                setInProgress(false);
            }
        }
        fetchData();
    }, []);

    const onProductClicked = data => {
        history.push('/product_details', {
            product: data,
            previewMode: false
        })
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
                                    : <img src={product.imageUrl} alt={"Product"}/>}
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
        </div>
    );
}

export default withWidth()(HomeScreen);