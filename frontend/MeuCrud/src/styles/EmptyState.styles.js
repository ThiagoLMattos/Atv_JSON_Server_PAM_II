import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "./globalStyles";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.xxl,
  },

  emoji: {
    fontSize: 48,
    marginBottom: SPACING.lg,
  },

  title: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },

  message: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },

  // erro — título fica vermelho
  errorTitle: {
    color: COLORS.primary,
  },
});
