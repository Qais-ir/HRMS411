using HRMS.Dtos.Departments;
using HRMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HRMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        public static List<Department> departments = new List<Department>()
        {
            new Department(){Id = 1, Name = "Human Resources", Description = "HR Department", FloorNumber = 1},
            new Department(){Id = 2, Name = "Finance", Description = "Finance Department", FloorNumber = 2},
            new Department(){Id = 3, Name = "Development", Description = "Development Department", FloorNumber = 1}
        };

        [HttpGet("GetByCriteria")]
        public IActionResult GetByCriteria(string? name, int? floorNumber) // name = Human Resources, floorNumber = 2
        {

            var data = from dep in departments
                       where (name == null || dep.Name.Contains(name, StringComparison.OrdinalIgnoreCase)) && (floorNumber == null || dep.FloorNumber == floorNumber)
                       orderby dep.Id descending
                       select new DepartmentDto
                       {
                           Id = dep.Id,
                           Name = dep.Name,
                           Description = dep.Description,
                           FloorNumber = dep.FloorNumber
                       };

            return Ok(data);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(long id)
        {
            var department = departments.Select(x => new DepartmentDto
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                FloorNumber = x.FloorNumber
            }).FirstOrDefault(x => x.Id == id);

            if(department == null)
            {
                return NotFound("Department Not Found");
            }

            return Ok(department);
        }

        [HttpPost]
        public IActionResult Add([FromBody] SaveDepartmentDto departmentDto)
        {
            var department = new Department
            {
                Id = (departments.LastOrDefault()?.Id ?? 0) + 1,
                Name = departmentDto.Name,
                Description = departmentDto.Description,
                FloorNumber = departmentDto.FloorNumber
            };

            departments.Add(department);

            return Ok(department.Id);
        }

        [HttpPut]
        public IActionResult Update([FromBody] SaveDepartmentDto departmentDto)
        {
            var department = departments.FirstOrDefault(x => x.Id == departmentDto.Id);

            if(department == null)
            {
                return NotFound("Department Does Not Exist");
            }

            department.Name = departmentDto.Name;
            department.Description = departmentDto.Description;
            department.FloorNumber = departmentDto.FloorNumber;

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var department = departments.FirstOrDefault(x => x.Id == id);

            if (department == null)
            {
                return NotFound("Department Does Not Exist");
            }

            departments.Remove(department);
            return Ok();
        }
    }
}
