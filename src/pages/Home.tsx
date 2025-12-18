// src/pages/Home.tsx
import { Container, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Home = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>
          Welcome to the General Store!
        </Typography>

        {isAuthenticated ? (
          <>
            <Typography variant="body1" sx={{ mb: 3 }}>
              You are logged in. Browse our products or view your orders.
            </Typography>

            <Button
              component={RouterLink}
              to="/products"
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              Products
            </Button>

            <Button
              component={RouterLink}
              to="/orders"
              variant="outlined"
              color="primary"
              sx={{ mr: 2 }}
            >
              My Orders
            </Button>

            <Button onClick={logout} color="secondary" variant="text">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Please log in or register to start shopping.
            </Typography>

            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              Login
            </Button>

            <Button
              component={RouterLink}
              to="/register"
              variant="outlined"
              color="primary"
            >
              Register
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};
