import LoginScreen from './screens/login/LoginScreen';
import RegisterScreen from './screens/register/RegisterScreen';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NotFoundScreen from './screens/not_found/NotFoundScreen';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register">
          <RegisterScreen />
        </Route>
        <Route exact path="/">
          <LoginScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
