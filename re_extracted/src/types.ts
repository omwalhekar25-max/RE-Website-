export type PropertyType = 'All' | 'Villa' | 'Penthouse' | 'Modern Estate' | 'Waterfront' | 'Mansion';

export interface Property {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  formattedPrice: string;
  location: string;
  city: 'Miami' | 'Malibu' | 'Beverly Hills' | 'Aspen' | 'Manhattan' | 'Palm Beach';
  address: string;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  featured: boolean;
  isLease?: boolean;
  leaseRateMonthly?: string;
  mainImage: string;
  gallery: string[];
  description: string;
  features: string[];
  yearBuilt: number;
  agent: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
  virtualTourUrl?: string;
}

export interface SearchFilters {
  location: string;
  propertyType: PropertyType;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  isForLease: boolean;
}

export type EssentialPage =
  | 'home'
  | 'properties'
  | 'featured'
  | 'cities'
  | 'leases'
  | 'tours'
  | 'mortgage'
  | 'favorites'
  | 'agents'
  | 'about'
  | 'contact';

export interface Agent {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  salesVolume: string;
  listingsCount: number;
  specialization: string;
}
