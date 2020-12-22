import '../../styles/general/style.css';
import Paper from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';

import 'firebase/auth';
import firebaseApp from '../../firebaseConfig';

function RegisterScreen() {

    const [isInProgress, setProgressVisibility] = useState(false);
    const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();
    const auth = firebaseApp.auth();

    const useStyles = makeStyles({
        margin: {
            margin: '8px'
        },
        fillMaxWidth: {
            width: '100%'
        },
        centerChildren: {
            textAlign: 'center'
        }
      });
    
    const classes = useStyles();

    const onRegisteredCliked = async data => {
        try {
            setProgressVisibility(true);
            var registeredUser = await auth.createUserWithEmailAndPassword(data.email, data.password);
            console.log(registeredUser);
        } catch (error) {
            console.log(error);
        }
        setProgressVisibility(false);
        reset();
    }

    return (
        <Paper className = "main_container">
        <Grid container spacing={3}> 
            <Grid item xs={12}>
                <div className="header_style">Rejestracja</div>
            </Grid>
            
            <form onSubmit={handleSubmit(onRegisteredCliked)} className={classes.fillMaxWidth}>
            <Grid item xs={12} className={classes.centerChildren}>
                <FormControl className={classes.margin} variant="outlined">
                    <Controller
                        name="email"
                        as={
                            <TextField
                            id="email"
                            helperText={fieldsErrors.email ? fieldsErrors.email.message : null}
                            variant="outlined"
                            label="Email"
                            error={fieldsErrors.email}
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
                <FormControl className={classes.margin} variant="outlined">
                    <Controller
                        name="password"
                        as={
                            <TextField
                            id="password"
                            helperText={fieldsErrors.password ? fieldsErrors.password.message : null}
                            variant="outlined"
                            label="Hasło"
                            error={fieldsErrors.password}
                            type="password"
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
                <FormControl className={classes.margin} variant="outlined">
                    <Controller
                        name="passwordRe"
                        as={
                            <TextField
                            id="passwordRe"
                            helperText={fieldsErrors.passwordRe ? fieldsErrors.passwordRe.message : null}
                            variant="outlined"
                            label="Powtórz hasło"
                            error={fieldsErrors.passwordRe}
                            type="password"
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
                {isInProgress && <CircularProgress/>}
            </Grid>

            <Grid item xs={12} className={classes.centerChildren}>
                <Button variant="contained" color="primary" type="submit" className={classes.margin}>
                    Login
                </Button>
                </Grid>
            </form>
        </Grid>
    </Paper>
    );
}

export default RegisterScreen;