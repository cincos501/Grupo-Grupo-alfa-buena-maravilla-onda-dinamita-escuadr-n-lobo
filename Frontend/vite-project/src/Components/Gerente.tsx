// HomePageGerente.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmpleadoList from "./EmpleadoList"; 
import UsuariosConTurnos from "./UsuariosConTurnos"; 
import Eventos from "./Eventos";
import ReservasList from "./ReservasList";

const HomePageGerente: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>("");

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

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <span style={styles.welcome}>Bienvenido Administrador</span>
        <div style={styles.navLinks}>
          <button
            onClick={() => setActiveSection("empleados")}
            style={styles.navButton}
          >
            Empleados
          </button>
          <button
            onClick={() => setActiveSection("turnos")}
            style={styles.navButton}
          >
            Turnos
          </button>
          <button
            onClick={() => setActiveSection("reservas")}
            style={styles.navButton}
          >
            Reservas
          </button>
          <button
            onClick={() => setActiveSection("eventos")}
            style={styles.navButton}
          >
            Eventos
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div style={styles.content}>
        {activeSection === "empleados" && <EmpleadoList />}
        {activeSection === "turnos" && <UsuariosConTurnos />}
        {activeSection === "reservas" && <ReservasList />}
        {activeSection === "eventos" && <Eventos />}
        {!activeSection && (
          <div style={styles.placeholder}>
            <img
              src="/cafe5loco.jpg"
              alt="Logo"
              style={styles.logo}
            />
            <h2>Selecciona una sección para comenzar</h2>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#6B4226",
    color: "#fff",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
  },
  welcome: {
    marginLeft: "20px",
    fontSize: "1.5em",
  },
  navLinks: {
    display: "flex",
    gap: "15px",
    marginRight: "20px",
  },
  navButton: {
    backgroundColor: "transparent",
    color: "#fff",
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
  content: {
    marginTop: "60px",
    padding: "20px",
  },
  placeholder: {
    backgroundColor: "#6B4226",
    color: "#fff",
    padding: "20px",
    textAlign: "center" as "center",
    borderRadius: "8px",
    margin: "20px auto",
    width: "fit-content",
  },
  logo: {
    width: "500px",
    height: "500px",
    marginBottom: "10px",
  },
};

export default HomePageGerente;
