import { isWidthUp } from '@material-ui/core/withWidth';

export const getGridListCols = (props) => {

    if (isWidthUp('xl', props.width)) {
        return 4;
    }  if (isWidthUp('lg', props.width)) {
        return 3;
    }  if (isWidthUp('md', props.width)) {
        return 2;
    }  if (isWidthUp('sm', props.width)) {
        return 1;
    }  
    
    return 1;
}
