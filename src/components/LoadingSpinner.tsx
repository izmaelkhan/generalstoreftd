// src/components/LoadingSpinner.tsx
import { CircularProgress, Box } from '@mui/material';

export const LoadingSpinner = () => (
  <Box display="flex" justifyContent="center" mt={4}>
    <CircularProgress />
  </Box>
);
