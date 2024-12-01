import { useWindowDimensions } from "react-native";

export function useLayoutOrientation() {
  const { height, width } = useWindowDimensions();

  const orientation = width > height ? "landscape" : "portrait";

  return {
    isPortrait: orientation === "portrait",
    isLandscape: orientation === "landscape",
    orientation,
  };
}
