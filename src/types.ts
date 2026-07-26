export type CategoryType = 'all' | 'savon' | 'creme' | 'pack';

export interface Product {
  id: string;
  name: string;
  category: 'savon' | 'creme' | 'pack';
  weight?: string;
  price: number; // in FCFA
  description: string;
  image: string;
  secondaryImage?: string;
  badge?: string;
  skinTypes?: string[];
  ingredients?: string[];
  usage?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  productName?: string;
  city?: string;
}

export interface ReassuranceMetric {
  value: string;
  label: string;
  sublabel: string;
}

export interface SkinDiagnosticAnswers {
  skinTone: string;
  concern: string;
  preferredProduct: string;
}
