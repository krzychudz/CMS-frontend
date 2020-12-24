import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'

const MainAppBar = withRouter(({ history }) => (
    <AppBar position="static" color="secondary">
        <Toolbar>
            <Button color="inherit" onClick = { () => history.goBack() } >Home</Button>
        </Toolbar>
    </AppBar>
))

export default MainAppBar;