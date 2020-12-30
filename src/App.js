import LoginScreen from './screens/login/LoginScreen';
import RegisterScreen from './screens/register/RegisterScreen';
import HomeScreen from './screens/home/HomeScreen';
import ProducstManagement from './screens/products_management/ProductsManagement';
import ProductDetailsScreen from './screens/product_details/ProductDetailsScreen';
import MainAppBar from './components/toolbar';
import mainTheme from './muiTheme';

import { ThemeProvider } from '@material-ui/core/styles';
import { onAuthStateChange } from './helpers/firebase/firebaseAuthObserver';
import { useHistory } from "react-router-dom";
import React, { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NotFoundScreen from './screens/not_found/NotFoundScreen';

function App() {
  
  useEffect(() => {
    console.log("ello");
    const unsubscribe = onAuthStateChange();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ThemeProvider theme = { mainTheme }>
      <Router>

      <MainAppBar />

        <Switch>
          <Route exact path="/register">
            <RegisterScreen />
          </Route>
          <Route exact path="/login">
            <LoginScreen />
          </Route>
          <Route exact path="/products_management">
            <ProducstManagement />
          </Route>
          <Route exact path="/product_details">
            <ProductDetailsScreen />
          </Route>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route>
            <NotFoundScreen />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
