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
  //   barcode: string;
  //   image: Picture;
  location: Location;
  actor: Actor;
  id: string;
}
