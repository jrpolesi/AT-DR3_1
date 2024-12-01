import { Text, View } from "react-native";

export function FormField({ label, error, children, style }) {
  return (
    <View style={[style]}>
      <View>
        <Text>{label}</Text>
        {children}
      </View>

      {error && <Text>{error}</Text>}
    </View>
  );
}
