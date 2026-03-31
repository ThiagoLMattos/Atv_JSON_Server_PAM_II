import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "./globalStyles";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },

  text: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    letterSpacing: 0.5,
  },
});
