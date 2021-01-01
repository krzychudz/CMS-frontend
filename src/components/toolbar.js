import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import 'firebase/auth';
import firebaseApp from '../firebaseConfig';

const auth = firebaseApp.auth();

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        textAlign: 'start'
    },
    homeIcon: {
        width: '40px',
        height: '40px'
    }
}));


const MainAppBar = withRouter(({ history }) => {

    const classes = useStyles();
    const [shouldDisplayLoginButton, setLoginButtonVisibility] = useState(true);
    const [isUserLoggedIn, setUserLoggedIn] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleProfileClick = () => {
        history.replace('/products_management')
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setAnchorEl(null);
            history.replace('/');
        } catch (error) {
            alert("Coś poszło nie tak, spróbuj ponowanie!");
        }
    }

    useEffect(() => {
        const unsubscribe = history.listen((location, action) => {
            setLoginButtonVisibility(location.pathname !== '/login' && location.pathname !== '/register')
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserLoggedIn(true);
            } else {
                setUserLoggedIn(false);
            }
        });
        return () => {
            unsubscribe();
        }
    });



    return (

        <AppBar position="sticky" color="secondary">
            <Toolbar>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => history.replace('/')}>
                    <HomeIcon className={classes.homeIcon}/>
                </IconButton>

                <Box className={classes.title}> </Box>
                {shouldDisplayLoginButton ?
                    isUserLoggedIn
                        ? [<IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleMenu}>
                            <AccountCircle />
                        </IconButton>,
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleMenuClose}>
                            <MenuItem onClick={handleProfileClick}>Moje konto</MenuItem>
                            <MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
                        </Menu>
                        ]
                        : <Button color="inherit" onClick={() => history.push('/login')} >Zaloguj się</Button>
                    : null
                }

            </Toolbar>
        </AppBar>
    )
});

export default MainAppBar;