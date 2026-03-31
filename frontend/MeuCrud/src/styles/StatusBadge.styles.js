import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING, RADIUS } from "./globalStyles";

export default StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    alignSelf: "flex-start",
  },

  text: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  inHouse: {
    backgroundColor: COLORS.inHouse,
  },

  paredao: {
    backgroundColor: COLORS.paredao,
  },

  eliminated: {
    backgroundColor: COLORS.eliminated,
  },

  textDark: {
    color: COLORS.background,
  },

  textLight: {
    color: COLORS.textPrimary,
  },
});
