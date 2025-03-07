using System;
using System.ComponentModel.DataAnnotations;

public class Turno
{
    [Key]
    public int IdTurno { get; set; }

    [Required]
    public string TipoTurno { get; set; } // "Mañana", "Tarde", "Noche"

    // Relación de navegación con AsignacionTurno
    public ICollection<AsignacionTurno> Asignaciones { get; set; }
}
