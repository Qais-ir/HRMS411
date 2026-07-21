import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getByCriteria(searchObj : any){

    // let token = localStorage.getItem("token");
    // let headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);

    let params = new HttpParams();
    params = params.set("PositionId", searchObj.positionId ?? "");
    params = params.set("Name", searchObj.name ?? "");
    params = params.set("Status", searchObj.status ?? "");
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
  
  getById(id : number){
    return this._http.get(this.apiUrl + `/${id}`);
  }

  update(employee : Employee){
      return this._http.put(this.apiUrl, employee);
  }

  delete(id : number){
    return this._http.delete(this.apiUrl + `/${id}`)
  }
}
