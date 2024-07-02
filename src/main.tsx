import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  PaperProvider,
} from "react-native-paper";
import React from "react";
import merge from "deepmerge";
import { dark_theme, light_theme } from "./constant/colors";
import useTheme from "./context/ThemeContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { KeyboardAvoidingView, Platform } from "react-native";
import { LocationProvider } from "./context/Location";
import { RideProvider } from "./context/Ride";
import StackNavigator from "./navigation/Stack";

const paperLighttheme = {
  ...MD3DarkTheme,
  colors: light_theme.colors,
};

const paperDarktheme = {
  ...MD3LightTheme,
  colors: dark_theme.colors,
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme, paperLighttheme);
const CombinedDarkTheme = merge(DarkTheme, paperDarktheme);

const Main = () => {
  const { themeMode } = useTheme();

  const paperTheme =
    themeMode === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={paperTheme}>
        <LocationProvider>
          <BottomSheetModalProvider>
            <RideProvider>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
              >
                <StackNavigator />
              </KeyboardAvoidingView>
            </RideProvider>
          </BottomSheetModalProvider>
        </LocationProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Main;
