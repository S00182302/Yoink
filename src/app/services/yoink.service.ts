import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';

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

  httpsOptions = token => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return httpOptions;
  };

  register = user => {
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

  getFeed = (token, page, perPage) => {
    const access_token = this.httpsOptions(token);
    return this._http.post(
      `${this.url}/posts/feed?page=${page}&perPage=${perPage}`,
      null,
      access_token
    );
  };

  getSingleUser = (userId, token): Observable<User> => {
    const access_token = this.httpsOptions(token);

    return this._http.get<User>(`${this.url}/user/${userId}`, access_token);
  };

  getFollowers = (token, id) => {
    const access_token = this.httpsOptions(token);

    return this._http.post(
      `${this.url}/follow/followers`,
      { user_id: id },
      access_token
    );
  };

  getFollowing = (token, id) => {
    const access_token = this.httpsOptions(token);

    return this._http.post(
      `${this.url}/follow/following`,
      { user_id: id },
      access_token
    );
  };

  favouritePost = (userId, postId, token) => {
    const access_token = this.httpsOptions(token);
    return this._http.post(
      `${this.url}/posts/favourite/${postId}`,
      { user_id: userId },
      access_token
    );
  };

  likePost = (userId, postId, token) => {
    const access_token = this.httpsOptions(token);
    return this._http.post(
      `${this.url}/posts/like/${postId}`,
      { user_id: userId },
      access_token
    );
  };
}
