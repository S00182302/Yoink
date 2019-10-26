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
export class OpenfoodfactsService {
  url: string = ' https://world.openfoodfacts.org/api/v0/product/';

  constructor(private _http: HttpClient) {}

  getData = barcode => {
    return this._http.get(`${this.url}/${barcode}.json`);
  };
}
