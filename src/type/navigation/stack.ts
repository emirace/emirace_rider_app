import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
  SignIn: undefined;
  Token: { phone: string };
  UserInfo: undefined;
  EditFullName: undefined;
  EditEmail: undefined;
  EditLocation: undefined;
  Vehicle: undefined;
  VehicleImage: undefined;
  VerificationStatus: undefined;
  Appearance: undefined;
};

export type OnboardingNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "Onboarding"
>;

export type SignInNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "SignIn"
>;

export type TokenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "Token"
>;

export type UserInfoNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "UserInfo"
>;

export type HomeNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export type EditFullNameNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "EditFullName"
>;

export type EditEmailNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "EditEmail"
>;

export type EditLocationNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "EditLocation"
>;

export type VehicleNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "Vehicle"
>;

export type VehicleImageNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "VehicleImage"
>;

export type VerificationStatusNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "VerificationStatus"
>;

export type AppearanceNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "Appearance"
>;
