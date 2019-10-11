import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoinkService {
  url: string = 'https://yoinkapi.herokuapp.com';
  constructor(private _http: HttpClient) {}

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return throwError(err.message);
  }

  register = (email, password) => {
    let user = {
      email,
      password
    };
    return this._http.post(`${this.url}/register`, user).pipe(
      map(data => console.log(JSON.stringify(data))),
      catchError(err => throwError(err.error))
    );
  };

  login = (email, password) => {
    let user = {
      email,
      password
    };
    return this._http.post(`${this.url}/login`, user);
  };

  getUserFeed = (_id, token) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this._http.post(`${this.url}/posts/feed/${_id}`, null, httpOptions);
  };

  getSingleUser = (userId, token) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this._http.get(`${this.url}/user/${userId}`, httpOptions);
  };
}
