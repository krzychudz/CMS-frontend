import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        textAlign: 'start'
    },
}));


const MainAppBar = withRouter(({ history }) => {

    const classes = useStyles();
    const [shouldDisplayLoginButton, setLoginButtonVisibility] = useState(true);

    useEffect(() => {
        const unsubscribe = history.listen((location, action) => {
            console.log(location.pathname);
            setLoginButtonVisibility(location.pathname !== '/login' && location.pathname !== '/register')
        });
        return () => {
            unsubscribe();
        };
    }, []);



    return (

        <AppBar position="static" color="secondary">
            <Toolbar>
                <Button color="inherit" onClick={() => history.replace('/')} >Home</Button>

                <Box className={classes.title}> </Box>
                {shouldDisplayLoginButton ?
                    false
                        ? <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit">
                            <AccountCircle />
                        </IconButton>
                        : <Button color="inherit" onClick={() => history.push('/login')} >Zaloguj się</Button>
                    : null
                }

            </Toolbar>
        </AppBar>
    )
});

export default MainAppBar;