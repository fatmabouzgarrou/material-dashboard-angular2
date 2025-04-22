import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  password?: string; // Optional for create/update
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  // Get auth token from local storage (adjust based on your auth setup)
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Adjust key based on your auth
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }
}