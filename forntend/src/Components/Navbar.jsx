import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useScrollTrigger, TextField, InputAdornment, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  return React.cloneElement(children, {
    elevation: trigger ? 12 : 4,
    style: {
      boxShadow: trigger
        ? '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 2px 8px 0 #ff9800aa'
        : '0 2px 8px 0 #ff9800aa',
      background: 'linear-gradient(90deg, #23272f 80%, #ff9800 120%)',
      transition: 'box-shadow 0.3s',
    },
  });
}

export default function Navbar({ search, setSearch }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Only show search bar on /user route and not on mobile
  const showSearch = user && user.role === 'user' && location.pathname === '/user' && !isMobile;

  // Drawer menu items
  const menuItems = [
    user && user.role === 'admin' && { label: 'Admin Dashboard', onClick: () => navigate('/admin') },
    user && user.role === 'user' && { label: 'User Dashboard', onClick: () => navigate('/user') },
    !user && { label: 'Login', onClick: () => navigate('/login') },
    !user && { label: 'Signup', onClick: () => navigate('/signup') },
    user && { label: 'Logout', onClick: handleLogout },
  ].filter(Boolean);

  return (
    <ElevationScroll>
      {isMobile ? (
        <AppBar position="fixed" color="default" sx={{ zIndex: 1100, boxShadow: 'none', background: 'transparent' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', minHeight: 72 }}>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: '#ff9800', fontSize: 32 }} />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
              ModalProps={{
                keepMounted: true,
                sx: { zIndex: 1300 }
              }}
              PaperProps={{ sx: { zIndex: 1301 } }}
            >
              <Box sx={{ width: 220, bgcolor: '#23272f', height: '100%' }}>
                <List>
                  {menuItems.map((item, idx) => (
                    <ListItem key={idx} disablePadding>
                      <ListItemButton onClick={() => { item.onClick(); setDrawerOpen(false); }}>
                        <ListItemText primary={item.label} sx={{ color: '#ff9800', fontWeight: 700 }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="sticky" color="default" sx={{ zIndex: 1201 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: 72 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Replace logo icon with a star symbol */}
              <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 900, fontSize: 36, lineHeight: 1, mr: 1 }}>
                ★
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff9800', letterSpacing: 2 }}>
                Movie Explorer
              </Typography>
            </Box>
            {/* Show search bar only on desktop/tablet */}
            {showSearch ? (
              <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search movies..."
                size="small"
                sx={{
                  bgcolor: '#23272f', // black background
                  borderRadius: 2,
                  minWidth: { xs: 120, sm: 200, md: 300 },
                  mr: 2,
                  input: { color: '#fff', fontWeight: 600 },
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
            ) : null}
            <Box>
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Button color="inherit" sx={{ color: '#ff9800', fontWeight: 600 }} onClick={() => navigate('/admin')}>Admin Dashboard</Button>
                  )}
                  {user.role === 'user' && (
                    <Button color="inherit" sx={{ color: '#ff9800', fontWeight: 600 }} onClick={() => navigate('/user')}>User Dashboard</Button>
                  )}
                  <Button color="inherit" sx={{ color: '#fff', fontWeight: 600, ml: 2, bgcolor: '#ff9800', borderRadius: 2 }} onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Button color="inherit" sx={{ color: '#ff9800', fontWeight: 600 }} onClick={() => navigate('/login')}>Login</Button>
                  <Button color="inherit" sx={{ color: '#fff', fontWeight: 600, ml: 2, bgcolor: '#ff9800', borderRadius: 2 }} onClick={() => navigate('/signup')}>Signup</Button>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </ElevationScroll>
  );
}
