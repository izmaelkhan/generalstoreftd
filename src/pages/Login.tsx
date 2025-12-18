// src/pages/Login.tsx
import {
    Container,
    TextField,
    Button,
    Stack,
    Typography,
    Alert,
  } from '@mui/material';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type  { AuthRequest } from '../api/types';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const { login } = useAuth();
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthRequest>();
  
  const onSubmit: SubmitHandler<AuthRequest> = async data => {
    try {
      await login(data);
    } catch (e: any) {
      // Show a generic error (Spring returns 401)
      setError('username', { type: 'manual', message: 'Invalid credentials' });
      setError('password', { type: 'manual', message: '' });
    }
  };

  // Helper to trigger the OpenID redirect
  const openIdLogin = (provider: 'google' | 'github') => {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    window.location.href = `${base}/oauth2/authorization/${provider}`;
  };

  return (
    <Container maxWidth="xs">
      <Stack spacing={2} mt={8}>
        <Typography variant="h5" textAlign="center">
          Sign in
        </Typography>

        {/* Username / password login */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Username"
              {...register('username', { required: 'Username required' })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              label="Password"
              type="password"
              {...register('password', { required: 'Password required' })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            {errors.username && (
              <Alert severity="error">{errors.username.message}</Alert>
            )}
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Stack>
        </form>

        {/* Divider */}
        <Typography align="center">or</Typography>

        {/* OpenID buttons */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => openIdLogin('google')}
        >
          Continue with Google
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => openIdLogin('github')}
        >
          Continue with GitHub
        </Button>

        <Button
          variant="text"
          component="a"
          href="/register"
          sx={{ alignSelf: 'center' }}
        >
          No account? Register
        </Button>
      </Stack>
    </Container>
  );
};
