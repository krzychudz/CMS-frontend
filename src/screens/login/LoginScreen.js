import '../../styles/general/style.css';
import Paper from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useForm, Controller } from 'react-hook-form';
import { generalStyles } from '../../styles/mui/generalStyles';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import 'firebase/auth';
import firebaseApp from '../../firebaseConfig';

function LoginScreen() {

    const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();
    const [isInProgress, setProgressVisibility] = useState(false);
    const [loginError, setLoginError] = useState("");

    const classes = generalStyles();

    const auth = firebaseApp.auth();

    const onLoginClicked = async data => {
        console.log(data);
        setProgressVisibility(true);
        try {
            const result = await auth.signInWithEmailAndPassword(data.email, data.password);
            console.log(result);
        } catch (error) {
            setLoginError(error.message);
        } finally {
            setProgressVisibility(false);
        }

    }

    return (
        <Paper className="main_container">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className="header_style">Logowanie</div>
                </Grid>

                <form onSubmit={handleSubmit(onLoginClicked)} className={classes.fillMaxWidth}>
                    <Grid item xs={12} className={classes.centerChildren}>
                        <FormControl className={classes.margin} variant="standard">
                            <Controller
                                name="email"
                                as={
                                    <TextField
                                        id="email"
                                        helperText={fieldsErrors.email ? fieldsErrors.email.message : null}
                                        variant="standard"
                                        label="Email"
                                        error={fieldsErrors.email !== undefined}
                                        InputProps={{
                                            className: classes.input
                                        }}
                                    />
                                }
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Pole wymagane',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'Niepoprawny email'
                                    }
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} className={classes.centerChildren}>
                        <FormControl className={classes.margin} variant="standard">
                            <Controller
                                name="password"
                                as={
                                    <TextField
                                        id="password"
                                        helperText={fieldsErrors.password ? fieldsErrors.password.message : null}
                                        variant="standard"
                                        label="Hasło"
                                        error={fieldsErrors.password !== undefined}
                                        type="password"
                                        InputProps={{
                                            className: classes.input
                                        }}
                                    />
                                }
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Pole wymagane',
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} className={classes.centerChildren}>
                        {isInProgress && <CircularProgress />}
                    </Grid>

                    <Grid item xs={12} className={classes.centerChildren}>
                        {loginError !== "" && <div className={"general_error"}>{loginError}</div>}
                    </Grid>

                    <Grid item xs={12} className={`${classes.centerChildren} ${classes.margin}`}>
                        <Button variant="contained" color="primary" type="submit" className={classes.margin}>
                            Zaloguj się
                         </Button>
                    </Grid>

                    <Grid item xs={12} className="centered_grid">
                        <div>Jeśli nie masz konta, <Link to="/register" className={"link"}> zarejetruj się. </Link></div>
                    </Grid>
                </form>
            </Grid>
        </Paper>
    );
}

export default LoginScreen;