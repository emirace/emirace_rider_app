import "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Main from "./src/main";
import { KeyboardAvoidingView } from "react-native";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
