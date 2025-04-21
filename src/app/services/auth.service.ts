import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  logout(): void {
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