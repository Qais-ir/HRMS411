import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Employee } from '../../interfaces/employee.interface';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpEmployeesService } from '../../services/http.employees.service';
import { Observable } from 'rxjs';
import { List } from '../../interfaces/list.interface';
import { HttpDepartmentsService } from '../../services/http.departments.service';
import { HttpLookupsService } from '../../services/http.lookups.service';
import { MajorCodes } from '../../enums/lookup.enum';
@Component({
  selector: 'app-employees',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  providers: [DatePipe],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  constructor(private _datePipe: DatePipe,
    private _employeesService: HttpEmployeesService,
    private _departmentsService: HttpDepartmentsService,
    private _lookupsService: HttpLookupsService
  ) {

  }

  // document.getElementById('closeMdoal');
  @ViewChild('closeModal') closeModal: ElementRef | undefined;
  paginationConfig = { itemsPerPage: 5, currentPage: 1 };

  employees: Employee[] = [];


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


  departments: List[] = [];

  positions: List[] = [];

  managers: List[] = [];

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

  loadSaveDialog() {
    this.resetForm();
    this.loadManagersList();
    this.loadDepartmentsList();
    this.loadPositionsList();
  }

  loadManagersList(employeeId?: number) {
    this.managers = [
      { id: null, name: "Select Manager" }
    ];

    this._employeesService.getManagers(employeeId).subscribe({
      next: (res: any) => {
        if (res?.length > 0) {
          res.forEach((x: any) => {
            let manager: List = { id: x.id, name: x.name };
            this.managers.push(manager);
          })
        }
      },
      error: err => {
        console.log(err.error.message ?? err.message ?? "Unexpected Http Error");
      }
    })
  }

  loadDepartmentsList() {
    this.departments = [
      { id: null, name: "Select Department" }
    ];

    this._departmentsService.getDepartmentsList().subscribe({
      next: (res: any) => {
        if (res?.length > 0) {
          res.forEach((x: any) => {
            let department: List = { id: x.id, name: x.name };
            this.departments.push(department);
          })
        }
      },
      error: err => {
        console.log(err.error.message ?? err.message ?? "Unexpected Http Error");
      }
    })
  }

  loadPositionsList() {
    this.positions = [
      { id: null, name: "Select Position" }
    ];

    this._lookupsService.getByMajorCode(MajorCodes.Positions).subscribe({
      next: (res: any) => {
        if (res?.length > 0) {
          res.forEach((x: any) => {
            let position: List = { id: x.id, name: x.name };
            this.positions.push(position);
          })
        }
      },
      error: err => {
        console.log(err.error.message ?? err.message ?? "Unexpected Http Error");
      }
    })
  }
  loadEmployees() {
    this.employees = [];
    this._employeesService.getByCriteria().subscribe({
      // Successful : 200
      next: (res: any) => {
        if (res?.length > 0) {
          res.forEach((emp: any) => {

            let employee: Employee = {
              id: emp.id,
              firstName: emp.firstName,
              lastName: emp.lastName,
              birthdate: emp.birthDate,
              email: emp.email,
              salary: emp.salary,
              isActive: emp.isActive,
              positionId: emp.positionId,
              positionName: emp.positionName,
              departmentId: emp.departmentId,
              departmentName: emp.departmentName,
              managerId: emp.managerId,
              managerName: emp.managerName,
              userId: emp.userId
            };

            this.employees.push(employee);
          })
        }
      },
      // Faild : 404, 400, 500, 401
      error: err => {
        console.log(err.error.message ?? err.message ?? "Unexpected Http Error");
      }
    });
  }


  saveEmployee() {
    // Add Employee
    if (!this.employeeForm.value.id) {
      let emp: Employee = {
        id: 0,
        firstName: this.employeeForm.value.firstName,
        lastName: this.employeeForm.value.lastName,
        email: this.employeeForm.value.email,
        birthdate: this.employeeForm.value.birthdate,
        salary: this.employeeForm.value.salary,
        phone: this.employeeForm.value.phone,
        startDate: this.employeeForm.value.startDate,
        endDate: this.employeeForm.value.endDate,
        departmentId: this.employeeForm.value.departmentId,
        managerId: this.employeeForm.value.managerId,
        positionId: this.employeeForm.value.positionId,
        isActive: this.employeeForm.value.isActive
      };

      //this.employees.push(emp);
      this._employeesService.add(emp).subscribe({
        next: res => {
          this.loadEmployees();
          this.closeModal?.nativeElement.click();
          this.resetForm();
        },
        // Faild : 404, 400, 500, 401
        error: err => {
          console.log(err.error.message ?? err.message ?? "Unexpected Http Error");
        }
      })
      // click close button => Dialog Close

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

  removeEmployee(id: number) {
    let index = this.employees.findIndex(x => x.id == id);
    this.employees.splice(index, 1);
  }

  changePage(pageNumber: number) {
    this.paginationConfig.currentPage = pageNumber;
  }
}


