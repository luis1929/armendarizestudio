export interface Product {
  id: string;
  title: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  whatsappUrl: string;
}

export interface CartItem {
  id: string;
  quantity: number;
}
