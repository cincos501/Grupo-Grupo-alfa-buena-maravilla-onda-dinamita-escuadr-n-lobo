import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid, Alert, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const RegistroCliente: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundImage = 'url(/fondoLogin1.jpg)';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundPosition = 'center center';
    document.body.style.margin = '0';
    document.body.style.minHeight = '100vh';
    document.body.style.width = '100%';

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundAttachment = '';
      document.body.style.backgroundPosition = '';
      document.body.style.margin = '';
      document.body.style.minHeight = '';
      document.body.style.width = '';
    };
  }, []);

  const handleRegister = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const response = await fetch('https://localhost:7160/api/Cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, telefono, correo, password }),
      });

      if (response.ok) {
        setSuccessMessage('Registro exitoso. Redirigiendo...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.mensaje || 'Error al registrar.');
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate('/login');

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: 'transparent',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'light.main', color: 'black' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: 'black' }}>
            Registro de Cliente
          </Typography>
          <Box sx={{ mt: 1 }}>
            {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
            {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

            <TextField
              fullWidth
              required
              margin="normal"
              label="Nombre Completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              sx={{
                input: { color: 'black' },
                label: { color: 'black' },
                backgroundColor: '#E3D7BF',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: '#6B4226' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Teléfono (Opcional)"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              sx={{
                input: { color: 'black' },
                label: { color: 'black' },
                backgroundColor: '#E3D7BF',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: '#6B4226' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
              }}
            />
            <TextField
              fullWidth
              required
              margin="normal"
              label="Correo Electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              sx={{
                input: { color: 'black' },
                label: { color: 'black' },
                backgroundColor: '#E3D7BF',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: '#6B4226' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
              }}
            />
            <TextField
              fullWidth
              required
              margin="normal"
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                input: { color: 'black' },
                label: { color: 'black' },
                backgroundColor: '#E3D7BF',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: '#6B4226' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#f39c12',
                '&:hover': { backgroundColor: '#d68910' },
              }}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrar'}
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={handleBack} sx={{ color: 'black' }}>
                  Regresar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default RegistroCliente;

