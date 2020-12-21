import LoginScreen from './screens/login/LoginScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <LoginScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
