import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import Splash from "../Screens/Splash";
import SignIn from "../Screens/auth/SignIn";
import useAuth from "../context/AuthContext";
import Onboarding from "../Screens/Onboarding";
import { RootStackParamList } from "../type/navigation/stack";
import Token from "../Screens/auth/Token";
import UserInfo from "../Screens/auth/Verification/UserInfo";
import EditFullName from "../Screens/auth/Verification/UserInfo/EditFullName";
import EditEmail from "../Screens/auth/Verification/UserInfo/EditEmail";
import EditLocation from "../Screens/auth/Verification/UserInfo/EditLocation";
import Vehicle from "../Screens/auth/Verification/Vehicle";
import VehicleImage from "../Screens/auth/Verification/Vehicle/VehicleImage";
import VerificationStatus from "../Screens/auth/Verification/VerificationStatus";
import Appearance from "../Screens/Settings/Appearance";
import { DrawerNavigator } from "./Drawer";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Backdrop from "../components/Backdrop";
import CallScreen from "../components/CallScreen";
import { useTheme } from "react-native-paper";
import socket from "../socket";
import { Ride } from "../type/ride";

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const { user, loading } = useAuth();

  // if (loading) {
  //   // We haven't finished checking for the token yet
  //   return <Splash />;
  // }

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Token" component={Token} />
            <Stack.Screen name="UserInfo" component={UserInfo} />
            <Stack.Screen name="EditFullName" component={EditFullName} />
            <Stack.Screen name="EditEmail" component={EditEmail} />
            <Stack.Screen name="EditLocation" component={EditLocation} />
            <Stack.Screen name="Vehicle" component={Vehicle} />
            <Stack.Screen name="VehicleImage" component={VehicleImage} />
            <Stack.Screen
              name="VerificationStatus"
              component={VerificationStatus}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={DrawerNavigator} />
            <Stack.Screen name="Appearance" component={Appearance} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
