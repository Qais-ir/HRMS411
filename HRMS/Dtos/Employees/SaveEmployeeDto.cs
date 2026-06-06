namespace HRMS.Dtos.Employees
{
    public class SaveEmployeeDto
    {
        public long? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public long? PositionId { get; set; }
        public DateTime BirthDate { get; set; }
        public string PhoneNumber { get; set; }// 07, +962789
        public bool IsActive { get; set; }
        public DateTime StartDate { get; set; } // Required
        public DateTime? EndDate { get; set; } // (?) => Opteinal / Nullable
        public decimal? Salary { get; set; }
        public long? DepartmentId { get; set; }
        public long? ManagerId { get; set; }
    }
}
