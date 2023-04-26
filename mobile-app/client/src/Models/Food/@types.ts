export interface Location {
  lat: number;
  lng: number;
}

export type Actor =
  | 'PRODUCER'
  | 'MANUFACTURER'
  | 'WHOLESALER'
  | 'DISTRIBUTOR'
  | 'RETAILER'
  | 'CONSUMER';

export interface Food {
  name: string;
  price: number;
  quantity: string;
  imageUrl: string;
  location: Location;
  actor: Actor;
  id: string;
}

export interface FoodImageUploadResponse {
  access_mode: string;
  asset_id: string;
  bytes: number;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  original_filename: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags?: null[] | null;
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
}
