import { View, StyleSheet, TextInput as DefaultInput } from "react-native";
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
import { EditEmailNavigationProp } from "../../../../type/navigation/stack";
import useAuth from "../../../../context/AuthContext";

const EditEmail: React.FC<EditEmailNavigationProp> = ({ navigation }) => {
  const { colors } = useTheme();
  const { verifyField, setVerifyField } = useAuth();
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSendVerify = () => {
    setVerifying(true);
  };

  const handleVerify = () => {
    setIsVerified(true);
  };

  const handleChange = (value: string) => {
    setIsVerified(false);
    setVerifyField((prev: any) => ({
      ...prev,
      user: {
        ...prev.user,
        email: value,
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
          title="Edit your email"
        />
      </Appbar.Header>
      <View
        style={{
          paddingHorizontal: 20,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View>
          <Text style={{ fontSize: 20, marginBottom: 20 }}>
            Changing your email will require you to verify
          </Text>
          <TextInput
            label="Email"
            value={verifyField.user.email}
            onChangeText={handleChange}
            style={styles.input}
          />
          {isVerified ? (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Icon size={20} source={"email"} color="green" />
              <Text style={{ fontSize: 20, marginBottom: 20, color: "green" }}>
                Verified
              </Text>
            </View>
          ) : verifying ? (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: colors.elevation.level5,
                //   padding: 10,
                paddingLeft: 30,
                paddingRight: 8,
                borderRadius: 50,
              }}
            >
              <DefaultInput
                value={code}
                onChangeText={(text) => setCode(text)}
                style={styles.codeInput}
                selectionColor={colors.primary}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton icon={"reload"} onPress={handleSendVerify} />
                <Button
                  mode="contained"
                  contentStyle={{ height: 40 }}
                  labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                  onPress={() => handleVerify()}
                >
                  Verify
                </Button>
              </View>
            </View>
          ) : (
            verifyField.user.email && (
              <Button onPress={handleSendVerify}>Verify email</Button>
            )
          )}
        </View>
        <Button
          disabled={!isVerified}
          mode="contained"
          style={{ marginBottom: 30 }}
          onPress={() => navigation.goBack()}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    marginBottom: 20,
  },
  codeInput: { flex: 1, fontSize: 20 },
});

export default EditEmail;
