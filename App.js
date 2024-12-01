import { SafeAreaView, StyleSheet } from "react-native";
import { Navigation } from "./components/Navigation.jsx";
import { AuthProvider } from "./contexts/Auth.jsx";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
