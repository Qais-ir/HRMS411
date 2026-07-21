using HRMS.DbContexts;
using HRMS.Dtos.Employees;
using HRMS.Dtos.Shared;
using HRMS.Enums;
using HRMS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HRMS.Controllers
{
    // Data Annotations --> Extra Information
    [Authorize]
    [Route("api/[controller]")] // [controller] --> api/Employees
    [ApiController]
    public class EmployeesController : ControllerBase
    {


        // Dependency Injection
        public readonly HRMSContext _dbContext;

        public EmployeesController(HRMSContext dbContext)
        {
            _dbContext = dbContext;
        }


        // Endpoints --> Methods
        // CRUD Operations : Create, Read, Update, Delete
        [HttpGet("GetByCriteria")]
        public IActionResult GetByCriteria([FromQuery] SearchEmployeeDto searchDto)
        {
            try
            {
                // Extract From Token : Role + UserId
                var role = User.FindFirst(ClaimTypes.Role)?.Value; // Admin, HR, Developer....
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                // Query Syntax
                var data = from emp in _dbContext.Employees
                           from dep in _dbContext.Departments.Where(x => x.Id == emp.DepartmentId).DefaultIfEmpty() // Left Join
                           from man in _dbContext.Employees.Where(x => x.Id == emp.ManagerId).DefaultIfEmpty()
                           from lookup in _dbContext.Lookups.Where(x => x.Id == emp.PositionId).DefaultIfEmpty()
                           where (searchDto.PositionId == null || emp.PositionId == searchDto.PositionId) &&
                           (searchDto.Name == null || emp.FirstName.ToUpper().Contains(searchDto.Name.ToUpper())) &&
                           (searchDto.Status == null || searchDto.Status == emp.IsActive)
                           orderby emp.Id descending
                           select new EmployeeDto // DTO : Data Transfer Object
                           {
                               Id = emp.Id,
                               FirstName = emp.FirstName,
                               LastName = emp.LastName,
                               Name = emp.FirstName + " " + emp.LastName,
                               PositionId = emp.PositionId,
                               PositionName = lookup.Name,
                               BirthDate = emp.BirthDate,
                               StartDate = emp.StartDate,
                               EndDate = emp.EndDate,
                               DepartmentId = dep.Id,
                               DepartmentName = dep.Name,
                               ManagerId = emp.ManagerId,
                               ManagerName = man.FirstName,
                               UserId = emp.UserId,
                               Email = emp.Email,
                               IsActive = emp.IsActive,
                               Salary = emp.Salary,
                           };

                // Filteration Based On User Role
                //if(role?.ToUpper() != "ADMIN" && role?.ToUpper() != "HR")
                //{
                //    data = data.Where(x => x.UserId == long.Parse(userId));
                //}

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Exception(ex.Message));
            }

        }

        [HttpGet("{id}")] // Route Parameter
        public IActionResult GetById(long id)
        {
            try
            {
                //  var data = _dbContext.Employees.Join(
                //    _dbContext.Departments,
                //    employee => employee.DepartmentId,
                //    department => department.Id,
                //    (employee, department) => new EmployeeDto
                //    {
                //        Id = employee.Id,
                //        Name = employee.FirstName + " " + employee.LastName,
                //        Position = employee.Position,
                //        BirthDate = employee.BirthDate,
                //        StartDate = employee.StartDate,
                //        EndDate = employee.EndDate,
                //        DepartmentId = employee.DepartmentId,
                //        DepartmentName = department.Name,
                //    }
                //).FirstOrDefault(x => x.Id == id);

                var data = _dbContext.Employees.Select(x => new EmployeeDto
                {
                    Id = x.Id,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Name = x.FirstName + " " + x.LastName,
                    PositionId = x.PositionId,
                    PositionName = x.Lookup.Name,
                    BirthDate = x.BirthDate,
                    StartDate = x.StartDate,
                    EndDate = x.EndDate,
                    DepartmentId = x.DepartmentId,
                    DepartmentName = x.Department.Name,
                    ManagerId = x.ManagerId,
                    ManagerName = x.Manager.FirstName,
                    UserId = x.UserId,
                    Email = x.Email,
                    IsActive = x.IsActive,
                    Salary = x.Salary,
                    Phone = x.PhoneNumber
                }).FirstOrDefault(x => x.Id == id);

                //var data = _dbContext.Employees.Include(x => x.Department).Include(x => x.Manager).FirstOrDefault(x => x.Id == id);


                if (data == null)
                {
                    return NotFound("Employee Not Found");
                }

                return Ok(data);

            }
            catch (Exception ex)
            {
                return StatusCode(500, new Exception(ex.Message));
            }


        }
        // Include --> Eager Loading
        // Select --> Projection
        // Lazy Loading --> ??

        [Authorize(Roles = "HR,Admin")]
        [HttpPost]
        public IActionResult Add([FromBody] SaveEmployeeDto newEmployee)
        {
            try
            {
                var user = new User()
                {
                    Id = 0,
                    Username = $"{newEmployee.FirstName}_{newEmployee.LastName}_HRMS", // Ahmad Nasser --> Ahmad_Nasser_HRMS
                    HashedPassword = BCrypt.Net.BCrypt.HashPassword($"{newEmployee.FirstName}@123"), // Ahamd ==> Ahmad@123
                    IsAdmin = false
                };
                _dbContext.Users.Add(user);

                var employee = new Employee()
                {
                    Id = 0, //(employees.LastOrDefault()?.Id ?? 0) + 1,
                    FirstName = newEmployee.FirstName,
                    LastName = newEmployee.LastName,
                    PositionId = newEmployee.PositionId,
                    BirthDate = newEmployee.BirthDate,
                    StartDate = newEmployee.StartDate,
                    EndDate = newEmployee.EndDate,
                    Email = newEmployee.Email,
                    IsActive = newEmployee.IsActive,
                    PhoneNumber = newEmployee.Phone,
                    Salary = newEmployee.Salary,
                    DepartmentId = newEmployee.DepartmentId,
                    ManagerId = newEmployee.ManagerId,
                    //UserId = user.Id
                    User = user
                };

                _dbContext.Employees.Add(employee);

                _dbContext.SaveChanges(); // Go To DataBase

                return Ok(employee.Id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Exception(ex.Message));
            }


        }
        [Authorize(Roles = "HR,Admin")]
        [HttpPut]
        public IActionResult Update([FromBody] SaveEmployeeDto updatedEmployee)
        {
            try
            {
                var employee = _dbContext.Employees.FirstOrDefault(x => x.Id == updatedEmployee.Id);
                if (employee == null)
                {
                    return NotFound("Employee Does Not Exist");
                }

                employee.FirstName = updatedEmployee.FirstName;
                employee.LastName = updatedEmployee.LastName;
                employee.PositionId = updatedEmployee.PositionId;
                employee.BirthDate = updatedEmployee.BirthDate;
                employee.StartDate = updatedEmployee.StartDate;
                employee.Email = updatedEmployee.Email;
                employee.IsActive = updatedEmployee.IsActive;
                employee.StartDate = updatedEmployee.StartDate;
                employee.EndDate = updatedEmployee.EndDate;
                employee.Salary = updatedEmployee.Salary;
                employee.DepartmentId = updatedEmployee.DepartmentId;
                employee.ManagerId = updatedEmployee.ManagerId;
                employee.PhoneNumber = updatedEmployee.Phone;

                _dbContext.SaveChanges();


                return Ok();
            }
            catch (Exception ex) {
                return StatusCode(500, new Exception(ex.Message));
            }
        }

         [Authorize(Roles = "HR,Admin")]
        [HttpDelete("{id}")] // Route Parameter
        public IActionResult Delete(long id)
        {
            try
            {

                var employee = _dbContext.Employees.FirstOrDefault(x => x.Id == id);
                if (employee == null)
                {
                    return NotFound("Employee Does Not Exist");
                }

                _dbContext.Employees.Remove(employee);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Exception(ex.Message));
            }


        }

        [HttpGet("Managers")]
        public IActionResult GetManagers([FromQuery] long? employeeId)
        {
            try
            {
                var data = from emp in _dbContext.Employees
                           from pos in _dbContext.Lookups.Where(x => x.Id == emp.PositionId)
                           where emp.IsActive &&
                           pos.MajorCode == (int)LookupMajorCodes.EmployeePositions &&
                           pos.MinorCode == (int)PositionsMinorCodes.Manager &&
                           emp.Id != employeeId
                           select new ListDto
                           {
                               Id = emp.Id,
                               Name = emp.FirstName + " " + emp.LastName
                           };

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Exception(ex.Message));
            }
        }

    }


 
}

// Query Parameter => [FromQuery]
// Request Body => [FromBody]

// Simple Data Type ==> string, int, long... --> (By Default) Query Parameter
// Complix Data Type ==> Model, Dto, Object... --> (By Default) Request Body

// Method Can Use Multiple Parameters Of Type [FromQuery]
// Method Can Not Use Multiple Parameters Of Type [FromBody]

// Http Post/Put : Can Use Both Body Request [FormBody] And Query Parameter [FormQuery], But We Will Only Use [FromBody]
// Http Delete : Can Use Both Body Request [FormBody] And Query Parameter [FormQuery], But We Will Only Use [FromQuery] Or Route Parameter
// Http Get : Can Not Use Body Request [FromBody], We Can Only Use Query Parameter [FromQuery] Or Route Parameter