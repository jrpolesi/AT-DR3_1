import { StyleSheet, Text, View } from "react-native";

export function FormField({ label, error, children, style, isInline }) {
  const fieldContainerStyle = [
    styles.fieldContainer,
    isInline ? styles.inlineField : undefined,
  ];

  return (
    <View style={[styles.container, style]}>
      <View style={fieldContainerStyle}>
        <Text>{label}</Text>
        {children}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    gap: 4,
  },
  fieldContainer: {
    gap: 8,
  },
  inlineField: {
    flexDirection: "row",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
});
