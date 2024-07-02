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
import { EditLocationNavigationProp } from "../../../../type/navigation/stack";
import useAuth from "../../../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";

const EditLocation: React.FC<EditLocationNavigationProp> = ({ navigation }) => {
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
      handleChange("image", result.assets[0].uri);
    }
  };

  const handleChange = (name: string, value: string) => {
    setVerifyField((prev: any) => ({
      ...prev,
      user: {
        ...prev.user,
        address: {
          ...prev.user.address,
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
          title="Edit your address"
        />
      </Appbar.Header>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          Please enter address as it appears on your prove of address documenet
        </Text>
        <TextInput
          label="Number"
          value={verifyField.user.address.number}
          onChangeText={(text) => handleChange("number", text)}
          style={styles.input}
        />
        <TextInput
          label="Street"
          value={verifyField.user.address.street}
          onChangeText={(text) => handleChange("street", text)}
          style={styles.input}
        />

        <TextInput
          label="Landmark"
          value={verifyField.user.address.landmark}
          onChangeText={(text) => handleChange("landmark", text)}
          style={styles.input}
        />
        <TextInput
          label="Local Government Area"
          value={verifyField.user.address.lga}
          onChangeText={(text) => handleChange("lga", text)}
          style={styles.input}
        />
        <TextInput
          label="State"
          value={verifyField.user.address.state}
          onChangeText={(text) => handleChange("state", text)}
          style={styles.input}
        />
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Add prove of address
          </Text>
          {!verifyField.user.address.image ? (
            <TouchableOpacity onPress={pickImage} style={styles.inputImage}>
              <Icon size={20} source={"image"} />
            </TouchableOpacity>
          ) : (
            <View>
              <Image
                source={{ uri: verifyField.user.address.image }}
                style={styles.inputImage}
              />

              <IconButton
                icon="pen"
                style={[styles.edit, { backgroundColor: colors.background }]}
                onPress={pickImage}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <Button
        mode="contained"
        disabled={
          !verifyField.user.address.image ||
          !verifyField.user.address.landmark ||
          !verifyField.user.address.number ||
          !verifyField.user.address.lga ||
          !verifyField.user.address.state ||
          !verifyField.user.address.street
        }
        onPress={() => navigation.goBack()}
        style={{ marginBottom: 30, marginHorizontal: 20 }}
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

export default EditLocation;
