export interface Application {
  id: number;
  role_id: number;
  telegram: string;
  huruj_date: number;
  solat_id: number;
  return: number;
  comment: string;
  location: Location;
  created_at: string;
  updated_at: string;
}

export interface Location {
  type: string;
  coordinates: number[];
}

export interface ApplicationRequest {
  role_id: number;
  telegram: string;
  solat_id: number;
  return: boolean;
  comment: string;
  location: number[];
}
