import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    console.log('AuthGuard: isAuthenticated =', isAuthenticated);
    console.log('AuthGuard: JWT in localStorage =', localStorage.getItem('jwt'));
    if (isAuthenticated) {
      return true;
    } else {
      console.log('User not authenticated, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }
  }
}