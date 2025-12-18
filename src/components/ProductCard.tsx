// src/components/ProductCard.tsx
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import type { Product } from '../api/types';

interface Props {
  product: Product;
  onAddToCart?: (p: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: Props) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom>
        {product.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {product.description}
      </Typography>
      <Typography variant="subtitle1" color="primary">
        ${product.price.toFixed(2)}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={() => onAddToCart?.(product)}>
        Add to Cart
      </Button>
    </CardActions>
  </Card>
);
