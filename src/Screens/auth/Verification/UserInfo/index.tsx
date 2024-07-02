import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  TextInput,
  Text,
  Appbar,
  useTheme,
  IconButton,
  List,
  Divider,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Button from "../../../../components/Button";
import { UserInfoNavigationProp } from "../../../../type/navigation/stack";
import useAuth from "../../../../context/AuthContext";

const UserInfo: React.FC<UserInfoNavigationProp> = ({ navigation }) => {
  const { verifyField, setVerifyField } = useAuth();
  const { colors } = useTheme();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setVerifyField((prev: any) => ({
        ...prev,
        user: {
          ...prev.user,
          image: result.assets[0].uri,
        },
      }));
    }
  };

  return (
    <View>
      <Appbar.Header mode="medium">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          titleStyle={{
            fontSize: 30,
            fontWeight: "bold",
          }}
          title="User Info"
        />
        <Button
          onPress={() => navigation.push("Vehicle")}
          disabled={
            !verifyField.user.image ||
            !verifyField.user.address.image ||
            !verifyField.user.name.image ||
            !verifyField.user.email
          }
        >
          Save
        </Button>
      </Appbar.Header>
      <View
        style={[
          styles.imageContainer,
          { backgroundColor: colors.elevation.level1 },
        ]}
      >
        <Image
          source={
            verifyField.user.image
              ? { uri: verifyField.user.image }
              : require("../../../../../assets/images/defaultProfile.png")
          }
          style={styles.image}
        />
        <Text style={styles.label}>Profile photo</Text>
        <IconButton icon="pen" style={styles.edit} onPress={pickImage} />
      </View>
      <View style={{ padding: 20 }}>
        <List.Item
          title="Full name"
          description={
            verifyField.user.name.firstName
              ? verifyField.user.name.firstName +
                " " +
                verifyField.user.name.lastName
              : "Enter your full name"
          }
          onPress={() => navigation.push("EditFullName")}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={styles.label}
          descriptionStyle={styles.description}
        />
        <Divider />
        <List.Item
          title="email"
          description={
            verifyField.user.email ? verifyField.user.email : "Enter your email"
          }
          onPress={() => navigation.push("EditEmail")}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={styles.label}
          descriptionStyle={styles.description}
        />
        <Divider />
        <List.Item
          title="address"
          description={
            verifyField.user.address.street
              ? verifyField.user.address.number +
                " " +
                verifyField.user.address.street +
                " " +
                verifyField.user.address.state
              : "Enter your address"
          }
          onPress={() => navigation.push("EditLocation")}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={styles.label}
          descriptionStyle={styles.description}
        />
        <Divider />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    padding: 20,
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 80,
    backgroundColor: "black",
  },
  label: {
    fontWeight: "600",
    fontSize: 18,
    textTransform: "uppercase",
    paddingVertical: 10,
  },
  edit: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  description: {
    fontWeight: "600",
  },
});

export default UserInfo;
