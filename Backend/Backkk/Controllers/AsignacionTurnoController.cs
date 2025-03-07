using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace TuProyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsignacionTurnosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AsignacionTurnosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/AsignacionTurnos
        [HttpGet]
        public async Task<ActionResult> GetUsuariosConTurnos()
        {
            // Obtener los usuarios junto con sus turnos asignados
            var usuariosConTurnos = await _context.Usuarios
                .Include(u => u.Asignaciones)
                    .ThenInclude(at => at.Turno)
                .Select(u => new
                {
                    u.IdUsuario,
                    u.Nombre,
                    u.Username,
                    Turnos = u.Asignaciones.Select(at => new
                    {
                        at.Turno.TipoTurno,
                        at.FechaAsignacion
                    })
                })
                .ToListAsync();

            return Ok(usuariosConTurnos);
        }

        // POST: api/AsignacionTurnos/Asignar
        [HttpPost("Asignar")]
        public async Task<ActionResult> AsignarTurno([FromBody] AsignacionTurnoRequest request)
        {
            // Verificar si el usuario existe
            var usuario = await _context.Usuarios.FindAsync(request.IdUsuario);
            if (usuario == null)
            {
                return NotFound(new { message = "Usuario no encontrado." });
            }

            // Verificar si el turno es válido (solo los tres turnos posibles)
            var turno = await _context.Turnos
                .Where(t => new[] { 1, 2, 3 }.Contains(t.IdTurno)) // Validar si el IdTurno está entre los tres turnos posibles
                .FirstOrDefaultAsync(t => t.IdTurno == request.IdTurno);

            if (turno == null)
            {
                return BadRequest(new { message = "Turno no válido." });
            }

            // Crear una nueva asignación de turno
            var asignacionTurno = new AsignacionTurno
            {
                IdUsuario = request.IdUsuario,
                IdTurno = request.IdTurno,
                FechaAsignacion = DateTime.Now // Se asigna la fecha y hora actual
            };

            _context.AsignacionTurnos.Add(asignacionTurno);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Turno asignado correctamente." });
        }

        // DELETE: api/AsignacionTurnos/Quitar
        [HttpDelete("Quitar")]
        public async Task<ActionResult> QuitarTurnos([FromBody] QuitarTurnosRequest request)
        {
            // Verificar si el usuario existe
            var usuario = await _context.Usuarios.FindAsync(request.IdUsuario);
            if (usuario == null)
            {
                return NotFound(new { message = "Usuario no encontrado." });
            }

            // Eliminar todas las asignaciones de turnos del usuario
            var asignaciones = _context.AsignacionTurnos.Where(at => at.IdUsuario == request.IdUsuario);
            _context.AsignacionTurnos.RemoveRange(asignaciones);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Turnos eliminados correctamente." });
        }
    }

    // Clase para recibir los datos de eliminación de turnos
    public class QuitarTurnosRequest
    {
        public int IdUsuario { get; set; }
    }

    // Clase para recibir los datos de asignación de turno
    public class AsignacionTurnoRequest
    {
        public int IdUsuario { get; set; }
        public int IdTurno { get; set; } // Id de los tres turnos predefinidos
    }
}
