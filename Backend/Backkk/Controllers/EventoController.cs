using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace TuProyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Evento
        // GET: api/Evento
        [HttpGet]
        public async Task<ActionResult> GetEventos()
        {
            var eventos = await _context.Eventos
                .Include(e => e.Cliente)
                .Select(e => new
                {
                    e.IdEvento,
                    e.IdCliente,
                    e.Fecha,
                    e.Duracion,
                    e.Estado,
                    Cliente = new
                    {
                        e.Cliente.Nombre,
                        e.Cliente.Correo
                    }
                })
                .ToListAsync();

            // Si no hay eventos, la lista será vacía
            return Ok(eventos);
        }


        // GET: api/Evento/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetEvento(int id)
        {
            var evento = await _context.Eventos
                .Include(e => e.Cliente)
                .Where(e => e.IdEvento == id)
                .Select(e => new
                {
                    e.IdEvento,
                    e.IdCliente,
                    e.Fecha,
                    e.Duracion,
                    e.Estado,
                    Cliente = new
                    {
                        e.Cliente.Nombre,
                        e.Cliente.Correo
                    }
                })
                .FirstOrDefaultAsync();

            if (evento == null)
            {
                return NotFound(new { message = "Evento no encontrado." });
            }

            return Ok(evento);
        }


        [HttpPost]
        public async Task<ActionResult> CrearEvento([FromBody] EventoRequest eventoRequest)
        {
            if (eventoRequest == null)
                return BadRequest(new { message = "Datos inválidos." });

            // Verificar si el cliente existe en la base de datos
            var clienteExistente = await _context.Clientes
                .FirstOrDefaultAsync(c => c.IdCliente == eventoRequest.IdCliente);

            if (clienteExistente == null)
            {
                return NotFound(new { message = "Cliente no encontrado." });
            }

            try
            {
                // Crear el comando SQL para insertar el evento
                var sqlQuery = @"INSERT INTO [dbo].[Eventos] (IdCliente, Fecha, Duracion, Estado, ClienteIdCliente)
                         VALUES (@IdCliente, @Fecha, @Duracion, @Estado, @ClienteIdCliente)";

                // Ejecutar la consulta SQL usando el método ExecuteSqlRawAsync
                await _context.Database.ExecuteSqlRawAsync(sqlQuery,
                    new SqlParameter("@IdCliente", eventoRequest.IdCliente),
                    new SqlParameter("@Fecha", eventoRequest.Fecha),
                    new SqlParameter("@Duracion", eventoRequest.Duracion),
                    new SqlParameter("@Estado", eventoRequest.Estado),
                    new SqlParameter("@ClienteIdCliente", eventoRequest.IdCliente));  // Si "ClienteIdCliente" es otro campo que necesita el Insert

                return Ok(new { message = "Evento creado correctamente." });
            }
            catch (DbUpdateException ex)
            {
                // En caso de error al ejecutar la consulta
                return BadRequest(new { message = "Error al guardar el evento.", error = ex.InnerException?.Message });
            }
        }



        // PUT: api/Evento/5
        [HttpPut("{id}")]
        public async Task<ActionResult> EditarEvento(int id, [FromBody] EventoRequest eventoRequest)
        {
            if (eventoRequest == null)
                return BadRequest(new { message = "Datos inválidos." });

            var eventoExistente = await _context.Eventos.FindAsync(id);

            if (eventoExistente == null)
            {
                return NotFound(new { message = "Evento no encontrado." });
            }

            var clienteExistente = await _context.Clientes.FindAsync(eventoRequest.IdCliente);

            if (clienteExistente == null)
            {
                return NotFound(new { message = "Cliente no encontrado." });
            }

            try
            {
                eventoExistente.IdCliente = eventoRequest.IdCliente;
                eventoExistente.Fecha = eventoRequest.Fecha;
                eventoExistente.Duracion = eventoRequest.Duracion;
                eventoExistente.Estado = eventoRequest.Estado;

                _context.Eventos.Update(eventoExistente);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Evento actualizado correctamente." });
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(new { message = "Error al actualizar el evento.", error = ex.InnerException?.Message });
            }
        }

        // DELETE: api/Evento/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> EliminarEvento(int id)
        {
            var eventoExistente = await _context.Eventos.FindAsync(id);

            if (eventoExistente == null)
            {
                return NotFound(new { message = "Evento no encontrado." });
            }

            try
            {
                _context.Eventos.Remove(eventoExistente);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Evento eliminado correctamente." });
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(new { message = "Error al eliminar el evento.", error = ex.InnerException?.Message });
            }
        }
    }

    // Clase para recibir los datos necesarios de un evento
    public class EventoRequest
    {
        public int IdCliente { get; set; }
        public DateTime Fecha { get; set; }
        public int Duracion { get; set; }
        public string Estado { get; set; }
    }
}
