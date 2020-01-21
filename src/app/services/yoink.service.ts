import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import {
  FileTransfer,
  FileUploadOptions
} from '@ionic-native/file-transfer/ngx';
import { Post } from '../models/post';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class YoinkService {
  url: string = 'https://yoinkapi.herokuapp.com';
  serverUrl: string = 'http://109.74.192.57:5000';
  image: string;

  CurrentUserToken: string;

  constructor(private _http: HttpClient, private transfer: FileTransfer) {
    // transfer link from Heroku to our server, comment out line below to relink to Heroku
    this.url = this.serverUrl;
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

  createPost = (token, post, img) => {
    let headers = {
      Authorization: `Bearer ${token}`
    };

    const uploadOptions: FileUploadOptions = {
      fileKey: 'image',
      params: {
        user_id: post.user_id,
        title: post.title,
        description: post.description,
        category: post.category,
        locality: post.locality,
        storeName: post.storeName,
        discountedPrice: post.discountedPrice,
        price: post.price
      },
      headers
    };

    const fileTransfer = this.transfer.create();
    return fileTransfer.upload(
      img,
      `http://109.74.192.57:5000/api/posts/create/post`,
      uploadOptions
    );
  };

  register = user => {
    return this._http.post(`${this.url}/api/register`, user);
  };

  login = (email, password) => {
    let user = {
      email,
      password
    };
    return this._http.post(`${this.url}/api/login`, user);
  };

  getFeed = (token, page, amount) => {
    const access_token = this.httpsOptions(token);
    return this._http.get(
      `${this.url}/api/posts?page=${page}&amount=${amount}`,
      access_token
    );
  };

  getSingleUser = (userId, token): Observable<User> => {
    const access_token = this.httpsOptions(token);

    return this._http.get<User>(`${this.url}/api/user/${userId}`, access_token);
  };

  getFollowers = (token, id) => {
    const access_token = this.httpsOptions(token);

    return this._http.get(`${this.url}/api/user/followers/${id}`, access_token);
  };

  followUser = (token, userAuthId, user_id) => {
    const access_token = this.httpsOptions(token);

    return this._http.post(
      `${this.url}/api/user/follow/${user_id}`,
      { user_id: userAuthId },
      access_token
    );
  };

  unfollowUser = (token, userAuthId, user_id) => {
    const access_token = this.httpsOptions(token);

    return this._http.post(
      `${this.url}/api/user/unfollow/${user_id}`,
      { user_id: userAuthId },
      access_token
    );
  };

  getFollowing = (token, id) => {
    const access_token = this.httpsOptions(token);

    return this._http.get(`${this.url}/api/user/following/${id}`, access_token);
  };

  favouritePost = (userId, postId, token) => {
    const access_token = this.httpsOptions(token);
    return this._http.post(
      `${this.url}/api/posts/favourite/${postId}`,
      { user_id: userId },
      access_token
    );
  };

  unFavouritePost = (userId, postId, token) => {
    const access_token = this.httpsOptions(token);
    return this._http.post(
      `${this.url}/api/posts/unfavourite/${postId}`,
      { user_id: userId },
      access_token
    );
  };

  likePost = (userId, postId, token) => {
    const access_token = this.httpsOptions(token);
    return this._http.post(
      `${this.url}/api/posts/like/${postId}`,
      { user_id: userId },
      access_token
    );
  };

  forgot = email => {
    let user = {
      email: email
    };
    return this._http.post(`${this.serverUrl}/api/login/forgot-password`, user);
  };

  updatePassword = (email, newPassword) => {
    let user = {
      email: email,
      newPassword: newPassword
    };
    return this._http.post(`${this.serverUrl}/api/login/update-password`, user);
  };

  getSinglePost = (id, token): Observable<Post> => {
    const access_token = this.httpsOptions(token);
    return this._http.post<Post>(
      `${this.url}/api/posts/${id}`,
      null,
      access_token
    );
  };

  postComment = (id, token, newComment) => {
    const access_token = this.httpsOptions(token);

    return this._http.post<Post>(
      `${this.url}/api/posts/${id}`,
      null,
      access_token
    );
  };

  getCategories(){
    const access_token = this.httpsOptions(this.CurrentUserToken);

    return this._http.get<Category[]>(
      `${this.url}/api/posts/category/`,
      access_token
    );
  }
}
