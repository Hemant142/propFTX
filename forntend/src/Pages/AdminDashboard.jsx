import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import MovieCard from '../Components/MovieCard';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdminDashboard() {
const token = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', director: '', releaseYear: '', genre: '', avatar: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchMovies = async () => {
    const res = await fetch('https://propftx-api.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMovies(data);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, []);

  const handleOpen = (movie = null) => {
    setEditMovie(movie);
    setForm(movie || { title: '', description: '', director: '', releaseYear: '', genre: '', avatar: '' });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const method = editMovie ? 'PUT' : 'POST';
    const url = editMovie ? `https://propftx-api.onrender.com/movies/${editMovie._id}` : 'https://propftx-api.onrender.com/movies';
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    fetchMovies();
    handleClose();
    setSnackbar({ open: true, message: editMovie ? 'Movie updated!' : 'Movie created!', severity: 'success' });
  };

  const handleDelete = async (id) => {
    await fetch(`https://propftx-api.onrender.com/movies/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMovies();
    setSnackbar({ open: true, message: 'Movie deleted!', severity: 'info' });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ my: 3, color: '#ff9800', fontWeight: 700, textAlign: 'center', letterSpacing: 2 }}>
        🎬 Admin Dashboard
      </Typography>
      <Button
        variant="contained"
        color="warning"
        startIcon={<AddIcon />}
        onClick={() => handleOpen()}
        sx={{ mb: 3, fontWeight: 700, borderRadius: 2 }}
      >
        Add Movie
      </Button>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie._id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={6} sx={{ position: 'relative', bgcolor: 'transparent', boxShadow: 'none' }}>
              <MovieCard movie={movie} />
              <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => handleOpen(movie)}
                  sx={{
                    fontWeight: 700,
                    borderRadius: 3,
                    px: 2.5,
                    py: 1,
                    background: 'linear-gradient(90deg, #23272f 0%, #2196f3 100%)',
                    color: '#fff',
                    boxShadow: '0 2px 8px 0 rgba(33,150,243,0.18)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #2196f3 0%, #23272f 100%)',
                      color: '#fff',
                      transform: 'scale(1.07)',
                      boxShadow: '0 4px 16px 0 rgba(33,150,243,0.28)',
                    },
                    '& .MuiButton-startIcon': {
                      color: '#ff9800',
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(movie._id)}
                  sx={{
                    fontWeight: 700,
                    borderRadius: 3,
                    px: 2.5,
                    py: 1,
                    background: 'linear-gradient(90deg, #23272f 0%, #ff1744 100%)',
                    color: '#fff',
                    boxShadow: '0 2px 8px 0 rgba(255,23,68,0.18)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #ff1744 0%, #23272f 100%)',
                      color: '#fff',
                      transform: 'scale(1.07)',
                      boxShadow: '0 4px 16px 0 rgba(255,23,68,0.28)',
                    },
                    '& .MuiButton-startIcon': {
                      color: '#ff9800',
                    },
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ bgcolor: '#23272f', color: '#ff9800', fontWeight: 700 }}>
          {editMovie ? 'Edit Movie' : 'Add Movie'}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#23272f' }}>
          <TextField margin="dense" label="Title" name="title" value={form.title} onChange={handleChange} fullWidth 
            sx={{
              input: { color: '#fff' },
              label: { color: '#ff9800' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ff9800', borderWidth: 2 },
                '&:hover fieldset': { borderColor: '#ff9800', borderWidth: 2 },
                '&.Mui-focused fieldset': { borderColor: '#ff9800', borderWidth: 2 },
              },
            }}
          />
          <TextField margin="dense" label="Description" name="description" value={form.description} onChange={handleChange} fullWidth 
            sx={{
              input: { color: '#fff' },
              label: { color: '#ff9800' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ff9800', borderWidth: 2 },
                '&:hover fieldset': { borderColor: '#ff9800', borderWidth: 2 },
                '&.Mui-focused fieldset': { borderColor: '#ff9800', borderWidth: 2 },
              },
            }}
          />
          <TextField margin="dense" label="Director" name="director" value={form.director} onChange={handleChange} fullWidth 
            sx={{
              input: { color: '#fff' },
              label: { color: '#ff9800' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ff9800', borderWidth: 2 },
                '&:hover fieldset': { borderColor: '#ff9800', borderWidth: 2 },
                '&.Mui-focused fieldset': { borderColor: '#ff9800', borderWidth: 2 },
              },
            }}
          />
          <TextField margin="dense" label="Release Year" name="releaseYear" value={form.releaseYear} onChange={handleChange} fullWidth 
            sx={{
              input: { color: '#fff' },
              label: { color: '#ff9800' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ff9800', borderWidth: 2 },
                '&:hover fieldset': { borderColor: '#ff9800', borderWidth: 2 },
                '&.Mui-focused fieldset': { borderColor: '#ff9800', borderWidth: 2 },
              },
            }}
          />
          <TextField margin="dense" label="Genre" name="genre" value={form.genre} onChange={handleChange} fullWidth 
            sx={{
              input: { color: '#fff' },
              label: { color: '#ff9800' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ff9800', borderWidth: 2 },
                '&:hover fieldset': { borderColor: '#ff9800', borderWidth: 2 },
                '&.Mui-focused fieldset': { borderColor: '#ff9800', borderWidth: 2 },
              },
            }}
          />
          <TextField margin="dense" label="Avatar URL" name="avatar" value={form.avatar} onChange={handleChange} fullWidth 
            sx={{
              input: { color: '#fff' },
              label: { color: '#ff9800' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ff9800', borderWidth: 2 },
                '&:hover fieldset': { borderColor: '#ff9800', borderWidth: 2 },
                '&.Mui-focused fieldset': { borderColor: '#ff9800', borderWidth: 2 },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#23272f' }}>
          <Button onClick={handleClose} sx={{ color: '#ff9800', fontWeight: 600 }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="warning" sx={{ fontWeight: 700 }}>
            {editMovie ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
