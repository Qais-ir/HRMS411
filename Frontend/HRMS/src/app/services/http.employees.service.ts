import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpEmployeesService {

  constructor(
    private _http : HttpClient
  ) { }

  getByCriteria(){
    let params = new HttpParams();
    params = params.set("PositionId", "");
    params = params.set("Name", "");
    params = params.set("IsActive", "");
    return this._http.get("https://localhost:7262/api/Employees/GetByCriteria", {params});
  }
}
