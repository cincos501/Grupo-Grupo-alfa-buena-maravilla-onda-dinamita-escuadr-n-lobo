using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // Tablas
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Evento> Eventos { get; set; }
    public DbSet<Mesa> Mesas { get; set; }
    public DbSet<Pedido> Pedidos { get; set; }
    public DbSet<Platillo> Platillos { get; set; }
    public DbSet<Reserva> Reservas { get; set; }
    public DbSet<Turno> Turnos { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<AsignacionTurno> AsignacionTurnos { get; set; } // Relación entre Usuario y Turno

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuración para Cliente
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.Property(e => e.Correo).IsRequired().HasMaxLength(50);
            entity.HasIndex(e => e.Correo).IsUnique();
        });

        // Configuración para Usuario
        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.Property(u => u.Correo).IsRequired().HasMaxLength(50);
            entity.HasIndex(u => u.Correo).IsUnique();
            entity.Property(u => u.Username).IsRequired().HasMaxLength(30);
            entity.HasIndex(u => u.Username).IsUnique();
            entity.Property(u => u.Rol).IsRequired().HasMaxLength(50);
        });

        // Configuración para Evento
        modelBuilder.Entity<Evento>(entity =>
        {
            entity.Property(e => e.Estado).IsRequired().HasMaxLength(10);
            entity.HasOne<Cliente>()
                .WithMany()
                .HasForeignKey(e => e.IdCliente)
                .OnDelete(DeleteBehavior.Restrict); // Evitar eliminación en cascada
        });

        // Configuración para Mesa
        modelBuilder.Entity<Mesa>(entity =>
        {
            entity.Property(e => e.Zona).IsRequired().HasMaxLength(50);
        });

        // Configuración para Pedido
        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasOne<Reserva>()
                .WithMany()
                .HasForeignKey(p => p.IdReserva)
                .OnDelete(DeleteBehavior.Restrict); // Prevenir la eliminación en cascada
            entity.HasOne<Platillo>()
                .WithMany()
                .HasForeignKey(p => p.IdPlatillo)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Configuración para Platillo
        modelBuilder.Entity<Platillo>(entity =>
        {
            entity.Property(p => p.Precio).IsRequired().HasColumnType("decimal(10, 2)");
        });

        // Configuración para Reserva
        modelBuilder.Entity<Reserva>(entity =>
        {
            entity.Property(r => r.Estado).IsRequired().HasMaxLength(50);
            entity.HasOne<Cliente>()
                .WithMany()
                .HasForeignKey(r => r.IdCliente)
                .OnDelete(DeleteBehavior.Restrict); // Configuración explícita
            entity.HasOne<Mesa>()
                .WithMany()
                .HasForeignKey(r => r.IdMesa)
                .OnDelete(DeleteBehavior.Restrict); // Configuración explícita
        });

        // Configuración para Turno
        modelBuilder.Entity<Turno>(entity =>
        {
            entity.Property(t => t.TipoTurno).IsRequired().HasMaxLength(10);
        });

        // Configuración para AsignacionTurno (relación entre Usuario y Turno)
        modelBuilder.Entity<AsignacionTurno>(entity =>
        {
            // Configuración de la relación con Usuario
            entity.HasOne(at => at.Usuario)
                .WithMany(u => u.Asignaciones)
                .HasForeignKey(at => at.IdUsuario)
                .OnDelete(DeleteBehavior.Restrict);

            // Configuración de la relación con Turno
            entity.HasOne(at => at.Turno)
                .WithMany(t => t.Asignaciones)
                .HasForeignKey(at => at.IdTurno)
                .OnDelete(DeleteBehavior.Restrict);

            // Configuración adicional para la fecha de asignación
            entity.Property(at => at.FechaAsignacion).IsRequired();
        });
    }
}
