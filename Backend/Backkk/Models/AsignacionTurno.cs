using System;
using System.ComponentModel.DataAnnotations;

public class AsignacionTurno
{
    [Key]
    public int IdAsignacion { get; set; }

    [Required]
    public int IdUsuario { get; set; }

    [Required]
    public int IdTurno { get; set; }

    // Propiedades adicionales si es necesario
    [Required]
    public DateTime FechaAsignacion { get; set; }

    // Relación con Usuario
    public Usuario Usuario { get; set; }

    // Relación con Turno
    public Turno Turno { get; set; }
}
