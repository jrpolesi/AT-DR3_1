import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export function SystemButton({ isLoading, children, ...props }) {
  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]}>
      {isLoading ? <ActivityIndicator /> : <Text>{children}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 0,
  },
});
