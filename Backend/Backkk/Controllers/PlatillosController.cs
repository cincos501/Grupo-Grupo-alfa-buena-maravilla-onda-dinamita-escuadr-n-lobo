using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace TuProyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlatilloController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PlatilloController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Platillo
        [HttpGet]
        public async Task<ActionResult> GetPlatillos()
        {
            var platillos = await _context.Platillos
                .Select(p => new
                {
                    p.IdPlatillo,
                    p.Nombre,
                    p.Descripcion,
                    p.Precio,
                    p.Disponible
                })
                .ToListAsync();

            return Ok(platillos);
        }

        // GET: api/Platillo/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetPlatillo(int id)
        {
            var platillo = await _context.Platillos
                .Where(p => p.IdPlatillo == id)
                .Select(p => new
                {
                    p.IdPlatillo,
                    p.Nombre,
                    p.Descripcion,
                    p.Precio,
                    p.Disponible
                })
                .FirstOrDefaultAsync();

            if (platillo == null)
            {
                return NotFound(new { message = "Platillo no encontrado." });
            }

            return Ok(platillo);
        }

        // POST: api/Platillo
        [HttpPost]
        public async Task<ActionResult> CrearPlatillo([FromBody] PlatilloRequest platilloRequest)
        {
            if (platilloRequest == null)
                return BadRequest(new { message = "Datos inválidos." });

            var nuevoPlatillo = new Platillo
            {
                Nombre = platilloRequest.Nombre,
                Descripcion = platilloRequest.Descripcion,
                Precio = platilloRequest.Precio,
                Disponible = platilloRequest.Disponible
            };

            try
            {
                _context.Platillos.Add(nuevoPlatillo);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Platillo creado correctamente.", nuevoPlatillo.IdPlatillo });
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(new { message = "Error al crear el platillo.", error = ex.InnerException?.Message });
            }
        }

        // PUT: api/Platillo/5
        [HttpPut("{id}")]
        public async Task<ActionResult> EditarPlatillo(int id, [FromBody] PlatilloRequest platilloRequest)
        {
            if (platilloRequest == null)
                return BadRequest(new { message = "Datos inválidos." });

            var platilloExistente = await _context.Platillos.FindAsync(id);

            if (platilloExistente == null)
            {
                return NotFound(new { message = "Platillo no encontrado." });
            }

            try
            {
                platilloExistente.Nombre = platilloRequest.Nombre;
                platilloExistente.Descripcion = platilloRequest.Descripcion;
                platilloExistente.Precio = platilloRequest.Precio;
                platilloExistente.Disponible = platilloRequest.Disponible;

                _context.Platillos.Update(platilloExistente);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Platillo actualizado correctamente." });
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(new { message = "Error al actualizar el platillo.", error = ex.InnerException?.Message });
            }
        }

        // DELETE: api/Platillo/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> EliminarPlatillo(int id)
        {
            var platilloExistente = await _context.Platillos.FindAsync(id);

            if (platilloExistente == null)
            {
                return NotFound(new { message = "Platillo no encontrado." });
            }

            try
            {
                _context.Platillos.Remove(platilloExistente);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Platillo eliminado correctamente." });
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(new { message = "Error al eliminar el platillo.", error = ex.InnerException?.Message });
            }
        }
    }

    // Clase para recibir los datos de un platillo
    public class PlatilloRequest
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public bool Disponible { get; set; }
    }
}
