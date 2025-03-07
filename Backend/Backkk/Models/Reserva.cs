using System.ComponentModel.DataAnnotations;

public class Reserva
{
    [Key]
    public int IdReserva { get; set; }

    [Required]
    public int IdCliente { get; set; }

    [Required]
    public int IdMesa { get; set; }

    [Required]
    public DateTime Fecha { get; set; }

    [Required]
    public int Duracion { get; set; }

    [Required, StringLength(50)]
    public string Estado { get; set; }

    // Navegación
    public Cliente Cliente { get; set; }
    public Mesa Mesa { get; set; }

    public ICollection<Pedido> Pedidos { get; set; }
}
