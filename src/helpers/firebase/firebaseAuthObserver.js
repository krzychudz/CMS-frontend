import 'firebase/auth';
import firebaseApp from '../../firebaseConfig';
import axios from "axios";

const auth = firebaseApp.auth();

export function onAuthStateChange() {
    return auth.onAuthStateChanged(user => {
      if (user) {
        auth.currentUser.getIdToken().then(idToken => {
          localStorage.setItem('isUserLoggedIn', 'true');
          axios.defaults.headers.common['Authorization'] = idToken;
        }).catch();
      } else {
          delete axios.defaults.headers.common['Authorization'];
          localStorage.removeItem('isUserLoggedIn');
      }
    });
}