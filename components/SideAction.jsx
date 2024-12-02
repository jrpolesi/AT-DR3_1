import React from "react";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import Reanimated, { useAnimatedStyle } from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome6";

export function SideAction({ onPress, iconName, drag, style, offsetX, color }) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + offsetX }],
    };
  });

  return (
    <Reanimated.View style={[styleAnimation, styles.container]}>
      <Pressable style={[styles.button, style]} onPress={onPress}>
        <Icon name={iconName} size={24} color={color ?? "#007bff"} />
      </Pressable>
    </Reanimated.View>
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
