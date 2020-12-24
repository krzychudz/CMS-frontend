import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const mainTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#BB86FC',
        },
        secondary: {
            main: green[500],
        },
    },
    overrides: {
        MuiFormLabel: {
          root: {
            "&$focused": {
              color: "#BB86FC",
            },
            color: "#eeeeee"
          }, 
          
          focused: {}
        }
      }
});

export default mainTheme;