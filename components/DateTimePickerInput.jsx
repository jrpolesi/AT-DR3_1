import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate } from "../utils/formatDate";
import { formatTime } from "../utils/formatTime";

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
    <View style={style}>
      <Button
        title={value ? getFormattedDate(value, props.mode) : label}
        onPress={() => setIsVisible(true)}
      />
      <DateTimePickerModal
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
