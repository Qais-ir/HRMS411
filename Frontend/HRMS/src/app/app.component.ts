import { Component } from '@angular/core';
import { EmployeesComponent } from './components/employees/employees.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  // Module, component, dirctive, pipes
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router : Router){

  }

  showNavBar(){
    return this.router.url !== '/login';
  }
}
