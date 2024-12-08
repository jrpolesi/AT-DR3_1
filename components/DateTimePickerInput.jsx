import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome6";
import { formatDate } from "../utils/formatDate.js";
import { formatTime } from "../utils/formatTime.js";

export function DateTimePickerInput({
  onConfirm,
  style,
  label,
  buttonStyle,
  value,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={() => setIsVisible(true)}
      >
        <Icon name="calendar" size={24} style={[styles.icon]} />
        <Text style={styles.text}>
          {value ? getFormattedDate(value, props.mode) : label}
        </Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isVisible}
        onConfirm={(...args) => {
          setIsVisible(false);
          onConfirm(...args);
        }}
        modalPropsIOS={{
          supportedOrientations: ["portrait", "landscape"],
        }}
        onCancel={() => setIsVisible(false)}
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
        supportedOrientations={["portrait", "landscape"]}
        {...props}
      />
    </View>
  );
}

function getFormattedDate(date, mode) {
  if (mode === "date") {
    return formatDate(date);
  }

  return formatTime(date);
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  },
  icon: {
    marginRight: 10,
    color: "#007BFF",
  },
  text: {
    fontSize: 16,
    color: "#007BFF",
  },
});
