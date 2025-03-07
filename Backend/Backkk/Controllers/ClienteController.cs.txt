using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System;

[Route("api/[controller]")]
[ApiController]
public class ClienteController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClienteController(AppDbContext context)
    {
        _context = context;
    }

    // DTO para la creación de clientes
    public class ClienteDto
    {
        public string Nombre { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public string Password { get; set; }
    }

    // POST: api/Cliente
    [HttpPost]
    public async Task<IActionResult> RegistrarCliente([FromBody] ClienteDto clienteDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Verificar si el correo ya está registrado
        var clienteExistente = await _context.Clientes.AnyAsync(c => c.Correo == clienteDto.Correo);
        if (clienteExistente)
        {
            return Conflict(new { mensaje = "El correo ya está en uso" });
        }

        // Crear nuevo cliente con los datos recibidos
        var nuevoCliente = new Cliente
        {
            Nombre = clienteDto.Nombre,
            Telefono = clienteDto.Telefono,
            Correo = clienteDto.Correo,
            Password = clienteDto.Password, // Se recomienda encriptar antes de almacenar
            Reservas = new List<Reserva>(),
            Eventos = new List<Evento>()
        };

        try
        {
            _context.Clientes.Add(nuevoCliente);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(ObtenerCliente), new { id = nuevoCliente.IdCliente }, nuevoCliente);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { mensaje = "Error al registrar cliente", error = ex.Message });
        }
    }

    // GET: api/Cliente/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> ObtenerCliente(int id)
    {
        var cliente = await _context.Clientes.FindAsync(id);
        if (cliente == null)
        {
            return NotFound(new { mensaje = "Cliente no encontrado" });
        }
        return Ok(cliente);
    }

    // GET: api/Cliente
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cliente>>> ObtenerClientes()
    {
        return await _context.Clientes.ToListAsync();
    }
}
