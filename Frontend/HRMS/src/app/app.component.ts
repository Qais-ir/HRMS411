import { Component } from '@angular/core';
import { EmployeesComponent } from './components/employees/employees.component';
@Component({
  selector: 'app-root',
  // Module, component, dirctive, pipes
  imports: [EmployeesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}
