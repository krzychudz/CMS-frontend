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
    }
});