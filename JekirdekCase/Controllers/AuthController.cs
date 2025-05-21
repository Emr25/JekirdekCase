using Application.Models;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto dto)
        {
            var result = await _userService.RegisterAsync(dto);
            if (!result)
                return BadRequest("Kullanıcı adı zaten mevcut.");
            return Ok("Kayıt başarılı.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            var token = await _userService.LoginAsync(dto);
            if (token == null)
                return Unauthorized("Kullanıcı adı veya şifre hatalı.");
            return Ok(new { Token = token });
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Sunucu tarafında JWT için genelde yapılacak bir işlem yok
            // Ama token'ı client'ta silebilirler, burası sadece bilgi mesajı döner
            return Ok(new { Message = "Çıkış yapıldı. Token'ı frontend'den silmeyi unutmayın." });
        }
    }
}
