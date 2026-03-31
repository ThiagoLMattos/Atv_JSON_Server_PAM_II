import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING, RADIUS } from "./globalStyles";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },

  // container ativo — borda vermelha quando em foco
  containerFocused: {
    borderColor: COLORS.primary,
  },

  icon: {
    fontSize: 16,
    marginRight: SPACING.sm,
    color: COLORS.textMuted,
  },

  input: {
    flex: 1,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    paddingVertical: 0, // android fix
  },

  clearButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.xs,
  },

  clearText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textMuted,
  },
});
