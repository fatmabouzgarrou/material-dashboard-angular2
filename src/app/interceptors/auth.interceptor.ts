import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let authReq = req;

    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log('Adding Authorization header:', `Bearer ${token}`);
    } else {
      console.log('No token found, proceeding without Authorization header');
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP error intercepted:', error);
        if (error.status === 401) {
          console.log('Unauthorized access, redirecting to login');
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}