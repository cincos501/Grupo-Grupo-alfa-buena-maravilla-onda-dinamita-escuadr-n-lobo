using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace TuProyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReservasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Reservas
        [HttpGet]
        public async Task<ActionResult> GetReservas()
        {
            // Obtener todas las reservas sin cargar los datos asociados
            var reservas = await _context.Reservas
                .Select(r => new
                {
                    r.IdReserva,
                    r.IdCliente,
                    r.IdMesa,
                    r.Fecha,
                    r.Duracion,
                    r.Estado
                })
                .ToListAsync();

            return Ok(reservas);
        }

        // POST: api/Reservas
        [HttpPost]
        public async Task<ActionResult> CrearReserva([FromBody] ReservaRequest request)
        {
            // Verificar que el cliente y la mesa existen
            var cliente = await _context.Clientes.FindAsync(request.IdCliente);
            if (cliente == null)
            {
                return NotFound(new { message = "Cliente no encontrado." });
            }

            var mesa = await _context.Mesas.FindAsync(request.IdMesa);
            if (mesa == null)
            {
                return NotFound(new { message = "Mesa no encontrada." });
            }

            // Usar consulta SQL directa para insertar la reserva
            var sql = @"
                INSERT INTO [dbo].[Reservas] ([IdCliente], [IdMesa], [Fecha], [Duracion], [Estado], [ClienteIdCliente], [MesaIdMesa])
                VALUES (@IdCliente, @IdMesa, @Fecha, @Duracion, @Estado, @IdCliente, @IdMesa)";

            var parameters = new[]
            {
                new SqlParameter("@IdCliente", request.IdCliente),
                new SqlParameter("@IdMesa", request.IdMesa),
                new SqlParameter("@Fecha", request.Fecha),
                new SqlParameter("@Duracion", request.Duracion),
                new SqlParameter("@Estado", request.Estado)
            };

            // Ejecutar la consulta SQL
            await _context.Database.ExecuteSqlRawAsync(sql, parameters);

            return Ok(new { message = "Reserva creada correctamente." });
        }

        // PUT: api/Reservas/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> EditarReserva(int id, [FromBody] ReservaRequest request)
        {
            // Verificar que la reserva existe
            var reserva = await _context.Reservas.FindAsync(id);
            if (reserva == null)
            {
                return NotFound(new { message = "Reserva no encontrada." });
            }

            // Usar consulta SQL directa para actualizar la reserva
            var sql = @"
                UPDATE [dbo].[Reservas]
                SET [IdCliente] = @IdCliente, 
                    [IdMesa] = @IdMesa, 
                    [Fecha] = @Fecha, 
                    [Duracion] = @Duracion, 
                    [Estado] = @Estado
                WHERE [IdReserva] = @IdReserva";

            var parameters = new[]
            {
                new SqlParameter("@IdReserva", id),
                new SqlParameter("@IdCliente", request.IdCliente),
                new SqlParameter("@IdMesa", request.IdMesa),
                new SqlParameter("@Fecha", request.Fecha),
                new SqlParameter("@Duracion", request.Duracion),
                new SqlParameter("@Estado", request.Estado)
            };

            // Ejecutar la consulta SQL para actualizar la reserva
            await _context.Database.ExecuteSqlRawAsync(sql, parameters);

            return Ok(new { message = "Reserva actualizada correctamente." });
        }

        // DELETE: api/Reservas/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> EliminarReserva(int id)
        {
            // Verificar que la reserva existe
            var reserva = await _context.Reservas.FindAsync(id);
            if (reserva == null)
            {
                return NotFound(new { message = "Reserva no encontrada." });
            }

            // Usar consulta SQL directa para eliminar la reserva
            var sql = "DELETE FROM [dbo].[Reservas] WHERE [IdReserva] = @IdReserva";

            var parameters = new[]
            {
                new SqlParameter("@IdReserva", id)
            };

            // Ejecutar la consulta SQL para eliminar la reserva
            await _context.Database.ExecuteSqlRawAsync(sql, parameters);

            return Ok(new { message = "Reserva eliminada correctamente." });
        }
    }

    // Clase para recibir los datos de creación y edición de reservas
    public class ReservaRequest
    {
        public int IdCliente { get; set; }
        public int IdMesa { get; set; }
        public DateTime Fecha { get; set; }
        public int Duracion { get; set; }
        public string Estado { get; set; }
    }
}
