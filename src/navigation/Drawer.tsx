import { createDrawerNavigator } from "@react-navigation/drawer";
import History from "../Screens/History";
import StackNavigator from "./Stack";
import { RootDrawerParamList } from "../type/navigation/drawer";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { Icon } from "react-native-paper";
import Wallet from "../Screens/Wallet";
import Notification from "../Screens/Notification";
import About from "../Screens/About";
import Support from "../Screens/Support";
import { Dimensions } from "react-native";
import Settings from "../Screens/Settings";

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const WIDTH = Dimensions.get("screen").width;
export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 18,
          fontWeight: "400",
        },
        drawerItemStyle: {
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 50,
        },
        drawerStyle: {
          width: WIDTH * 0.8,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="StackNavigator"
        options={{
          title: "Home",
          drawerIcon: ({ color }) => (
            <Icon color={color} size={24} source={"home-outline"} />
          ),
        }}
        component={StackNavigator}
      />

      <Drawer.Screen
        name="Notification"
        options={{
          drawerIcon: ({ color }) => (
            <Icon color={color} size={24} source={"bell-outline"} />
          ),
        }}
        component={Notification}
      />

      <Drawer.Screen
        name="History"
        options={{
          title: "Ride History",
          drawerIcon: ({ color }) => (
            <Icon color={color} size={24} source={"motorbike"} />
          ),
        }}
        component={History}
      />

      <Drawer.Screen
        name="Wallet"
        options={{
          drawerIcon: ({ color }) => (
            <Icon color={color} size={24} source={"wallet-outline"} />
          ),
        }}
        component={Wallet}
      />

      <Drawer.Screen
        name="Settings"
        options={{
          drawerIcon: ({ color }) => (
            <Icon color={color} size={24} source={"cog-outline"} />
          ),
        }}
        component={Settings}
      />

      <Drawer.Screen
        name="Support"
        options={{
          drawerIcon: ({ color }) => (
            <Icon color={color} size={24} source={"help-circle-outline"} />
          ),
        }}
        component={Support}
      />

      <Drawer.Screen
        name="About"
        options={{
          drawerIcon: ({ color }) => (
            <Icon color={color} size={24} source={"information-outline"} />
          ),
        }}
        component={About}
      />
    </Drawer.Navigator>
  );
}
