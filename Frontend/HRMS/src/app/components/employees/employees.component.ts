import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Employee } from '../../interfaces/employee.interface';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-employees',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  providers: [DatePipe],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  constructor(private _datePipe: DatePipe) {

  }

  // document.getElementById('closeMdoal');
  @ViewChild('closeModal') closeModal: ElementRef | undefined;
  paginationConfig = {itemsPerPage: 5, currentPage: 1};

  employees: Employee[] = [
    {
      id: 1, firstName: "Emp", lastName: "1", birthdate: new Date(2000, 1, 1), email: 'Emp1@gmail.com', salary: 1000, isActive: false,
      positionId: 1, positionName: 'Developer', departmentId: 1, departmentName: 'IT', userId: 1, phone: "+96278465455",
      managerId: null, managerName: null
    },
    {
      id: 2, firstName: "Emp", lastName: "2", birthdate: new Date(1995, 1, 1), email: 'Emp2@gmail.com', salary: 1500, isActive: true,
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 2,
      managerId: null, managerName: null
    },
    {
      id: 3, firstName: "Emp", lastName: "3", birthdate: new Date(1998, 5, 2), email: 'Emp3@gmail.com', salary: 1800, isActive: true,
      positionId: 1, positionName: 'Developer', departmentId: 1, departmentName: 'IT', userId: 3,
      managerId: null, managerName: null
    },
    {
      id: 4, firstName: "Emp", lastName: "4", birthdate: new Date(1995, 1, 2), email: 'Emp4@gmail.com', salary: 1200, isActive: false,
      positionId: 1, positionName: 'Developer', departmentId: 1, departmentName: 'IT', userId: 4,
      managerId: 3, managerName: "Emp 3"
    },
    {
      id: 5, firstName: "Emp", lastName: "5", birthdate: new Date(2001, 11, 25), email: 'Emp5@gmail.com', salary: 800, isActive: true,
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    },
    {
      id: 5, firstName: "Emp", lastName: "5", birthdate: new Date(2001, 11, 25), email: 'Emp5@gmail.com', salary: 800, isActive: true,
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    },
    {
      id: 5, firstName: "Emp", lastName: "5", birthdate: new Date(2001, 11, 25), email: 'Emp5@gmail.com', salary: 800, isActive: true,
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    },
    {
      id: 5, firstName: "Emp", lastName: "5", birthdate: new Date(2001, 11, 25), email: 'Emp5@gmail.com', salary: 800, isActive: true,
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    },
    {
      id: 5, firstName: "Emp", lastName: "5", birthdate: new Date(2001, 11, 25), email: 'Emp5@gmail.com', salary: 800, isActive: true,
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    },
    {
      id: 5, firstName: "Emp", lastName: "5", birthdate: new Date(2001, 11, 25), email: 'Emp5@gmail.com', salary: 800, isActive: true,
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    },
    {
      id: 5, firstName: "Emp", lastName: "5", birthdate: new Date(2001, 11, 25), email: 'Emp5@gmail.com', salary: 800, isActive: true,
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    },
    {
      id: 5, firstName: "Emp", lastName: "5", birthdate: new Date(2001, 11, 25), email: 'Emp5@gmail.com', salary: 800, isActive: true,
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    },
    {
      id: 5, firstName: "Emp", lastName: "5", birthdate: new Date(2001, 11, 25), email: 'Emp5@gmail.com', salary: 800, isActive: true,
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    },
    {
      id: 5, firstName: "Emp", lastName: "5", birthdate: new Date(2001, 11, 25), email: 'Emp5@gmail.com', salary: 800, isActive: true,
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    },
    {
      id: 5, firstName: "Emp", lastName: "5", birthdate: new Date(2001, 11, 25), email: 'Emp5@gmail.com', salary: 800, isActive: true,
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    },
    {
      id: 5, firstName: "Emp", lastName: "5", birthdate: new Date(2001, 11, 25), email: 'Emp5@gmail.com', salary: 800, isActive: true,
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    },

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
  ];


  departments = [
    { id: null, name: "Select Department" },
    { id: 1, name: "HR" },
    { id: 2, name: "IT" }
  ];

  positions = [
    { id: null, name: "Select Position" },
    { id: 1, name: "Manager" },
    { id: 2, name: "Developer" },
    { id: 3, name: "HR" },
  ];

  managers = [
    { id: null, name: "Select Manager" },
    { id: 1, name: "Emp 1" },
    { id: 2, name: "Emp 2" },
  ];

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    birthdate: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    salary: new FormControl(null),
    phone: new FormControl(null, [Validators.required]),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null),
    departmentId: new FormControl(null),
    positionId: new FormControl(null),
    managerId: new FormControl(null),
    isActive: new FormControl(false, [Validators.required]),
  });


  saveEmployee() {
    // Add Employee
    if (!this.employeeForm.value.id) {
      let emp: Employee = {
        id: (this.employees[this.employees.length - 1]?.id ?? 0) + 1,
        firstName: this.employeeForm.value.firstName,
        lastName: this.employeeForm.value.lastName,
        email: this.employeeForm.value.email,
        birthdate: this.employeeForm.value.birthdate,
        salary: this.employeeForm.value.salary,
        phone: this.employeeForm.value.phone,
        startDate: this.employeeForm.value.startDate,
        endDate: this.employeeForm.value.endDate,
        departmentId: this.employeeForm.value.departmentId,
        departmentName: this.departments.find(x => x.id == this.employeeForm.value.departmentId)?.name,
        managerId: this.employeeForm.value.managerId,
        managerName: this.managers.find(x => x.id == this.employeeForm.value.managerId)?.name,
        positionId: this.employeeForm.value.positionId,
        positionName: this.positions.find(x => x.id == this.employeeForm.value.positionId)?.name ?? "",
        isActive: this.employeeForm.value.isActive
      };

      this.employees.push(emp);
      // click close button => Dialog Close
      this.closeModal?.nativeElement.click();
      this.resetForm();
    }
    // update employee
    else {
      let index = this.employees.findIndex(x => x.id == this.employeeForm.value.id); // return index 
      this.employees[index].firstName = this.employeeForm.value.firstName;
      this.employees[index].lastName = this.employeeForm.value.lastName;
      this.employees[index].email = this.employeeForm.value.email;
      this.employees[index].birthdate = this.employeeForm.value.birthdate;
      this.employees[index].salary = this.employeeForm.value.salary;
      this.employees[index].phone = this.employeeForm.value.phone;
      this.employees[index].startDate = this.employeeForm.value.startDate;
      this.employees[index].endDate = this.employeeForm.value.endDate;
      this.employees[index].departmentId = this.employeeForm.value.departmentId;
      this.employees[index].departmentName = this.departments.find(x => x.id == this.employeeForm.value.departmentId)?.name;
      this.employees[index].positionId = this.employeeForm.value.positionId;
      this.employees[index].positionName = this.positions.find(x => x.id == this.employeeForm.value.positionId)?.name ?? "";
      this.employees[index].managerId = this.employeeForm.value.managerId;
      this.employees[index].managerName = this.managers.find(x => x.id == this.employeeForm.value.managerId)?.name;
      this.employees[index].isActive = this.employeeForm.value.isActive;
            // click close button => Dialog Close
      this.closeModal?.nativeElement.click();
      this.resetForm();
    }

  }

  resetForm() {
    this.employeeForm.reset({
      isActive: false
    })
  }

  loadEmployeeForm(id: number) {
    let employee = this.employees.find(x => x.id == id);

    if (employee != null) {
      this.employeeForm.patchValue({
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        birthdate: this._datePipe.transform(employee.birthdate, 'yyyy-MM-dd'), // yyyy-MM-dd
        salary: employee.salary,
        isActive: employee.isActive,
        startDate: this._datePipe.transform(employee.startDate, 'yyyy-MM-dd'),
        endDate: this._datePipe.transform(employee.endDate, 'yyyy-MM-dd'),
        positionId: employee.positionId,
        departmentId: employee.departmentId,
        managerId: employee.managerId,
        phone: employee.phone
      })
    }
  }

  removeEmployee(id : number){
    let index = this.employees.findIndex(x => x.id == id);
    this.employees.splice(index, 1);
  }

  changePage(pageNumber : number){
    this.paginationConfig.currentPage = pageNumber;
  }
}


