import { StyleSheet, Switch, Text, View } from "react-native";

export function SwitchInput({ leftLabel, rightLabel, value, onValueChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{leftLabel}</Text>
      <Switch value={value} onValueChange={onValueChange} />
      <Text style={styles.label}>{rightLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  label: {
    fontSize: 16,
  },
});
