import { Ride } from "../type/ride";
import api from "./api";

const RideService = {
  cancelRide: async (rideId: string): Promise<Ride> => {
    const response = await api.post("/rides/cancel", { rideId });
    return response.data.updatedRide;
  },

  acceptRide: async (rideId: string): Promise<Ride> => {
    const response = await api.post("/rides/accept", { rideId });
    return response.data.updateRide;
  },

  rejectRide: async (rideId: string): Promise<Ride> => {
    const response = await api.post("/rides/reject", { rideId });
    return response.data.ride;
  },

  startRide: async (rideId: string): Promise<Ride> => {
    const response = await api.post("/rides/start", { rideId });
    return response.data.ride;
  },

  arrivedAtPickup: async (rideId: string): Promise<Ride> => {
    const response = await api.post("/rides/arrived-at-pickup", { rideId });
    return response.data.ride;
  },

  goToDestination: async (rideId: string): Promise<Ride> => {
    const response = await api.post("/rides/go-to-destination", { rideId });
    return response.data.ride;
  },

  arrivedAtDestination: async (rideId: string): Promise<Ride> => {
    const response = await api.post("/rides/arrived-at-destination", {
      rideId,
    });
    return response.data.ride;
  },

  delivered: async (rideId: string): Promise<Ride> => {
    const response = await api.post("/rides/delivered", { rideId });
    return response.data.ride;
  },
};

export default RideService;
