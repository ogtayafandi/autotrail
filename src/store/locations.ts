import { create } from 'zustand';
import { Location } from '../types/location';

interface LocationState {
  locations: any | null;
  setLocations: (user: Location | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  locations: null,
  setLocations: (locations) => {
        if(locations) {
            set({ locations })
        }
    },
}));