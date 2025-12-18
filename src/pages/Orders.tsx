// src/pages/Orders.tsx
import { useQuery } from '@tanstack/react-query';
import { Container, List, ListItem, ListItemText, Alert } from '@mui/material';
import api from '../api/axios';
import type { Order } from '../api/types';
import { LoadingSpinner } from '../components/LoadingSpinner';

const fetchOrders = async (): Promise<Order[]> => {
  const { data } = await api.get('/api/orders');
  return data;
};

export const Orders = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery(['orders'], fetchOrders);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Alert severity="error">Could not load orders</Alert>;

  return (
    <Container sx={{ py: 4 }}>
      <List>
        {orders?.map(o => (
          <ListItem key={o.id} divider>
            <ListItemText
              primary={`Order #${o.id} – $${o.totalAmount.toFixed(2)}`}
              secondary={new Date(o.createdAt).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
