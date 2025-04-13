import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://votre-api-url/api/auth/login'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(this.apiUrl, { email, password })
      .pipe(
        tap((response) => {
          if (response.token) {
            this.saveToken(response.token);
          }
        }),
        catchError((error) => {
          console.error('Erreur lors de la connexion :', error);
          return throwError(error);
        })
      );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}