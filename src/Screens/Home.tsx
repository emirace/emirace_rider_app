import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useRef } from "react";
import Map from "../components/Map";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Appbar, Avatar, useTheme } from "react-native-paper";
import CustomBackdrop from "../components/CustomBackdrop";
import TripPlanner from "../components/TripPlanner";
import Task from "../components/Task";
import { useLocation } from "../context/Location";
const WIDTH = Dimensions.get("screen").width;

const Home: React.FC<any> = ({ navigation }) => {
  const { colors } = useTheme();
  const { loading, location } = useLocation();
  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const plannerRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.expand();
    }
  };

  const openPlanner = () => {
    if (plannerRef.current) {
      plannerRef.current.present();
    }
  };

  console.log("location", location);

  return (
    <View style={{ flex: 1 }}>
      <Map />
      <Appbar.Header
        style={{
          backgroundColor: "transparent",
          justifyContent: "space-between",
        }}
      >
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
          size={35}
          style={{ backgroundColor: colors.background, borderRadius: 15 }}
        />
        <View
          style={{
            flexDirection: "row",
            gap: 20,
          }}
        >
          <View
            style={{
              backgroundColor: colors.onBackground,
              padding: 8,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: colors.background,
                fontWeight: "bold",
                fontSize: 30,
              }}
            >
              #200.00
            </Text>
          </View>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Avatar.Image
              size={45}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjfC2G0DZgHsNbml5F0GoWhFS3eElD1aSYQiPNabQ&s",
              }}
            />
          </TouchableOpacity>
        </View>
      </Appbar.Header>
      <BottomSheet
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={["15%", "50%"]}
        backgroundStyle={{
          backgroundColor: colors.background,
        }}
        // handleComponent={null}
        enablePanDownToClose={false}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
          width: WIDTH / 4,
        }}
      >
        <Task openPlanner={openPlanner} />
      </BottomSheet>

      <BottomSheetModal
        ref={plannerRef}
        index={0}
        snapPoints={["100%"]}
        backgroundStyle={{
          backgroundColor: colors.background,
        }}
        enablePanDownToClose={false}
        handleComponent={null}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
      >
        <TripPlanner closePlanner={() => plannerRef.current?.dismiss()} />
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  requestLocationModal: {
    padding: 20,
  },
});

export default Home;
