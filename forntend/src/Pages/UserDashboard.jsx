import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  IconButton,
  Box,
  Chip,
  Fade,
  TextField,
  InputAdornment,
  useMediaQuery
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import MovieCard from '../Components/MovieCard';
// import { useAuth } from '../context/AuthContext';
import { useTheme } from '@mui/material/styles';

export default function UserDashboard({ search, setSearch }) {
//   const { token } = useAuth();
const token = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [liked, setLiked] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [genre, setGenre] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchMovies = async () => {
    const res = await fetch('https://propftx-api.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMovies(data);
    setFiltered(data);
  };

  useEffect(() => {
    fetchMovies();
    setTimeout(() => setShowFilter(true), 400);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let filteredMovies = movies;
    if (search) {
      filteredMovies = filteredMovies.filter(
        (m) =>
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.genre.toLowerCase().includes(search.toLowerCase()) ||
          m.director.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (genre.length > 0) {
      filteredMovies = filteredMovies.filter((m) => genre.includes(m.genre));
    }
    setFiltered(filteredMovies);
  }, [search, genre, movies]);

  // Get unique genres for filter
  const genres = Array.from(new Set(movies.map((m) => m.genre)));

  const handleGenreChange = (e) => setGenre(e.target.value);

  const handleLike = (id) => {
    setLiked((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      setSnackbar({
        open: true,
        message: updated[id] ? 'Added to favorites!' : 'Removed from favorites!',
        severity: updated[id] ? 'success' : 'info',
      });
      return updated;
    });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ my: 3, color: '#ff9800', fontWeight: 700, textAlign: 'center', letterSpacing: 2 }}>
        🎬 Movie Explorer
      </Typography>
      {/* Show search bar on mobile only */}
      {isMobile && (
        <TextField
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search movies..."
          size="small"
          fullWidth
          sx={{
            bgcolor: '#fff',
            borderRadius: 2,
            mb: 2,
            input: { color: '#23272f', fontWeight: 600 },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ff9800', borderWidth: 2 },
              '&:hover fieldset': { borderColor: '#ff9800', borderWidth: 2 },
              '&.Mui-focused fieldset': { borderColor: '#ff9800', borderWidth: 2 },
            },
            '::placeholder': { color: '#ff9800', opacity: 1, fontWeight: 600 },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#ff9800' }} />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ style: { color: '#ff9800', fontWeight: 600 } }}
        />
      )}
      <Fade in={showFilter} timeout={600}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
          <FormControl
            variant="outlined"
            sx={{ minWidth: 220, bgcolor: '#23272f', borderRadius: 2, boxShadow: 3 }}
            size="small"
          >
            <InputLabel sx={{ color: '#ff9800', fontWeight: 600 }}>Filter by Genre</InputLabel>
            <Select
              multiple
              value={genre}
              label="Filter by Genre"
              onChange={handleGenreChange}
              renderValue={() => null}
              sx={{
                color: '#fff',
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#ff9800' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff9800' },
                fontWeight: 600,
                fontSize: 16,
                background: '#23272f',
              }}
              MenuProps={{
                PaperProps: {
                  sx: { bgcolor: '#23272f', color: '#ff9800', fontWeight: 600 },
                },
              }}
            >
              <MenuItem value={[]}>
                <em style={{ color: '#ff9800', fontWeight: 600 }}>All Genres</em>
              </MenuItem>
              {genres.map((g) => (
                <MenuItem key={g} value={g}>
                  <Chip label={g} sx={{ bgcolor: '#ff9800', color: '#23272f', fontWeight: 700 }} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Show selected genres as chips with clear buttons */}
          {genre.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {genre.map((g) => (
                <Chip
                  key={g}
                  label={g}
                  onDelete={() => setGenre(genre.filter((item) => item !== g))}
                  sx={{ bgcolor: '#ff9800', color: '#23272f', fontWeight: 700 }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Fade>
      <Grid container spacing={3}>
        {filtered.length === 0 ? (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', color: '#ff9800', fontWeight: 600, fontSize: 22, mt: 6 }}>
              No movies found.
            </Box>
          </Grid>
        ) : (
          filtered.map((movie) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={movie._id}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <MovieCard
                movie={movie}
                action={
                  <IconButton
                    aria-label="like"
                    onClick={() => handleLike(movie._id)}
                    sx={{ color: liked[movie._id] ? '#ff1744' : '#ff9800', position: 'absolute', top: 10, right: 10 }}
                  >
                    {liked[movie._id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                }
              />
            </Grid>
          ))
        )}
      </Grid>
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
