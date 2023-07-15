import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly auth: Auth, private readonly router: Router) {}

  canActivate(): boolean {
    if (this.auth.currentUser) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}