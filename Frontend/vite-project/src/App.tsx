import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import AgregarEmpleado from './Components/AgregarEmpleado';
import './App.css';
import HomePageCajero from './Components/Cajero';
import HomePageCliente from './Components/Cliente';
import HomePageGerente from './Components/Gerente';
import HomePageMesero from './Components/Mesero';
import RegistroCliente from './Components/RegistroCliente';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige la ruta raíz a la página de inicio de sesión */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registroCliente" element={<RegistroCliente />} />
        <Route path="/Cajero" element={<HomePageCajero />} />{}
        <Route path="/Cliente" element={<HomePageCliente />} />{}
        <Route path="/Gerente" element={<HomePageGerente />} />{}
        <Route path="/Mesero" element={<HomePageMesero />} />{}
        <Route path="/agregar-empleado" element={<AgregarEmpleado />} />
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;