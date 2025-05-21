using Application.Models;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {

        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public UserService(AppDbContext context , IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        public async Task<string> LoginAsync(UserLoginDto userLoginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.Username == userLoginDto.Username && u.Password == userLoginDto.Password);

            if (user == null)
                return null;

            //CLAİM
            var claims = new[]
           {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };



            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //TOKEN
            var token = new JwtSecurityToken(
               issuer: _configuration["Jwt:Issuer"],
               audience: _configuration["Jwt:Audience"],
               claims: claims,
               expires: DateTime.UtcNow.AddHours(1),
               signingCredentials: creds
           );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        public async Task<bool> RegisterAsync(UserRegisterDto userRegisterDto)
        {
            var exists = await _context.Users.AnyAsync(u => u.Username == userRegisterDto.Username);
            if (exists) return false;

            var user = new User
            {
                Username = userRegisterDto.Username,
                Password = userRegisterDto.Password, 
                Role = userRegisterDto.Role,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return true;

        }
    }
}
