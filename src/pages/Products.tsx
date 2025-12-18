import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

// Type for a product (already defined in src/api/types.ts)
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

// Fetch function – the Authorization header is added by the interceptor
const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>('/api/products');
  return data;
};

export const Products = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery(['products'], fetchProducts, {
    // optional: refetch only when the token changes
    // enabled: !!localStorage.getItem('jwt')
  });

  if (isLoading) return <Typography>Loading products…</Typography>;
  if (isError) return <Typography color="error">Error: {(error as Error).message}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <List>
        {products?.map((p) => (
          <ListItem key={p.id}>
            <ListItemText
              primary={p.name}
              secondary={`${p.description} — $${p.price.toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};