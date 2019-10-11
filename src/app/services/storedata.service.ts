import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StoredataService {
  userId: string = '';
  userToken: string = '';
  constructor(private storage: Storage) {}

  setToken = (id, token) => {
    const userAuth = {
      id,
      token
    };

    this.storage.set('userAuth', userAuth);
  };

  getAuth = () => {
    return this.storage.get('userAuth');
  };
  getToken = () => {
    return this.storage.get('token');
  };

  setUserID = id => {
    this.storage.set('user_id', id);
  };
  getUserID = () => {
    return this.storage.get('user_id');
  };
}
