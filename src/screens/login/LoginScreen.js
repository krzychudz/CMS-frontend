import '../../styles/general/style.css';
import Paper from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function LoginScreen() {
    return (
        <Paper className = "main_container">
            <Grid container spacing={3}> 
                <Grid item xs={12}>
                    <div className="header_style">Logowanie</div>
                </Grid>
                <Grid item xs={12} className="centered_grid">
                    <TextField id="outlined-basic" label="E-mail" variant="outlined" />
                </Grid>
                <Grid item xs={12} className="centered_grid">
                    <TextField id="outlined-basic" label="Hasło" variant="outlined" />
                </Grid>
                <Grid item xs={12} className="centered_grid">
                    <Button variant="contained" color="primary">
                        Zaloguj się
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default LoginScreen;