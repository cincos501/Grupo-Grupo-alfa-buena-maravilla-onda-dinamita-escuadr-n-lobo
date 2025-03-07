import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReservasList from "./ReservasList";

const HomePageCliente: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>("inicio");
  const [platillos, setPlatillos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.backgroundImage = "url(/fondo.jpg)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.margin = "0";
    document.body.style.minHeight = "100vh";

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
    };
  }, []);

  useEffect(() => {
    fetch("https://localhost:7160/api/Platillo")
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener los platillos");
        return response.json();
      })
      .then((data) => {
        setPlatillos(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      {/* Barra de navegación */}
      <nav style={styles.navbar}>
        <span style={styles.welcome}>Bienvenido Cliente</span>
        <div style={styles.navLinks}>
          <button
            onClick={() => setActiveSection("inicio")}
            style={styles.navButton}
          >
            Inicio
          </button>
          <button
            onClick={() => setActiveSection("menu")}
            style={styles.navButton}
          >
            Menú
          </button>
          <button
            onClick={() => setActiveSection("reservas")}
            style={styles.navButton}
          >
            Reservas
          </button>
          <button
            onClick={() => setActiveSection("nosotros")}
            style={styles.navButton}
          >
            Nosotros
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Contenido dinámico */}
      <div style={styles.content}>
        {activeSection === "inicio" && (
          <>
          {/* Sección 1: Frases motivadoras */}
          <section style={styles.section}>
            <div style={styles.separateSection}>
              <img
                src="/restaurante.jpg"
                alt="Restaurante"
                style={styles.sideImage}
              />
              <div style={styles.textBlock}>
                <p style={styles.motivationalPhrase}>
                  "Cada plato tiene su historia. Ven y haz la tuya con nosotros."
                </p>
                <p style={styles.largeText} >
                  Disfruta de un ambiente cálido, el mejor servicio y platillos
                  únicos preparados con pasión y calidad.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 2: Horarios de atención y ubicación */}
          <section style={styles.section}>
            <div style={styles.separateSection}>
              <div style={styles.textBlock}>
                <h3 style={styles.largeHeading}>Horarios de atención:</h3>
                <p style={styles.largeText}>Lunes a viernes: 8:00 AM - 10:00 PM</p>
                <h3 style={styles.largeHeading}>Ubicación:</h3>
                <p style={styles.largeText}>
                  Av. Principal, Zona Centro, cerca de la Plaza Mayor
                </p>
              </div>
              <img
                src="/restaurante-local.png"
                alt="Ubicación del restaurante"
                style={styles.sideImage}
              />
            </div>
          </section>
        </>
        )}
        {activeSection === "menu" && (
          <section id="menu" style={styles.section}>
            <h2 style={styles.sectionTitle}>Nuestro Menú</h2>
            <div style={styles.menuGrid}>
              {loading ? (
                <p>Cargando platillos...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : platillos.length > 0 ? (
                platillos.map((platillo) => (
                  <div key={platillo.idPlatillo} style={styles.menuCard}>
                    {/* Imagen del platillo */}
                    <img
                      src={platillo.imagen || "/capu.png"}
                      alt={platillo.nombre}
                      style={styles.menuImage}
                    />
                    <h3 style={styles.menuTitle}>{platillo.nombre}</h3>
                    <p style={styles.menuDescription}>{platillo.descripcion}</p>
                    <p style={styles.menuPrice}>
                      <strong>Precio:</strong> ${platillo.precio.toFixed(2)}
                    </p>
                    <p>
                      <strong>Disponible:</strong>{" "}
                      {platillo.disponible ? "Sí" : "No"}
                    </p>
                  </div>
                ))
              ) : (
                <p>No hay platillos disponibles</p>
              )}
            </div>
          </section>
        )}
        {activeSection === "reservas" && (
          <section id="reservas" style={styles.section}>
            <h2 style={styles.sectionTitle}>Tus Reservas</h2>
            <ReservasList />
          </section>
        )}
        {activeSection === "nosotros" && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Nosotros</h2>
            <p>En Restaurante XYZ ofrecemos calidad y pasión en cada plato que servimos.</p>
          </section>
        )}
      </div>
      {/* Botón flotante */}
      <button
        onClick={() => setActiveSection("menu")}
        style={styles.floatingButton}
      >
        Explorar Menú
      </button>
      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Restaurante XYZ. Todos los derechos reservados.</p>
        <p>Contacto: contacto@restaurante.xyz</p>
      </footer>
    </div>
  );
};

const styles = {
  floatingButton: {
    position: "fixed" as "fixed",
    bottom: "80px", // Ajuste para asegurarse de que no esté cubierto por el footer
    right: "20px",
    backgroundColor: "#f39c12",
    color: "#fff",
    border: "none",
    borderRadius: "200%",
    width: "60px",
    height: "60px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "1em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    zIndex: 2000, // Asegura que esté encima del footer
  },
  largeText: {
    color: 'black', // Color del texto
    fontSize: '20px', // Ejemplo de tamaño, ajusta según necesidad
    lineHeight: '1.5', // Opcional, para mejorar la legibilidad
  },
  largeHeading: {
    color: 'black', // Color del texto
    fontSize: '20px', // Ejemplo de tamaño, ajusta según necesidad
    lineHeight: '1.5', // Opcional, para mejorar la legibilidad
  },
  footer: {
    backgroundColor: "#473c3378",
    color: "#fff",
    textAlign: "center" as "center",
    padding: "1px",
    position: "fixed" as "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 1000, // Footer debajo del botón flotante
  },

  navbar: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#8B4513",
    color: "#fff",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
  },
  welcome: { marginLeft: "20px", fontSize: "1.5em" },
  navLinks: { display: "flex", gap: "15px", marginRight: "20px" },
  navButton: {
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "none",
    fontSize: "1em",
    cursor: "pointer",
    textDecoration: "underline",
  },
  logoutButton: {
    backgroundColor: "#f39c12",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  content: { marginTop: "60px", padding: "20px" },
  section: {
    textAlign: "center" as "center",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "10px",
    marginBottom: "20px",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  sectionTitle: { fontSize: "2em", color: "#8B4513" },
  separateSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "20px",
  },
  sideImage: { width: "45%", height: "auto", borderRadius: "10px" },
  textBlock: { width: "50%", textAlign: "left" as "left" },
  motivationalPhrase: { fontStyle: "italic", fontSize: "1.2em", color: "#555" },
  exploreButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#8B4513",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1em",
  },
  menuGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    justifyContent: "center",
  },
  menuCard: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as "center",
    maxWidth: "300px",
  },
  menuImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover" as "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  menuTitle: { color: "#8B4513", fontSize: "1.5em", marginBottom: "10px" },
  menuDescription: { fontSize: "1em", color: "#555", marginBottom: "10px" },
  menuPrice: { color: "#8B4513", fontSize: "1.2em" },
};

export default HomePageCliente;
