
export type Clinic = {
  distance: number;
  id: string;
  name: string;
  address: FormattedAddress;
  coordinates: { lat: number | null; long: number | null };
  formatted_address: string | null;
  phone_number: string | null;
  website: string | null;
  openinghours: string[] | null;
};

export type FormattedAddress = {
  streetAddress: string | null;
  zip: string | null;
  city: string | null;
  län: string | null;
  country: string | null;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface PlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  international_phone_number?: string;
  website?: string;
  opening_hours?: {
    weekday_text: string[];
  };
  address_components?: AddressComponent[];
}
