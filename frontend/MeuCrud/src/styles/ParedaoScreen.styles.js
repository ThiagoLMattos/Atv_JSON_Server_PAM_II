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
    gap: SPACING.md,
  },

  backButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceLight,
  },

  backText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },

  headerCenter: {
    flex: 1,
  },

  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.black,
    color: COLORS.paredao,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  subtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },

  banner: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.paredao,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },

  bannerEmoji: {
    fontSize: 28,
  },

  bannerContent: {
    flex: 1,
  },

  bannerTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.black,
    color: COLORS.background,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  bannerSubtitle: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.background,
    marginTop: SPACING.xs,
    opacity: 0.8,
  },

  list: {
    paddingTop: SPACING.xs,
  },

  listContent: {
    paddingBottom: SPACING.xxl,
  },
});
