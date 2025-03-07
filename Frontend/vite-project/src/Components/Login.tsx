import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Efecto para aplicar el fondo al body
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

  const handleLogin = async () => {
    setErrorMessage(null); // Limpia mensajes de error previos

    try {
      const response = await fetch('https://localhost:7160/api/Login/Authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate(data.redirectUrl); // Redirige a la URL proporcionada por el backend
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error de autenticación');
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error al intentar iniciar sesión. Inténtalo de nuevo.');
    }
  };

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
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#E74C3C', color: 'white' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: '#2C3E50' }}>
            Restaurante Delicias
          </Typography>
          <Box sx={{ mt: 1 }}>
            {errorMessage && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="usernameOrEmail"
              label="Usuario o Correo Electrónico"
              name="usernameOrEmail"
              autoFocus
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              sx={{
                input: { color: 'black' },
                label: { color: '#2C3E50' },
                backgroundColor: "#FDEBD0",
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#E74C3C' },
                  '&:hover fieldset': { borderColor: '#C0392B' },
                  '&.Mui-focused fieldset': { borderColor: '#E74C3C' },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                input: { color: 'black' },
                label: { color: '#2C3E50' },
                backgroundColor: "#FDEBD0",
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#E74C3C' },
                  '&:hover fieldset': { borderColor: '#C0392B' },
                  '&.Mui-focused fieldset': { borderColor: '#E74C3C' },
                },
              }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#E74C3C', '&:hover': { bgcolor: '#C0392B' } }}
              onClick={handleLogin}
            >
              Iniciar Sesión
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  onClick={() => navigate('/registroCliente')}
                  sx={{ color: '#2C3E50' }}
                >
                  ¿No tienes una cuenta? Regístrate
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
