import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import {
  Appbar,
  Icon,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import Button from "../../../../components/Button";
import { EditFullNameNavigationProp } from "../../../../type/navigation/stack";
import useAuth from "../../../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";

const EditFullName: React.FC<EditFullNameNavigationProp> = ({ navigation }) => {
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
        name: {
          ...prev.user.name,
          [name]: value,
        },
      },
    }));
  };

  const handleSave = async () => {
    if (
      !verifyField.user.name.firstName ||
      !verifyField.user.name.lastName ||
      !verifyField.user.name.image
    )
      return;
    navigation.goBack();
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
          title="Edit full name"
        />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View>
          <Text style={{ fontSize: 20, marginBottom: 20 }}>
            Please enter name as it appears on your identification documenet
          </Text>
          <TextInput
            label="First Name"
            value={verifyField.user.name.firstName}
            onChangeText={(text) => handleChange("firstName", text)}
            style={styles.input}
          />
          <TextInput
            label="Last Name"
            value={verifyField.user.name.lastName}
            onChangeText={(text) => handleChange("lastName", text)}
            style={styles.input}
          />

          <View>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
              NIN / Passport
            </Text>
            {!verifyField.user.name.image ? (
              <TouchableOpacity onPress={pickImage} style={styles.inputImage}>
                <Icon size={20} source={"image"} />
              </TouchableOpacity>
            ) : (
              <View>
                <Image
                  source={{ uri: verifyField.user.name.image }}
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
        </View>
        <Button
          mode="contained"
          disabled={
            !verifyField.user.name.firstName ||
            !verifyField.user.name.lastName ||
            !verifyField.user.name.image
          }
          style={{ marginBottom: 30 }}
          onPress={handleSave}
        >
          Save
        </Button>
      </ScrollView>
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
    borderRadius: 10,
  },
  edit: {
    position: "absolute",
    right: 20,
    top: 20,
  },
});

export default EditFullName;
