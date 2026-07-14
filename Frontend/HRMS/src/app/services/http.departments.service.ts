import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpDepartmentsService {

  apiUrl: string = "https://localhost:7262/api/Departments";
  constructor(
    private _http : HttpClient
  ) { }

  getDepartmentsList(){
    return this._http.get(this.apiUrl + "/List");
  }
}
