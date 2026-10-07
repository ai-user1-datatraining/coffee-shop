export interface Product {
  id: number;
  name: string;
  nameEn: string;
  category: string;
  price: number;
  description: string;
  origin: string;
  roastLevel: string;
  flavor: string[];
  image: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
