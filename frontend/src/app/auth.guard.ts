/*import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    console.log('Is logged in:', isLoggedIn); // Ajout du log

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
*/
/*
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('Checking authentication status...');
    const loggedIn = this.authService.isLoggedIn();
    console.log('isLoggedIn:', loggedIn);
    if (!loggedIn) {
      console.log('User is not authenticated. Redirecting to login...');
      this.router.navigate(['/login']);
    }
    return loggedIn;
  }
}*/
/*

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('Checking authentication status...');

    return this.authService.isLoggedIn().pipe(
      map(loggedIn => {
        console.log('isLoggedIn:', loggedIn);
        if (!loggedIn) {
          console.log('User is not authenticated. Redirecting to login...');
          this.router.navigate(['/login']);
        }
        return loggedIn;
      }),
      catchError(error => {
        console.error('Error checking authentication status. Redirecting to login...', error);
        this.router.navigate(['/login']);
        return of(false); // Retourne false si une erreur se produit
      })
    );
  }
}

*/


/*le premier aout
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('Checking authentication status...');

    return this.authService.isLoggedIn().pipe(
      map(loggedIn => {
        console.log('isLoggedIn:', loggedIn);
        if (!loggedIn) {
          console.log('User is not authenticated. Redirecting to login...');
          this.router.navigate(['/login']);
        }
        return loggedIn;
      }),
      catchError(error => {
        console.error('Error checking authentication status. Redirecting to login...', error);
        this.router.navigate(['/login']);
        return of(false); // Retourne false si une erreur se produit
      })
    );
  }
}
*/
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('Checking authentication status...');

    return this.loginService.isLoggedIn().pipe(
      map(loggedIn => {
        console.log('isLoggedIn:', loggedIn);
        if (!loggedIn) {
          console.log('User is not authenticated. Redirecting to login...');
          this.router.navigate(['/login']);
        }
        return loggedIn;
      }),
      catchError(error => {
        console.error('Error checking authentication status. Redirecting to login...', error);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
