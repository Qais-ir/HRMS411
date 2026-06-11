using HRMS.DbContexts;
using HRMS.Dtos.Auth;
using HRMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HRMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly HRMSContext _dbContext;

        public AuthController(HRMSContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {

            var user = _dbContext.Users.FirstOrDefault(x => x.Username.ToUpper() == loginDto.Username.ToUpper());

            if(user == null)
            {
                return Unauthorized("Invalid Username Or Password"); // 401
            }

            // Password : Admin@123 == $2a$11$MrxvTd2zK9tuUQVfS89qluEIas7KKA0TZCjE5L6HTQVP4zCDTSVz.
            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.HashedPassword))
            {
                return Unauthorized("Invalid Username Or Password"); // 401
            }

            // Token
            string token = GenerateJwtToken(user);

            return Ok(token);
        }

        private string GenerateJwtToken(User user)
        {
            // Claims --> User Info
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier , user.Id.ToString())); // User Id
            claims.Add(new Claim(ClaimTypes.Name, user.Username)); // Username

            // Role --> Admin, Hr, Developer
            if (user.IsAdmin)
            {
                claims.Add(new Claim(ClaimTypes.Role, "Admin"));
            }
            else
            {
               // var employee = _dbContext.Employees.FirstOrDefault(x => x.UserId)
            }


            // Secert Key
            // "WHAFWEI#!@S!!112312WQEQW@RWQEQW432" => [67, 55, 31...]
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("WHAFWEI#!@S!!112312WQEQW@RWQEQW432"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            var tokenSettings = new JwtSecurityToken(
                    claims : claims,
                    signingCredentials: creds,
                    expires: DateTime.Now.AddDays(1)
                );


            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.WriteToken(tokenSettings);

            return token;
        }
    }
}
