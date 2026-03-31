import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING, RADIUS } from "./globalStyles";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceLight,
  },

  title: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.black,
    color: COLORS.textPrimary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  cancelButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceLight,
  },

  cancelText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },

  form: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },

  fieldContainer: {
    marginBottom: SPACING.lg,
  },

  label: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: SPACING.sm,
  },

  input: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },

  inputFocused: {
    borderColor: COLORS.primary,
  },

  inputError: {
    borderColor: COLORS.primary,
  },

  errorText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },

  avatarPreview: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },

  saveButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xxl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: "center",
  },

  saveButtonDisabled: {
    opacity: 0.5,
  },

  saveButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
