import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { ConfirmationDialogComponent } from '../../shared-components/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-employees',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, ConfirmationDialogComponent],
  providers: [DatePipe],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit{

  constructor(private _datePipe: DatePipe,
    private _employeesService: HttpEmployeesService,
    private _departmentsService: HttpDepartmentsService,
    private _lookupsService: HttpLookupsService
  ) {
    //this.loadPositionsList();
    //this.loadEmployees();
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

  employeeStatus = [
    {value : null, name: "Select Status"},
    {value : true, name: "Active"},
    {value : false, name: "Inactive"},
  ];

  showConfirmationDialog : boolean = false;
  idToBeDeleted : number | null = null;

  deleteDialogTitle : string = "Delete Confirmation";
  deleteDialogBody : string = "Are you sure you want to delete this employee?";

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

  searchFilterForm: FormGroup = new FormGroup({
    name: new FormControl(null),
    positionId: new FormControl(null),
    status: new FormControl(null)
  });


  ngOnInit(){
    this.loadPositionsList();
    this.loadEmployees();
  }

  loadSaveDialog(employeeId?: number) {
    this.resetForm();
    this.loadManagersList(employeeId);
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

    let searchObj = {
      name: this.searchFilterForm.value.name,
      positionId:this.searchFilterForm.value.positionId,
      status: this.searchFilterForm.value.status
    };
    
    this._employeesService.getByCriteria(searchObj).subscribe({
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
      let emp: Employee = {
        id: this.employeeForm.value.id ?? 0,
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

    // Add Employee
    if (!this.employeeForm.value.id) {

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
      this._employeesService.update(emp).subscribe({
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

    }

  }

  resetForm() {
    this.employeeForm.reset({
      isActive: false
    })
  }

  loadEmployeeForm(id: number) {
    this.loadSaveDialog(id);

    this._employeesService.getById(id).subscribe({
      next: (employee: any) => {
        if (employee != null) {
          this.employeeForm.patchValue({
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            birthdate: this._datePipe.transform(employee.birthDate, 'yyyy-MM-dd'), // yyyy-MM-dd
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
      },
      // Faild : 404, 400, 500, 401
      error: err => {
        console.log(err.error.message ?? err.message ?? "Unexpected Http Error");
      }
    })


  }

  removeEmployee() {
    if(!this.idToBeDeleted){
      return;
    }
    
    this._employeesService.delete(this.idToBeDeleted).subscribe({
      next: res => {
        this.loadEmployees();
      },
      error: err => {
        console.log(err.error.message ?? err.message ?? "Unexpected Http Error");
      }
    })
  }

  changePage(pageNumber: number) {
    this.paginationConfig.currentPage = pageNumber;
  }

  showConfirmDialog(id:number){
    this.showConfirmationDialog = true;
    this.idToBeDeleted = id;
  }

  confirmEmployeeDelete(isConfirmed : boolean){
    if(isConfirmed){
      this.removeEmployee();
    }

    this.idToBeDeleted = null;
    this.showConfirmationDialog = false;
  }

  ngAfterViewInit(){
    debugger;
  }

  ngAfterViewChecked(){
     debugger;
  }

  ngOnDestroy(){
    debugger;
  }
}


