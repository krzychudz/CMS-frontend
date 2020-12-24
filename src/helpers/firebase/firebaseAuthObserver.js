import 'firebase/auth';
import firebaseApp from '../../firebaseConfig';

const auth = firebaseApp.auth();

export function onAuthStateChange() {
    return auth.onAuthStateChanged(user => {
      if (user) {
        auth.currentUser.getIdToken().then(idToken => {
            console.log(idToken);
        }).catch();
      } else {
        console.log("The user is not logged in");
      }
    });
}