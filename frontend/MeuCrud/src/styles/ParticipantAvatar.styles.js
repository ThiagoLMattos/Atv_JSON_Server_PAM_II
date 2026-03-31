import { StyleSheet } from "react-native";
import { COLORS, RADIUS } from "./globalStyles";

export default StyleSheet.create({
  avatar: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceLight,
  },

  avatarParedao: {
    borderWidth: 2,
    borderColor: COLORS.paredao,
  },

  avatarEliminated: {
    borderWidth: 2,
    borderColor: COLORS.eliminated,
    opacity: 0.6,
  },
});
