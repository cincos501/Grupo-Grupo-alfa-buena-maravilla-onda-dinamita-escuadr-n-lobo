using System.ComponentModel.DataAnnotations;

public class Evento
{
    [Key]
    public int IdEvento { get; set; }

    [Required]
    public int IdCliente { get; set; }

    [Required]
    public DateTime Fecha { get; set; }

    [Required]
    public int Duracion { get; set; }

    [Required, StringLength(10)]
    public string Estado { get; set; }

    // Navegación
    public Cliente Cliente { get; set; }
}
