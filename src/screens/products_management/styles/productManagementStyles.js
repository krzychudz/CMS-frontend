import { makeStyles } from '@material-ui/core/styles';

export const productManagementStyles = makeStyles(theme => ({
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
        '&:hover': {
            background: "rgba(0, 0, 0, 0.4)",
            cursor: "pointer"
         },
    },
    imageIcon: {
        width: '100%',
        height: '100px'
    },
    icon: {
        color: '#ffffff',
        '&:hover': {
            background: "rgba(0, 0, 0, 0.8)",
            cursor: "pointer"
         },
    },
    icon_delete: {
        color: '#FF9494',
        '&:hover': {
            background: "rgba(0, 0, 0, 0.8)",
            cursor: "pointer"
         },
    },
    text: {
        color: "#ffffff"
    },
    centerText: {
        textAlign: 'center',
        marginTop: '16px'
    }
}));