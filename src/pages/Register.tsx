// src/pages/Register.tsx
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
import type { RegisterRequest } from '../api/types';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
   if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterRequest>();

  const onSubmit: SubmitHandler<RegisterRequest> = async data => {
    try {
      await api.post('/api/auth/register', data);
      // After successful registration, redirect to login
      navigate('/login');
    } catch (e: any) {
      // For simplicity we just surface a generic error
      setError('username', {
        type: 'manual',
        message: 'Registration failed – username may already exist',
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <Stack spacing={2} mt={8}>
        <Typography variant="h5" textAlign="center">
          Register
        </Typography>

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
              Register
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};
