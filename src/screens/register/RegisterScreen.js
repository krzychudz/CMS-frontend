import '../../styles/general/style.css';
import Paper from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { generalStyles } from '../../styles/mui/generalStyles';
import { getRegisterError } from '../../helpers/firebase/firebaseErrorsHelper';
import { useHistory } from "react-router-dom";

import 'firebase/auth';
import firebaseApp from '../../firebaseConfig';

function RegisterScreen() {

    const [isInProgress, setProgressVisibility] = useState(false);
    const [registerError, setRegisterError] = useState("");
    const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();
    const history = useHistory(); 

    const auth = firebaseApp.auth();
    const classes = generalStyles();


    const onRegisteredCliked = async data => {
        try {
            setProgressVisibility(true);
            var registeredUser = await auth.createUserWithEmailAndPassword(data.email, data.password);
            history.goBack();
            reset();
        } catch (error) {
            setRegisterError(getRegisterError(error.code));
        }
        setProgressVisibility(false);
    }

    return (
        <Paper className="main_container">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className="header_style">Rejestracja</div>
                </Grid>

                <form onSubmit={handleSubmit(onRegisteredCliked)} className={classes.fillMaxWidth}>
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
                                        error={fieldsErrors.email != undefined}
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
                                        error={fieldsErrors.password != undefined}
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
                                    minLength: {
                                        value: 4,
                                        message: "Podane hasło jest za krótkie"
                                    }
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} className={classes.centerChildren}>
                        <FormControl className={classes.margin} variant="standard">
                            <Controller
                                name="passwordRe"
                                as={
                                    <TextField
                                        id="passwordRe"
                                        helperText={fieldsErrors.passwordRe ? fieldsErrors.passwordRe.message : null}
                                        variant="standard"
                                        label="Powtórz hasło"
                                        error={fieldsErrors.passwordRe != undefined}
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
                                    minLength: {
                                        value: 4,
                                        message: "Podane hasło jest za krótkie"
                                    }
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} className={classes.centerChildren}>
                        {isInProgress && <CircularProgress />}
                    </Grid>

                    <Grid item xs={12} className={classes.centerChildren}>
                            {registerError !== "" && <div className={"general_error"}>{registerError}</div>}
                    </Grid>

                    <Grid item xs={12} className={`${classes.centerChildren} ${classes.margin}`}>
                        <Button variant="contained" color="primary" type="submit" className={classes.margin}>
                            Zarejestruj się
                </Button>
                    </Grid>
                </form>
            </Grid>
        </Paper>
    );
}

export default RegisterScreen;