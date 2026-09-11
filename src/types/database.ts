export interface User {
  id: string;
  email: string;
  username: string | null;
  name: string | null;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Producto {
  id: string;
  title: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  whatsappUrl: string;
  createdAt: string;
}

export interface SystemConfig {
  key: string;
  value: string;
  updatedAt: string;
}

export interface MigrationTracking {
  id: string;
  version: string;
  appliedAt: string;
}
