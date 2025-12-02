export enum ViewState {
  HOME = 'HOME',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CART = 'CART',
  VENDOR = 'VENDOR',
  FAVORITES = 'FAVORITES'
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  
  // Fractional ownership fields
  totalPrice: number; // Full price of the item
  totalShares: number; // Total number of parts available
  availableShares: number; // Remaining parts
  sharePrice: number; // Price per single part
  
  // Metadata
  sellerName: string;
  rating: number;
  badge?: string; // e.g., 'Хит', 'Новинка', 'Высокий доход'
}

export interface CartItem {
  product: Product;
  quantityShares: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}