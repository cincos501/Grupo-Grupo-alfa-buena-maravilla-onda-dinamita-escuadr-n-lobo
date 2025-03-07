using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/Usuarios
        [HttpPost]
        public async Task<IActionResult> CrearEmpleado([FromBody] UsuarioDto nuevoUsuarioDto)
        {
            // Validar modelo
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Validar rol permitido
            var rolesPermitidos = new[] { "Cajero", "Mesero", "Cocinero" };
            if (!rolesPermitidos.Contains(nuevoUsuarioDto.Rol))
                return BadRequest("El rol especificado no es válido. Los roles permitidos son: Cajero, Mesero, Cocinero.");

            // Mapear DTO a entidad
            var nuevoUsuario = new Usuario
            {
                Nombre = nuevoUsuarioDto.Nombre,
                Telefono = nuevoUsuarioDto.Telefono,
                Correo = nuevoUsuarioDto.Correo,
                Username = nuevoUsuarioDto.Username,
                Password = nuevoUsuarioDto.Password,
                Rol = nuevoUsuarioDto.Rol
            };

            try
            {
                _context.Usuarios.Add(nuevoUsuario);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error al guardar en la base de datos: {ex.Message}");
            }

            return CreatedAtAction(nameof(ObtenerEmpleadoPorId), new { id = nuevoUsuario.IdUsuario }, nuevoUsuarioDto);
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<IActionResult> ObtenerEmpleados()
        {
            var empleados = await _context.Usuarios
                .Where(u => new[] { "Cajero", "Mesero", "Cocinero" }.Contains(u.Rol))
                .Select(u => new UsuarioDto
                {
                    IdUsuario = u.IdUsuario,
                    Nombre = u.Nombre,
                    Telefono = u.Telefono,
                    Correo = u.Correo,
                    Username = u.Username,
                    Password = u.Password,
                    Rol = u.Rol
                })
                .ToListAsync();

            return Ok(empleados);
        }

        // GET: api/Usuarios/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerEmpleadoPorId(int id)
        {
            var empleado = await _context.Usuarios
                .Where(u => u.IdUsuario == id)
                .Select(u => new UsuarioDto
                {
                    IdUsuario = u.IdUsuario,
                    Nombre = u.Nombre,
                    Telefono = u.Telefono,
                    Correo = u.Correo,
                    Username = u.Username,
                    Password = u.Password,
                    Rol = u.Rol
                })
                .FirstOrDefaultAsync();

            if (empleado == null)
                return NotFound();

            return Ok(empleado);
        }

        // PUT: api/Usuarios/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarEmpleado(int id, [FromBody] UsuarioDto usuarioActualizadoDto)
        {
            if (id != usuarioActualizadoDto.IdUsuario)
                return BadRequest("El ID del usuario no coincide.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Validar rol permitido
            var rolesPermitidos = new[] { "Cajero", "Mesero", "Cocinero" };
            if (!rolesPermitidos.Contains(usuarioActualizadoDto.Rol))
                return BadRequest("El rol especificado no es válido. Los roles permitidos son: Cajero, Mesero, Cocinero.");

            var usuarioActualizado = new Usuario
            {
                IdUsuario = usuarioActualizadoDto.IdUsuario,
                Nombre = usuarioActualizadoDto.Nombre,
                Telefono = usuarioActualizadoDto.Telefono,
                Correo = usuarioActualizadoDto.Correo,
                Username = usuarioActualizadoDto.Username,
                Password = usuarioActualizadoDto.Password,
                Rol = usuarioActualizadoDto.Rol
            };

            _context.Entry(usuarioActualizado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpleadoExiste(id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }

        // DELETE: api/Usuarios/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarEmpleado(int id)
        {
            var empleado = await _context.Usuarios.FindAsync(id);
            if (empleado == null)
                return NotFound();

            _context.Usuarios.Remove(empleado);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Método auxiliar para verificar existencia
        private bool EmpleadoExiste(int id)
        {
            return _context.Usuarios.Any(e => e.IdUsuario == id);
        }
    }

    // DTO para la transferencia de datos
    public class UsuarioDto
    {
        public int IdUsuario { get; set; }

        [Required, StringLength(50)]
        public string Nombre { get; set; }

        [StringLength(50)]
        public string Telefono { get; set; }

        [Required, StringLength(50)]
        [EmailAddress]
        public string Correo { get; set; }

        [Required, StringLength(30)]
        public string Username { get; set; }

        [Required, StringLength(255)]
        public string Password { get; set; }

        [Required, StringLength(50)]
        public string Rol { get; set; }
    }
}
