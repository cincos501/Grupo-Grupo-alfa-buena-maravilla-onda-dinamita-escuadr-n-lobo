using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly AppDbContext _context;

    public LoginController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    [Route("Authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] LoginRequest loginRequest)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest("Datos inválidos.");
        }

        // Buscar como Usuario (por Username y Password)
        var usuario = _context.Usuarios
            .FirstOrDefault(u =>
                (u.Username == loginRequest.UsernameOrEmail || u.Correo == loginRequest.UsernameOrEmail)
                && u.Password == loginRequest.Password);

        if (usuario != null)
        {
            // Generar respuesta para Usuario
            var response = new LoginResponse
            {
                Id = usuario.IdUsuario,
                Nombre = usuario.Nombre,
                Rol = usuario.Rol,
                RedirectUrl = GetRedirectUrl(usuario.Rol)
            };

            return Ok(response);
        }

        // Buscar como Cliente (por Correo y Password)
        var cliente = _context.Clientes
            .FirstOrDefault(c =>
                c.Correo == loginRequest.UsernameOrEmail && c.Password == loginRequest.Password);

        if (cliente != null)
        {
            // Generar respuesta para Cliente
            var response = new LoginResponse
            {
                Id = cliente.IdCliente,
                Nombre = cliente.Nombre,
                Rol = "Cliente",
                RedirectUrl = GetRedirectUrl("Cliente")
            };

            return Ok(response);
        }

        // Si no se encuentra ni como usuario ni como cliente
        return Unauthorized("Credenciales incorrectas.");
    }

    // Método para definir la URL según el rol
    private string GetRedirectUrl(string rol)
    {
        return rol switch
        {
            "Gerente" => "/Gerente",
            "Cajero" => "/Cajero",
            "Mesero" => "/Mesero",
            "Cliente" => "/Cliente",
            _ => "/login" // Por defecto redirige al login
        };
    }

    // Nuevo método para registrar clientes
    [HttpPost]
    [Route("RegisterCliente")]
    public async Task<IActionResult> RegisterCliente([FromBody] ClienteRegisterRequest registerRequest)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest("Datos inválidos.");
        }

        // Verificar si ya existe un cliente con el correo proporcionado
        var existingCliente = _context.Clientes.FirstOrDefault(c => c.Correo == registerRequest.Correo);
        if (existingCliente != null)
        {
            return Conflict("El correo proporcionado ya está registrado.");
        }

        // Crear un nuevo cliente
        var nuevoCliente = new Cliente
        {
            Nombre = registerRequest.Nombre,
            Telefono = registerRequest.Telefono,
            Correo = registerRequest.Correo,
            Password = registerRequest.Password // Idealmente, deberías cifrar esta contraseña
        };

        _context.Clientes.Add(nuevoCliente);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            Message = "Registro exitoso",
            IdCliente = nuevoCliente.IdCliente
        });
    }
}

public class LoginRequest
{
    [Required, StringLength(50)]
    public string UsernameOrEmail { get; set; } // Cambiado para aceptar username o correo

    [Required, StringLength(255)]
    public string Password { get; set; }
}

public class LoginResponse
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Rol { get; set; }
    public string RedirectUrl { get; set; }
}

// Nuevo modelo para la solicitud de registro de cliente
public class ClienteRegisterRequest
{
    [Required, StringLength(50)]
    public string Nombre { get; set; }

    [StringLength(50)]
    public string Telefono { get; set; }

    [Required, StringLength(50)]
    [EmailAddress]
    public string Correo { get; set; }

    [Required, StringLength(255)]
    public string Password { get; set; }
}
