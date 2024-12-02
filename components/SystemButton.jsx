import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export function SystemButton({ isLoading, children, ...props }) {
  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]}>
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
