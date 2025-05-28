import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('https://propftx-api.onrender.com/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Signup successful! Please login.');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, bgcolor: 'rgba(35,39,47,0.98)' }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: '#ff9800', fontWeight: 700 }}>
          Signup
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField 
            label="Name" 
            name="name" 
            value={form.name} 
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
            Signup
          </Button>
        </form>
        <Button color="secondary" fullWidth sx={{ mt: 2, color: '#ff9800', fontWeight: 600 }} onClick={() => navigate('/login')}>
          Already have an account? Login
        </Button>
      </Paper>
    </Container>
  );
}
