using System.ComponentModel.DataAnnotations;

public class Mesa
{
    [Key]
    public int IdMesa { get; set; }

    [Required]
    public int Capacidad { get; set; }

    [Required, StringLength(50)]
    public string Zona { get; set; }

    [Required]
    public int NumMesa { get; set; }

    // Relaciones
    public ICollection<Reserva> Reservas { get; set; }
}
