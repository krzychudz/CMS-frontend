import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#BB86FC',
    },
    secondary: {
      main: '#232323',
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
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 500,
      lg: 900,
      xl: 1200
    }
  },
});

export default mainTheme;