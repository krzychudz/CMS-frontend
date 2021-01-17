import { makeStyles } from '@material-ui/core/styles';

const productDetailsScreenStyles = makeStyles(theme => ({
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
    },
    icon: {
        color: "#ffffff"
    }
}));

export default productDetailsScreenStyles;