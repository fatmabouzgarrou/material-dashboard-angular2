import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Login response received in AuthService:', response);
        if (response && response.jwt) {
          localStorage.setItem('jwt', response.jwt);
          console.log('Token stored in localStorage:', response.jwt);
        } else {
          console.error('JWT not found in login response:', response);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');
    console.log('Checking authentication, token exists:', !!token);
    return !!token;
  }

  getToken(): string | null {
    const token = localStorage.getItem('jwt');
    console.log('Retrieved token from localStorage:', token);
    return token;
  }

  logout(): void {
    console.log('Logging out, removing token from localStorage');
    localStorage.removeItem('jwt');
  }

  generateOtp(): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    });
    return this.http.post(`${this.apiUrl}/otp/generate`, {}, { headers, responseType: 'text' });
  }

  verifyOtp(otpData: { otp: string, username: string }): Observable<string> {
    return this.http.post(`${this.apiUrl}/otp/verify`, otpData, { responseType: 'text' });
  }

  getFraudData(): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    });
    return this.http.get(`${this.apiUrl}/fraud`, { headers, responseType: 'text' });
  }
}