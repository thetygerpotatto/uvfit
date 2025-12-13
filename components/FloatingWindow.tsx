import { PasionColor } from "@/scripts/PasionColors";
import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

type FloatingWindowProps = {
  children: React.ReactNode;
  visible?: boolean;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  style?: ViewStyle;
};

export default function FloatingWindow({
  children,
  visible = true,
  position = "top-right",
  style,
}: FloatingWindowProps) {
  if (!visible) return null;

  return (
    <View style={[styles.base, styles[position], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    position: "absolute",
    zIndex: 999,
    elevation: 10,
    backgroundColor: PasionColor.NegroPasion,
    borderRadius: 20,
    borderColor: PasionColor.BlancoPasion,
    borderWidth: 1,
    padding: 12,
  },

  "top-right": { top: 20, right: 20 },
  "top-left": { top: 20, left: 20 },
  "bottom-right": { bottom: 20, right: 20 },
  "bottom-left": { bottom: 20, left: 20 },
});
