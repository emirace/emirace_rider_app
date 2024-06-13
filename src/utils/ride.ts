export const calculateDistance = (
  location1: { lat: number; lng: number },
  location2: { lat: number; lng: number }
): number => {
  const R = 6371e3; // metres
  const φ1 = (location1.lat * Math.PI) / 180;
  const φ2 = (location2.lat * Math.PI) / 180;
  const Δφ = ((location2.lat - location1.lat) * Math.PI) / 180;
  const Δλ = ((location2.lng - location1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // in metres
  return distance;
};
