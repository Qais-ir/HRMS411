using HRMS.DbContexts;
using HRMS.Dtos.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HRMS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LookupsController : ControllerBase
    {
        public readonly HRMSContext _dbContext;
        public LookupsController(HRMSContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("{majorCode}")]
        public IActionResult GetByMajorCode(int majorCode)
        {
            var data = from lookup in _dbContext.Lookups
                       where lookup.MajorCode == majorCode && lookup.MinorCode != 0
                       select new ListDto
                       {
                           Id = lookup.Id,
                           Name = lookup.Name,
                       };

            return Ok(data);
        }

    }
}
