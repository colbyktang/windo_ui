import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import User from '../models/User';

const httpOptions = {
  headers: environment.headers,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = `${environment.API_URL}`;
  currentUser!: User;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const payload = { username: username, password: password };
    return this.http.post(`${this.authUrl}/login`, payload, httpOptions).pipe(
      catchError((err) => {
        return throwError(() => new HttpErrorResponse(err.error));
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    const payload = { username: username, email: email, password: password };
    return this.http.post(
      environment.API_URL + 'signup',
      payload,
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(environment.API_URL + 'signout', {}, httpOptions);
  }
}
