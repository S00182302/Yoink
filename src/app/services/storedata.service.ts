import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StoredataService {
  constructor(private storage: Storage) {}

  getImages = () => {
    return this.storage.get('images');
  };

  setImagePath = image => {
    this.storage.remove('image');
    return this.storage.set('image', image);
  };

  getImagePath = () => {
    return this.storage.get('image');
  };

  clearAuth = () => {
    return this.storage.remove('userAuth');
  };

  setAuth = (id, token) => {
    const userAuth = {
      id,
      token
    };

    return this.storage.set('userAuth', userAuth);
  };

  getAuth = () => {
    return this.storage.get('userAuth');
  };
}
