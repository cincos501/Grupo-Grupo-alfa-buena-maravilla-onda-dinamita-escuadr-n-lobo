import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MesasList from './MesasList';
import ReservasList from './ReservasList';
import axios from 'axios';

interface Platillo {
    idPlatillo: number;
    nombre: string;
    descripcion: string;
    precio: number;
    disponible: boolean;
    imagen?: string; // Agregado para manejar imágenes de los platillos
}

const HomePageMesero: React.FC = () => {
    const navigate = useNavigate();
    const [activeComponent, setActiveComponent] = useState<string>('');
    const [platillos, setPlatillos] = useState<Platillo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        document.body.style.backgroundImage = 'url(/fondo.jpg)';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.margin = '0';
        document.body.style.minHeight = '100vh';
        document.body.style.backgroundColor = '#E3D7BF';

        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundColor = '';
        };
    }, []);

    const handleLogout = () => {
        navigate('/login');
    };

    const fetchPlatillos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Platillo[]>('https://localhost:7160/api/Platillo');
            setPlatillos(response.data);
        } catch (error) {
            setError('Error al obtener los platillos.');
        } finally {
            setLoading(false);
        }
    };

    const navigateTo = (path: string) => {
        setActiveComponent(path);

        if (path === 'menu') {
            fetchPlatillos();
        }
    };

    return (
        <div>
            <nav style={styles.navbar}>
                <span style={styles.welcome}>Bienvenido Mesero</span>
                <div style={styles.navLinks}>
                    <button onClick={() => navigateTo('mesas')} style={styles.navLink}>
                        Mesas
                    </button>
                    <button onClick={() => navigateTo('reservas')} style={styles.navLink}>
                        Reservas
                    </button>
                    <button onClick={() => navigateTo('menu')} style={styles.navLink}>
                        Menú
                    </button>
                    <button onClick={handleLogout} style={styles.logoutButton}>
                        Cerrar Sesión
                    </button>
                </div>
            </nav>

            <div style={styles.content}>
                {activeComponent === 'mesas' && <MesasList />}
                {activeComponent === 'reservas' && <ReservasList />}
                {activeComponent === 'menu' && (
                    <section id="menu" style={styles.section}>
                        <h2 style={styles.sectionTitle}>Nuestro Menú</h2>
                        <div style={styles.menuGrid}>
                            {loading ? (
                                <p>Cargando platillos...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : platillos.length > 0 ? (
                                platillos.map((platillo) => (
                                    <div key={platillo.idPlatillo} style={styles.menuCard}>
                                        <img
                                            src={platillo.imagen || '/capu.png'}
                                            alt={platillo.nombre}
                                            style={styles.menuImage}
                                        />
                                        <h3 style={styles.menuTitle}>{platillo.nombre}</h3>
                                        <p style={styles.menuDescription}>{platillo.descripcion}</p>
                                        <p style={styles.menuPrice}>
                                            <strong>Precio:</strong> ${platillo.precio.toFixed(2)}
                                        </p>
                                        <p>
                                            <strong>Disponible:</strong>{' '}
                                            {platillo.disponible ? 'Sí' : 'No'}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>No hay platillos disponibles</p>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

const styles = {
    navbar: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#6B4226',
        color: '#fff',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
    },
    welcome: {
        marginLeft: '20px',
        fontSize: '1.5em',
    },
    navLinks: {
        display: 'flex',
        gap: '15px',
        marginRight: '20px',
    },
    navLink: {
        color: '#fff',
        backgroundColor: '#8B4513',
        border: 'none',
        fontSize: '1em',
        cursor: 'pointer',
        textDecoration: 'underline',
        padding: '8px 15px',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    },
    logoutButton: {
        backgroundColor: '#f39c12',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease',
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

export default HomePageMesero;