import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpEmployeesService {

  apiUrl: string = "https://localhost:7262/api/Employees";

  constructor(
    private _http : HttpClient
  ) { }

  getByCriteria(){
    let params = new HttpParams();
    params = params.set("PositionId", "");
    params = params.set("Name", "");
    params = params.set("IsActive", "");
    return this._http.get(this.apiUrl + "/GetByCriteria", {params});
  }

  getManagers(employeeId?: number){
    let params = new HttpParams();
    params = params.set("employeeId", employeeId ?? "");

    return this._http.get(this.apiUrl + "/Managers", {params});
  }

  add(employee : Employee){
    return this._http.post(this.apiUrl, employee);
  }
  
}
