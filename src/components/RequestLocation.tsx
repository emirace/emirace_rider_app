import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Icon,
  Text,
  useTheme,
} from "react-native-paper";

interface RequestLocationProps {
  handlePermissionRequest: () => void;
  loading: boolean;
}

const RequestLocation = ({
  handlePermissionRequest,
  loading,
}: RequestLocationProps) => {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.modalContainer, { backgroundColor: colors.background }]}
    >
      <View style={styles.modalContent}>
        <Icon source="map-marker" size={60} color={colors.primary} />
        <Text style={styles.modalTitle}>Allow Access to Your Location</Text>
        <Text style={styles.modalText}>
          This app needs to access your location to provide you with relevant
          services.
        </Text>
        <Button
          mode="contained"
          disabled={loading}
          loading={loading}
          onPress={handlePermissionRequest}
        >
          Enable Location
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 20,
    borderRadius: 20,
  },
  modalContent: {
    padding: 5,
    borderRadius: 8,
    // width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default RequestLocation;
