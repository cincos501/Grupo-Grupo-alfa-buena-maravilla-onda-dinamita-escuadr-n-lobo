using System.ComponentModel.DataAnnotations;

public class Usuario
{
    [Key]
    public int IdUsuario { get; set; }

    [Required, StringLength(50)]
    public string Nombre { get; set; }

    [StringLength(50)]
    public string Telefono { get; set; }

    [Required, StringLength(50)]
    [EmailAddress]
    public string Correo { get; set; }

    [Required, StringLength(30)]
    public string Username { get; set; }

    [Required, StringLength(255)]
    public string Password { get; set; }

    [Required, StringLength(50)]
    public string Rol { get; set; }

    // Relación con AsignacionTurno
    public ICollection<AsignacionTurno> Asignaciones { get; set; }
}
