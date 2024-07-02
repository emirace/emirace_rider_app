import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ActivityIndicator, Appbar, Text, useTheme } from "react-native-paper";
import useAuth from "../../context/AuthContext";
import { TokenNavigationProp } from "../../type/navigation/stack";
import TokenInput from "../../components/TokenInput";
import Button from "../../components/Button";

const Token: React.FC<TokenNavigationProp> = ({ navigation, route }) => {
  const { sendVerifyOtp, verifyOtp, loading, error } = useAuth();
  const { colors } = useTheme();
  const { phone } = route.params;
  const [token, setToken] = useState("");
  const [resendTimer, setResendTimer] = useState<number>(60);
  const inputRefs: React.RefObject<TextInput>[] = Array.from(
    { length: 5 },
    () => React.createRef()
  );

  useEffect(() => {
    // Focus the first input when the component mounts
    inputRefs[0].current?.focus();
  }, []);

  useEffect(() => {
    // Decrease the countdown timer every second
    const timerInterval = setInterval(() => {
      setResendTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(timerInterval);
  }, []);

  const handleInputChange = (index: number, text: string) => {
    setToken((prevToken) => {
      // Copy the previous token to modify the character at the current index
      const newToken = prevToken.split("");
      newToken[index] = text;

      // Join the modified characters to form the updated token
      const updatedToken = newToken.join("");

      // If the current input is not empty, move focus to the next input
      if (text && index < 4) {
        inputRefs[index + 1].current?.focus();
      }

      // Notify the parent component of the updated token
      // onTokenChange(updatedToken);

      return updatedToken;
    });
  };

  const handleInputKeyPress = (index: number, key: string) => {
    // If the backspace key is pressed and the current input is empty,
    // move focus to the previous input and delete the character there

    if (key === "Backspace" && !token[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
      handleInputChange(index - 1, "");
    }
  };

  const handleResend = async () => {
    const result = await sendVerifyOtp({ phone });
    if (result) {
      setResendTimer(60);
    }
    // Add logic to resend the OTP
  };

  const handleVerify = async () => {
    // const result = await verifyOtp({ token });
    // if (result) {
    //   // onVerify();
    // }
    navigation.push("UserInfo");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Appbar.Header mode="medium">
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content
          titleStyle={{
            fontSize: 30,
            fontWeight: "bold",
          }}
          title="Enter OTP"
        />
      </Appbar.Header>
      <View style={styles.content}>
        <View>
          <Text style={{ marginBottom: 5, fontWeight: "bold" }}>
            We have send you an OTP on{" "}
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{phone}</Text>
          </Text>
          <Text
            onPress={() => navigation.goBack()}
            style={{
              marginBottom: 20,
              fontWeight: "bold",
              color: colors.primary,
            }}
          >
            Change number
          </Text>
          <View style={styles.inputContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <TokenInput
                key={index}
                innerRef={inputRefs[index]}
                value={token[index]}
                onChangeText={(text) => handleInputChange(index, text)}
                onKeyPress={({ nativeEvent }) =>
                  handleInputKeyPress(index, nativeEvent.key)
                }
              />
            ))}
          </View>
          {error.verifyOtp ? (
            <Text style={{ color: "red", marginTop: 8 }}>
              {error.verifyOtp}
            </Text>
          ) : null}
          <View style={styles.count}>
            {loading.sendVerifyOtp ? (
              <ActivityIndicator />
            ) : resendTimer > 0 ? (
              <Text>
                Resend OTP in{" "}
                <Text style={{ fontWeight: "bold", color: colors.primary }}>
                  {`${Math.floor(resendTimer / 60)
                    .toString()
                    .padStart(2, "0")}:${(resendTimer % 60)
                    .toString()
                    .padStart(2, "0")}`}
                </Text>{" "}
                seconds
              </Text>
            ) : (
              <Button
                onPress={handleResend}
                labelStyle={{ fontWeight: "bold" }}
              >
                Resend OTP
              </Button>
            )}
          </View>

          {error.sendVerifyOtp ? (
            <Text style={{ color: "red", marginTop: 8 }}>
              {error.sendVerifyOtp}
            </Text>
          ) : null}
        </View>
        {/* Add a button or any other UI element for verifying the token */}
        <Button
          mode="contained"
          style={styles.verifyButton}
          onPress={handleVerify}
          loading={loading.verifyOtp}
          disabled={token.length < 5 || loading.verifyOtp}
        >
          Verify
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 16,
    // padding: 20,
    flex: 1,
  },
  content: { justifyContent: "space-between", flex: 1, padding: 20 },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    width: 60,
    height: 60,
    borderRadius: 5,
    textAlign: "center",
  },
  count: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 30,
  },
  verifyButton: {
    marginVertical: 20,
  },
});

export default Token;
