using System.ComponentModel.DataAnnotations;

public class Pedido
{
    [Key]
    public int IdPedido { get; set; }

    [Required]
    public int IdReserva { get; set; }

    [Required]
    public int IdPlatillo { get; set; }

    [Required]
    public string Descripcion { get; set; }

    [Required]
    public int Cantidad { get; set; }

    // Navegación
    public Reserva Reserva { get; set; }
    public Platillo Platillo { get; set; }
}
