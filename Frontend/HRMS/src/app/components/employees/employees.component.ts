import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../interfaces/employee.interface';
@Component({
  selector: 'app-employees',
  imports: [CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  employees : Employee[] = [
   { 
      id: 1, firstName: "Emp", lastName: "1", birthdate: new Date(2000,1,1), email: 'Emp1@gmail.com', salary: 1000, isActive: false,
      positionId: 1, positionName: 'Developer', departmentId: 1, departmentName: 'IT', userId: 1, 
      managerId: null , managerName: null
    },
    { id: 2, firstName: "Emp", lastName: "2", birthdate: new Date(1995,1,1), email: 'Emp2@gmail.com', salary: 1500, isActive: true,
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 2, 
      managerId: null, managerName: null
    },
    { id: 3, firstName: "Emp", lastName: "3", birthdate: new Date(1998,5,2), email: 'Emp3@gmail.com', salary: 1800, isActive: true,
      positionId: 1, positionName: 'Developer', departmentId: 1, departmentName: 'IT', userId: 3, 
      managerId: null, managerName: null
    },
    { id: 4, firstName: "Emp", lastName: "4", birthdate: new Date(1995,1,2), email: 'Emp4@gmail.com', salary: 1200, isActive: false,
      positionId: 1, positionName: 'Developer', departmentId: 1, departmentName: 'IT', userId: 4, 
      managerId: 3, managerName: "Emp 3"
    },
    { id: 5, firstName: "Emp", lastName: "5", birthdate: new Date(2001,11,25), email: 'Emp5@gmail.com', salary: 800, isActive: true,
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5, 
      managerId: 2, managerName: "Emp 2"
    }

  ];


  employeesTableColumns: string[] = [
    "Name",
    "Position",
    "Birhtdate",
    "Status",
    "Email",
    "Salary",
    "Department",
    "Manager"
  ]
}


