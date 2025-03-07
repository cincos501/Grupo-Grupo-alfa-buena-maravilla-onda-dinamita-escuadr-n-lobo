using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MesaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MesaController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Mesa
        [HttpGet]
        public async Task<ActionResult> GetMesas()
        {
            try
            {
                // Consulta SQL para obtener todas las mesas
                var sqlQuery = @"SELECT IdMesa, Capacidad, Zona, NumMesa FROM [dbo].[Mesas]";

                var mesas = await _context.Mesas
                    .FromSqlRaw(sqlQuery)
                    .ToListAsync();

                return Ok(mesas);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error al obtener las mesas.", error = ex.Message });
            }
        }

        // GET: api/Mesa/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetMesa(int id)
        {
            try
            {
                // Consulta SQL para obtener una mesa por id
                var sqlQuery = @"SELECT IdMesa, Capacidad, Zona, NumMesa FROM [dbo].[Mesas] WHERE IdMesa = @Id";

                var mesa = await _context.Mesas
                    .FromSqlRaw(sqlQuery, new SqlParameter("@Id", id))
                    .FirstOrDefaultAsync();

                if (mesa == null)
                {
                    return NotFound(new { message = "Mesa no encontrada." });
                }

                return Ok(mesa);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error al obtener la mesa.", error = ex.Message });
            }
        }

        // POST: api/Mesa
        [HttpPost]
        public async Task<ActionResult> CrearMesa([FromBody] CrearMesaDto mesaDto)
        {
            if (mesaDto == null)
                return BadRequest(new { message = "Datos inválidos." });

            try
            {
                // Verificar si la mesa ya existe
                var sqlCheckQuery = @"SELECT COUNT(1) FROM [dbo].[Mesas] WHERE NumMesa = @NumMesa AND Zona = @Zona";
                var existing = await _context.Database.ExecuteSqlRawAsync(sqlCheckQuery,
                    new SqlParameter("@NumMesa", mesaDto.NumMesa),
                    new SqlParameter("@Zona", mesaDto.Zona));

                if (existing > 0)
                {
                    return Conflict(new { message = "Ya existe una mesa con el mismo número y zona." });
                }

                // Consulta SQL para insertar la mesa utilizando parámetros
                var sqlInsertQuery = @"
                    INSERT INTO [dbo].[Mesas] ([Capacidad], [Zona], [NumMesa]) 
                    VALUES (@Capacidad, @Zona, @NumMesa)";

                // Ejecutar la consulta SQL para insertar la mesa
                var result = await _context.Database.ExecuteSqlRawAsync(sqlInsertQuery,
                    new SqlParameter("@Capacidad", mesaDto.Capacidad),
                    new SqlParameter("@Zona", mesaDto.Zona),
                    new SqlParameter("@NumMesa", mesaDto.NumMesa));

                return Ok(new { message = "Mesa creada correctamente." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error al crear la mesa.", error = ex.Message });
            }
        }

        // PUT: api/Mesa/5
        [HttpPut("{id}")]
        public async Task<ActionResult> EditarMesa(int id, [FromBody] CrearMesaDto mesaDto)
        {
            if (mesaDto == null)
                return BadRequest(new { message = "Datos inválidos." });

            try
            {
                // Verificar si la mesa existe
                var sqlCheckQuery = @"SELECT COUNT(1) FROM [dbo].[Mesas] WHERE IdMesa = @Id";
                var existing = await _context.Database.ExecuteSqlRawAsync(sqlCheckQuery, new SqlParameter("@Id", id));

                if (existing == 0)
                {
                    return NotFound(new { message = "Mesa no encontrada para actualizar." });
                }

                // Consulta SQL para actualizar los campos específicos de la mesa
                var sqlUpdateQuery = @"
            UPDATE [dbo].[Mesas]
            SET Capacidad = @Capacidad, 
                Zona = @Zona, 
                NumMesa = @NumMesa
            WHERE IdMesa = @Id";

                var rowsAffected = await _context.Database.ExecuteSqlRawAsync(sqlUpdateQuery,
                    new SqlParameter("@Capacidad", mesaDto.Capacidad),
                    new SqlParameter("@Zona", mesaDto.Zona),
                    new SqlParameter("@NumMesa", mesaDto.NumMesa),
                    new SqlParameter("@Id", id));

                if (rowsAffected == 0)
                {
                    return NotFound(new { message = "Mesa no encontrada para actualizar." });
                }

                return Ok(new { message = "Mesa actualizada correctamente." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error al actualizar la mesa.", error = ex.Message });
            }
        }


        // DELETE: api/Mesa/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> EliminarMesa(int id)
        {
            try
            {
                // Consulta SQL para eliminar la mesa
                var sqlDeleteQuery = @"DELETE FROM [dbo].[Mesas] WHERE IdMesa = @Id";

                var rowsAffected = await _context.Database.ExecuteSqlRawAsync(sqlDeleteQuery,
                    new SqlParameter("@Id", id));

                if (rowsAffected == 0)
                {
                    return NotFound(new { message = "Mesa no encontrada para eliminar." });
                }

                return Ok(new { message = "Mesa eliminada correctamente." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error al eliminar la mesa.", error = ex.Message });
            }
        }
    }
    public class CrearMesaDto
    {
        public int Capacidad { get; set; }
        public string Zona { get; set; }
        public int NumMesa { get; set; }
    }
}

