// LocationContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as Location from "expo-location";
import {
  LocationObject,
  LocationSubscription,
  LocationHeadingObject,
} from "expo-location";
import { Modal } from "react-native-paper";
import RequestLocation from "../components/RequestLocation";
import throttle from "lodash.throttle";
import api from "../services/api";

interface LocationContextProps {
  location: LocationObject | null;
  loading: boolean;
  heading: LocationHeadingObject | null;
}

const LocationContext = createContext<LocationContextProps | undefined>(
  undefined
);

const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [heading, setHeading] = useState<LocationHeadingObject | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [locationSubscription, setLocationSubscription] =
    useState<LocationSubscription | null>(null);
  const [headingSubscription, setHeadingSubscription] =
    useState<LocationSubscription | null>(null);
  const closeModal = () => setModalVisible(false);

  const handlePermissionDenied = () => {
    console.error("Permission to access location was denied");
    setModalVisible(true);
    setLoading(false);
  };

  const shareLocation = throttle(async (locationToShare: LocationObject) => {
    try {
      const response = await api.post("/users/location", {
        latitude: locationToShare.coords.latitude,
        longitude: locationToShare.coords.longitude,
        heading: heading,
      });

      if (response.status !== 200) {
        throw new Error("Failed to share location.");
      }

      console.log("Location shared successfully.");
    } catch (error) {
      console.error("Error sharing location:", error);
    }
  }, 10000);

  const startWatchingLocation = async () => {
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 5000,
        distanceInterval: 1,
      },
      (newLocation) => {
        setLocation(newLocation);
        setLoading(false);
        closeModal();
        // shareLocation(newLocation);
      }
    );
    setLocationSubscription(subscription);
    const headingSub = await Location.watchHeadingAsync((newHeading) => {
      setHeading(newHeading);
    });
    setHeadingSubscription(headingSub);
  };

  const requestLocation = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      handlePermissionDenied();
      return;
    }
    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    setLocation(currentLocation);
    await startWatchingLocation();
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === "granted") {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        await startWatchingLocation();
      } else {
        handlePermissionDenied();
      }
      setLoading(false);
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        loading,
        heading,
      }}
    >
      {children}
      <Modal visible={isModalVisible} dismissable={false}>
        <RequestLocation
          handlePermissionRequest={requestLocation}
          loading={loading}
        />
      </Modal>
    </LocationContext.Provider>
  );
};

const useLocation = () => {
  const context = React.useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export { LocationProvider, useLocation };
