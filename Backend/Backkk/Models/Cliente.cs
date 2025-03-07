using System.ComponentModel.DataAnnotations;

public class Cliente
{
    [Key]
    public int IdCliente { get; set; }

    [Required, StringLength(50)]
    public string Nombre { get; set; }

    [StringLength(50)]
    public string Telefono { get; set; }

    [Required, StringLength(50)]
    [EmailAddress]
    public string Correo { get; set; }

    [Required, StringLength(255)]
    public string Password { get; set; }

    // Relaciones
    public ICollection<Reserva> Reservas { get; set; }
    public ICollection<Evento> Eventos { get; set; }
}
