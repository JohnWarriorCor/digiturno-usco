import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NavbarHiddenService } from 'src/app/services/navbar-hidden.service';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css'],
})
export class NavbarAdminComponent implements OnInit {
  panelOpenState = false;
  uid: string = '';

  isHandset$: Observable<any> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    private router: Router,
    public navbarHiddenService: NavbarHiddenService
  ) {}

  logout(): void {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        const Toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', swal.stopTimer);
            toast.addEventListener('mouseleave', swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Sesión cerrada correctamente.',
        });
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        // An error happened.
      });
  }

  ngOnInit() {
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

  toggle() {
    this.navbarHiddenService.toggleSideBar();
  }
}
