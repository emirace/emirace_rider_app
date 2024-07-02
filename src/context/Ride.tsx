import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { Ride } from "../type/ride";
import RideService from "../services/ride";
import socket from "../socket";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "react-native-paper";
import Backdrop from "../components/Backdrop";
import CallScreen from "../components/CallScreen";

interface RideType {
  rides: Ride[];
  loading: { [key: string]: boolean };
  error: { [key: string]: string | null };
  cancelRide: (rideId: string) => Promise<void>;
  acceptRide: (rideId: string) => Promise<void>;
  rejectRide: (rideId: string) => Promise<void>;
  startRide: (rideId: string) => Promise<void>;
  arrivedAtPickup: (rideId: string) => Promise<void>;
  goToDestination: (rideId: string) => Promise<void>;
  arrivedAtDestination: (rideId: string) => Promise<void>;
  delivered: (rideId: string) => Promise<void>;
}

const RideContext = createContext<RideType | undefined>(undefined);

export const RideProvider = ({ children }: { children: ReactNode }) => {
  const { colors } = useTheme();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<{ [key: string]: string | null }>({});
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);

  const callRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    socket.on("rideRequested", (newRide: Ride) => {
      setCurrentRide(newRide);
      showCallScreen();
    });

    return () => {
      socket.close();
    };
  }, []);

  const showCallScreen = () => {
    if (callRef.current) {
      callRef.current.present();
    }
  };

  const setLoadingState = (action: string, state: boolean) => {
    setLoading((prev) => ({ ...prev, [action]: state }));
  };

  const setErrorState = (action: string, message: string | null) => {
    setError((prev) => ({ ...prev, [action]: message }));
  };

  const updateRideState = (updatedRide: Ride) => {
    setRides((prevRides) =>
      prevRides.map((ride) =>
        ride._id === updatedRide._id ? updatedRide : ride
      )
    );
  };

  const handleAction = async (
    action: string,
    rideId: string,
    serviceMethod: (id: string) => Promise<Ride>
  ) => {
    setLoadingState(action, true);
    setErrorState(action, null);
    try {
      const updatedRide = await serviceMethod(rideId);
      updateRideState(updatedRide);
    } catch (err: any) {
      setErrorState(action, err.message || "An error occurred");
    } finally {
      setLoadingState(action, false);
    }
  };

  const cancelRide = (rideId: string) =>
    handleAction("cancelRide", rideId, RideService.cancelRide);
  const acceptRide = (rideId: string) =>
    handleAction("acceptRide", rideId, RideService.acceptRide);
  const rejectRide = (rideId: string) =>
    handleAction("rejectRide", rideId, RideService.rejectRide);
  const startRide = (rideId: string) =>
    handleAction("startRide", rideId, RideService.startRide);
  const arrivedAtPickup = (rideId: string) =>
    handleAction("arrivedAtPickup", rideId, RideService.arrivedAtPickup);
  const goToDestination = (rideId: string) =>
    handleAction("goToDestination", rideId, RideService.goToDestination);
  const arrivedAtDestination = (rideId: string) =>
    handleAction(
      "arrivedAtDestination",
      rideId,
      RideService.arrivedAtDestination
    );
  const delivered = (rideId: string) =>
    handleAction("delivered", rideId, RideService.delivered);

  return (
    <RideContext.Provider
      value={{
        rides,
        loading,
        error,
        cancelRide,
        acceptRide,
        rejectRide,
        startRide,
        arrivedAtPickup,
        goToDestination,
        arrivedAtDestination,
        delivered,
      }}
    >
      {children}
      <BottomSheetModal
        ref={callRef}
        index={0}
        snapPoints={["40%"]}
        backgroundStyle={{
          backgroundColor: colors.background,
        }}
        enablePanDownToClose={false}
        handleComponent={null}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
        backdropComponent={Backdrop}
        enableDynamicSizing={true}
      >
        {/* call screem */}
        <BottomSheetView>
          <CallScreen
            currentRide={currentRide}
            closeCall={() => callRef.current?.dismiss()}
            acceptRide={acceptRide}
            rejectRide={rejectRide}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </RideContext.Provider>
  );
};

export const useRide = (): RideType => {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error("useRide must be used within a RideProvider");
  }
  return context;
};
