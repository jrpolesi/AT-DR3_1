import React from "react";
import { Animated, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome6";

export function SideAction({ onPress, iconName, drag, style, color }) {
  const trans = drag.interpolate({
    inputRange: [0, 120],
    outputRange: [-0, 20],
  });

  return (
    <RectButton style={[styles.button, style]} onPress={onPress}>
      <Animated.View
        style={[{ transform: [{ translateX: trans }] }, styles.container]}
      >
        <Icon name={iconName} size={24} color={color ?? "#007bff"} />
      </Animated.View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
