import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.css'],
})
export class InicioAdminComponent {
  uid: string = '';

  constructor() {
    const sesion = getAuth();
    onAuthStateChanged(sesion, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user}
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        this.uid = user.uid;
        console.log(this.uid, displayName, email, photoURL, emailVerified);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }
}
