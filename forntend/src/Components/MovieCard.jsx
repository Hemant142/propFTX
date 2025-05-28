import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Stack } from '@mui/material';

export default function MovieCard({ movie, action }) {
  return (
    <Card
      sx={{
        width: { xs: '100%', sm: 320, md: 340 },
        minHeight: 420,
        position: 'relative',
        borderRadius: 4,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        background: 'linear-gradient(135deg, #23272f 60%, #ff9800 100%)',
        color: '#fff',
        overflow: 'hidden',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.03)', boxShadow: '0 12px 40px 0 #ff9800aa' },
      }}
    >
      {action}
      <CardMedia
        component="img"
        height="200"
        image={movie.avatar}
        alt={movie.title}
        sx={{ objectFit: 'cover', borderRadius: '0 0 24px 24px' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 700, color: '#ff9800' }}>
          {movie.title}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip label={movie.genre} sx={{ bgcolor: '#23272f', color: '#ff9800', fontWeight: 600 }} />
          <Chip label={movie.releaseYear} sx={{ bgcolor: '#23272f', color: '#fff' }} />
        </Stack>
        <Typography variant="body2" color="#fff" sx={{ mb: 1 }}>
          {movie.description}
        </Typography>
        <Typography variant="subtitle2" color="#ff9800">
          Director: <span style={{ color: '#fff' }}>{movie.director}</span>
        </Typography>
        <Typography variant="caption" color="#bdbdbd" sx={{ mt: 1, display: 'block' }}>
          Added: {new Date(movie.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
