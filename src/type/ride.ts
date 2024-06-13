export interface Ride {
  _id: string;
  passenger: {
    _id: string;
    name: string;
    image: string;
    phone: string;
    rating: number;
  };
  driver: {
    _id: string;
    name: string;
    image: string;
    phone: string;
    rating: number;
  };
  startLocation: Location;
  endLocation: Location;
  fare: number;
  status: string;
  paymentMethod: string;
  origin: LocationInfo;
  destination: LocationInfo;
  travelTimeInformation: TravelTimeInformation;
  type: string;
  [key: string]: any;
}

export interface Location {
  type: string;
  coordinates: number[];
}

interface LocationInfo {
  description: string;
  location: { lat: number; lng: number };
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export interface TravelTimeInformation {
  distance: { text: string; value: number };
  duration: { text: string; value: number };
}
