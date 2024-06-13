import { DrawerScreenProps } from "@react-navigation/drawer";

export type RootDrawerParamList = {
  StackNavigator: undefined;
  History: undefined;
  Notification: undefined;
  Wallet: undefined;
  About: undefined;
  Support: undefined;
  Settings: undefined;
};

export type StackNavigatorNavigationProp = DrawerScreenProps<
  RootDrawerParamList,
  "StackNavigator"
>;

export type HistoryNavigationProp = DrawerScreenProps<
  RootDrawerParamList,
  "History"
>;

export type NotificationNavigationProp = DrawerScreenProps<
  RootDrawerParamList,
  "Notification"
>;

export type WalletNavigationProp = DrawerScreenProps<
  RootDrawerParamList,
  "Wallet"
>;

export type SupportNavigationProp = DrawerScreenProps<
  RootDrawerParamList,
  "Support"
>;

export type AboutNavigationProp = DrawerScreenProps<
  RootDrawerParamList,
  "About"
>;

export type SettingsNavigationProp = DrawerScreenProps<
  RootDrawerParamList,
  "Settings"
>;
