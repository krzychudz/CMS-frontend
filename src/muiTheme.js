import { createMuiTheme } from '@material-ui/core/styles';

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
    },
    MUIRichTextEditor: {
      root: {
          marginTop: 20,
          marginBottom: 20,
          width: "100%",
          color: "#FFFFFF"
      },
      editor: {
          borderBottom: "1px solid grey" ,
          color: "black",
          padding: 16
      },
      container: {
        backgroundColor: "#FFFFFF"
      }
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