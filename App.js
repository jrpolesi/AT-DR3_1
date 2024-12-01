import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Navigation } from "./components/Navigation.jsx";
import { AuthProvider } from "./contexts/Auth.jsx";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["right", "left"]}>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
