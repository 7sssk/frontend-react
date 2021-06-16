import { LatLng } from './map.model';

export interface Application {
  role_id: number;
  telegram: string;
  huruj_date: string;
  solat_id: number;
  return: boolean;
  comment: string;
  latlng: LatLng;
}
