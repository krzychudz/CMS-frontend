import { makeStyles } from '@material-ui/core/styles';

export const generalStyles = makeStyles({
    margin: {
        margin: '8px'
    },
    fillMaxWidth: {
        width: '100%'
    },
    centerChildren: {
        textAlign: 'center',
    },
    input: {
        color: '#eeeeee',
    },
    text: {
        color: '#ffffff'
    },
    centerChildrenVertically: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialog: {
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    dialogIcon: {
        minHeight: '180px'
    },
    dialogImage: {
        width: '100px',
        height: '100px',
        color: '#ffffff',
        textAlign: 'center'
    }
});