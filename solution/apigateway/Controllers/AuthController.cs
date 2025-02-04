using APIGateway.Models;
using APIGateway.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace APIGateway.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtService _jwtService;
        private readonly RedisService _redisService;

        public AuthController(ApplicationDbContext context, JwtService jwtService, RedisService redisService)
        {
            _context = context;
            _jwtService = jwtService;
            _redisService = redisService;
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] User user)
        {
            if (_context.Users.Any(u => u.Username == user.Username))
            {
                return BadRequest("El usuario ya existe.");
            }

            // Hash de la contraseña
            using (var sha256 = SHA256.Create())
            {
                var hashedPassword = sha256.ComputeHash(Encoding.UTF8.GetBytes(user.Password));
                user.Password = Convert.ToBase64String(hashedPassword);
            }

            _context.Users.Add(user);
            _context.SaveChanges();

            var token = _jwtService.GenerateJwtToken(user);

            return Ok(new
            {
                Message = "Usuario registrado correctamente.",
                Token = token
            });

        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginUser)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == loginUser.Username);
            if (user == null)
            {
                return Unauthorized("Usuario no encontrado.");
            }

            // Verifica la contraseña
            using (var sha256 = SHA256.Create())
            {
                var hashedPassword = sha256.ComputeHash(Encoding.UTF8.GetBytes(loginUser.Password));
                if (Convert.ToBase64String(hashedPassword) != user.Password)
                {
                    return Unauthorized("Contraseña incorrecta.");
                }
            }

            var token = _jwtService.GenerateJwtToken(user);

            // Almacenar en Redis
            _redisService.SetValue(user.Username, token);

            return Ok(new { Token = token });
        }

        [Authorize]
        [HttpGet("test")]
        public IActionResult TestApi()
        {
            return Ok("API de prueba funcionando.");
        }
    }
}
