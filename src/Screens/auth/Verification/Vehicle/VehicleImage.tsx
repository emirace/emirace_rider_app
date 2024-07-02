import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import {
  Appbar,
  Icon,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import Button from "../../../../components/Button";
import { VehicleImageNavigationProp } from "../../../../type/navigation/stack";
import useAuth from "../../../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";

const VehicleImage: React.FC<VehicleImageNavigationProp> = ({ navigation }) => {
  const { verifyField, setVerifyField } = useAuth();
  const { colors } = useTheme();

  const pickImage = async (name: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange(name, result.assets[0].uri);
    }
  };
  const handleChange = (name: string, value: string) => {
    setVerifyField((prev: any) => ({
      ...prev,
      vehicle: {
        ...prev.vehicle,
        image: {
          ...prev.vehicle.image,
          [name]: value,
        },
      },
    }));
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="medium">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          titleStyle={{
            fontSize: 30,
            fontWeight: "bold",
          }}
          title="Add vehicle photo"
        />
      </Appbar.Header>
      <ScrollView
        style={{
          paddingHorizontal: 20,
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          Please add a clear and acurate image
        </Text>
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Front View</Text>
          {!verifyField.vehicle.image.front ? (
            <TouchableOpacity
              onPress={() => pickImage("front")}
              style={styles.inputImage}
            >
              <Icon size={20} source={"image"} />
            </TouchableOpacity>
          ) : (
            <View>
              <Image
                source={{ uri: verifyField.vehicle.image.front }}
                style={styles.inputImage}
              />

              <IconButton
                icon="pen"
                style={[styles.edit, { backgroundColor: colors.background }]}
                onPress={() => pickImage("front")}
              />
            </View>
          )}
        </View>
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Rear View</Text>
          {!verifyField.vehicle.image.back ? (
            <TouchableOpacity
              onPress={() => pickImage("back")}
              style={styles.inputImage}
            >
              <Icon size={20} source={"image"} />
            </TouchableOpacity>
          ) : (
            <View>
              <Image
                source={{ uri: verifyField.vehicle.image.back }}
                style={styles.inputImage}
              />

              <IconButton
                icon="pen"
                style={[styles.edit, { backgroundColor: colors.background }]}
                onPress={() => pickImage("back")}
              />
            </View>
          )}
        </View>

        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Side View</Text>
          {!verifyField.vehicle.image.side ? (
            <TouchableOpacity
              onPress={() => pickImage("side")}
              style={styles.inputImage}
            >
              <Icon size={20} source={"image"} />
            </TouchableOpacity>
          ) : (
            <View>
              <Image
                source={{ uri: verifyField.vehicle.image.side }}
                style={styles.inputImage}
              />

              <IconButton
                icon="pen"
                style={[styles.edit, { backgroundColor: colors.background }]}
                onPress={() => pickImage("side")}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <Button
        mode="contained"
        style={{ marginBottom: 30, marginHorizontal: 20 }}
        disabled={
          !verifyField.vehicle.image.back ||
          !verifyField.vehicle.image.front ||
          !verifyField.vehicle.image.side
        }
        onPress={() => navigation.goBack()}
      >
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    marginBottom: 20,
  },
  inputImage: {
    borderStyle: "dashed",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    marginBottom: 30,
  },
  edit: {
    position: "absolute",
    right: 20,
    top: 20,
  },
});

export default VehicleImage;
