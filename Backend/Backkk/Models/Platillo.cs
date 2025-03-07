using System.ComponentModel.DataAnnotations;

public class Platillo
{
    [Key]
    public int IdPlatillo { get; set; }

    [Required, StringLength(100)]
    public string Nombre { get; set; }

    [Required]
    public string Descripcion { get; set; }

    [Required]
    public decimal Precio { get; set; }

    public bool Disponible { get; set; } = true;

    // Relación con pedidos
    public ICollection<Pedido> Pedidos { get; set; }
}
