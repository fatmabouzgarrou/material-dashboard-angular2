import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('Attempting login with credentials:', this.credentials);
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login successful, response:', response);
        if (!this.authService.isAuthenticated()) {
          console.error('User is NOT authenticated after login');
          this.error = 'Authentication failed: No token stored';
          return;
        }
        console.log('User is authenticated after login');
        this.router.navigate(['/dashboard']).then(success => {
          console.log('Navigation to dashboard successful:', success);
          if (!success) {
            console.log('Navigation failed, possible reasons: route not found, redirection blocked, or component error');
          }
        });
      },
      error: (err) => {
        console.error('Login error:', err);
        this.error = err.error || 'Login failed';
      }
    });
  }
}