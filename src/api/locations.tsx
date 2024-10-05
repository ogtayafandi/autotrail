import { Location } from '@/types/location';
import ApiService from './index';

class Locations extends ApiService {
  allLocations(): Promise<Location> {
    return this.get('/locations')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Register error:', error);
        throw error;
      });
  }

  getSingleLocation(id: string): Promise<Location> {
    return this.get(`location/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Register error:', error);
      throw error;
    });

  }
}

export default new Locations();