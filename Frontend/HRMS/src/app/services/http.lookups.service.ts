import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpLookupsService {

    apiUrl: string = "https://localhost:7262/api/Lookups";

  constructor(
    private _http : HttpClient
  ) { }

  getByMajorCode(majorCode : number){
    return this._http.get(this.apiUrl + `/${majorCode}`)
  }
}
