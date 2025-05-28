import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://propftx-api.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user, data.token);
        if (data.user.role === 'admin') navigate('/admin');
        else navigate('/user');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, bgcolor: 'rgba(35,39,47,0.98)' }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: '#ff9800', fontWeight: 700 }}>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField 
            label="Email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
            required 
            InputLabelProps={{ style: { color: '#ff9800' } }}
            sx={{
              input: { color: '#fff', background: '#23272f', borderRadius: 1 },
              label: { color: '#ff9800' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ff9800' },
                '&:hover fieldset': { borderColor: '#fff' },
                '&.Mui-focused fieldset': { borderColor: '#ff9800' },
              },
            }}
          />
          <TextField 
            label="Password" 
            name="password" 
            type="password" 
            value={form.password} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
            required 
            InputLabelProps={{ style: { color: '#ff9800' } }}
            sx={{
              input: { color: '#fff', background: '#23272f', borderRadius: 1 },
              label: { color: '#ff9800' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ff9800' },
                '&:hover fieldset': { borderColor: '#fff' },
                '&.Mui-focused fieldset': { borderColor: '#ff9800' },
              },
            }}
          />
          <Button type="submit" variant="contained" color="warning" fullWidth sx={{ mt: 2, fontWeight: 700 }}>
            Login
          </Button>
        </form>
        <Button color="secondary" fullWidth sx={{ mt: 2, color: '#ff9800', fontWeight: 600 }} onClick={() => navigate('/signup')}>
          Don't have an account? Signup
        </Button>
      </Paper>
    </Container>
  );
}
