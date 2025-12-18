// src/components/Navbar.tsx
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          General Store
        </Typography>

        {isAuthenticated ? (
          <Box>
            <Button component={RouterLink} to="/home" color="inherit">
              Home
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/products"
            >
              Products
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/orders"
            >
              Orders
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            color="inherit"
            component={RouterLink}
            to="/login"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
