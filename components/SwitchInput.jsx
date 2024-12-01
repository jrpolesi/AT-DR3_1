import { StyleSheet, Switch, Text, View } from "react-native";

export function SwitchInput({ leftLabel, rightLabel, value, onValueChange }) {
  return (
    <View style={styles.container}>
      <Text>{leftLabel}</Text>
      <Switch value={value} onValueChange={onValueChange} />
      <Text>{rightLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
