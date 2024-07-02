import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Button, Icon, Text, IconButton, useTheme } from "react-native-paper";
import useAuth from "../../../context/AuthContext";

const VerificationStatus: React.FC = () => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    // Simulate document submission process
    setTimeout(() => {
      setLoading(false);
      setSubmissionSuccess(true);
    }, 2000); // Simulate a 2-second delay for loading
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            color={colors.primary}
            size="large"
          />
          <Text style={styles.loadingText}>Submitting documents...</Text>
        </View>
      ) : (
        <View style={styles.successContainer}>
          <IconButton
            size={50}
            iconColor="white"
            icon={"check"}
            style={styles.successAnimation}
          />
          <Text style={styles.successMessage}>
            Document submitted successfully!
          </Text>
          <Text style={styles.statusMessage}>
            Current Verification Status: Pending
          </Text>
          <Button mode="contained" style={styles.button}>
            Continue Aanyway
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
  },
  successContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  successAnimation: {
    width: 150,
    height: 150,
    backgroundColor: "green", // Placeholder for animation effect
    borderRadius: 75,
    marginBottom: 20,
  },
  successMessage: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  statusMessage: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 30,
    textAlign: "center",
    color: "orange",
  },
  button: {
    marginTop: 20,
    width: "50%",
    paddingVertical: 5,
  },
});

export default VerificationStatus;
