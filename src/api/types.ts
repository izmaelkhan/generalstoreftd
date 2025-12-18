// src/api/types.ts

// Auth
export interface AuthRequest {
  username: string;
  password: string;
}
export interface AuthResponse {
  token: string;
}

// Registration (same fields as AuthRequest for this demo)
export interface RegisterRequest {
  username: string;
  password: string;
}

// Product (adjust fields to match your back‑end)
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

// Order (very simple for demo)
export interface Order {
  id: number;
  totalAmount: number;
  createdAt: string; // ISO date string
}
