import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  Appbar,
  Card,
  List,
  Modal,
  Portal,
  TextInput,
  useTheme,
  Text,
} from "react-native-paper";
import Button from "../../../../components/Button";
import { VehicleNavigationProp } from "../../../../type/navigation/stack";
import useAuth from "../../../../context/AuthContext";

const Vehicle: React.FC<VehicleNavigationProp> = ({ navigation }) => {
  const { verifyField, setVerifyField } = useAuth();
  const { colors } = useTheme();

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleChange = (name: string, value: string) => {
    setVerifyField((prev: any) => ({
      ...prev,
      vehicle: {
        ...prev.vehicle,
        [name]: value,
      },
    }));
  };
  const handleSubmit = () => {
    hideModal();
    navigation.push("VerificationStatus");
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
          title="Vehicle"
        />
      </Appbar.Header>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          Please enter correct information about your vehicle as it will be use
          for inspection
        </Text>

        <List.Item
          title="Vehicle image"
          description="Add images"
          onPress={() => navigation.push("VehicleImage")}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={styles.label}
          descriptionStyle={styles.description}
          style={{ marginBottom: 20 }}
        />
        <TextInput
          label="Brand"
          value={verifyField.vehicle.brand}
          onChangeText={(text) => handleChange("brand", text)}
          style={styles.input}
        />
        <TextInput
          label="Model"
          value={verifyField.vehicle.model}
          onChangeText={(text) => handleChange("model", text)}
          style={styles.input}
        />

        <TextInput
          label="Plate Number"
          value={verifyField.vehicle.number}
          onChangeText={(text) => handleChange("number", text)}
          style={styles.input}
        />

        <TextInput
          label="Year"
          value={verifyField.vehicle.year}
          onChangeText={(text) => handleChange("year", text)}
          style={styles.input}
        />

        <TextInput
          label="Color"
          value={verifyField.vehicle.color}
          onChangeText={(text) => handleChange("color", text)}
          style={styles.input}
        />
      </ScrollView>
      <Button
        mode="contained"
        style={{ marginHorizontal: 20, marginBottom: 30, marginTop: 20 }}
        onPress={showModal}
        disabled={
          !verifyField.vehicle.color ||
          !verifyField.vehicle.brand ||
          !verifyField.vehicle.model ||
          !verifyField.vehicle.number ||
          !verifyField.vehicle.year ||
          !verifyField.vehicle.image.front
        }
      >
        Save
      </Button>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            padding: 20,
          }}
        >
          <Card>
            <Card.Content>
              <Text variant="titleLarge">Submit?</Text>
              <Text variant="bodyMedium">
                Are you sure you want to Submit? after submitting changes can
                not be made
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={hideModal}>Cancel</Button>
              <Button onPress={handleSubmit}>Submit</Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
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
  description: {
    fontWeight: "600",
  },
  label: {
    fontWeight: "600",
    fontSize: 18,
    textTransform: "uppercase",
    paddingVertical: 10,
  },
});

export default Vehicle;
