import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING, RADIUS } from "./globalStyles";

export default StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.paredao,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5.0,
  },

  topStripe: {
    backgroundColor: COLORS.paredao,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  stripeText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.black,
    color: COLORS.background,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },

  votesStripe: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    color: COLORS.background,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    gap: SPACING.md,
  },

  info: {
    flex: 1,
    gap: SPACING.xs,
  },

  name: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
  },

  details: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },

  // --- Progress Bar Styles ---
  progressContainer: {
    marginTop: SPACING.sm,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textSecondary,
    textTransform: "uppercase",
  },
  progressValue: {
    fontSize: 10,
    fontWeight: FONTS.weights.black,
    color: COLORS.paredao,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: RADIUS.full,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.paredao,
  },
  // ---------------------------

  votesContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceLight,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    minWidth: 64,
  },

  votesNumber: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.black,
    color: COLORS.paredao,
  },

  votesLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  actions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },

  actionButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    justifyContent: "center",
  },

  actionText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  btnVote: {
    backgroundColor: COLORS.paredao,
  },
  btnVoteText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.sm,
  },

  btnEliminate: {
    backgroundColor: COLORS.primary,
  },
  btnEliminateText: {
    color: COLORS.textPrimary,
  },

  btnSave: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.paredao,
  },
  btnSaveText: {
    color: COLORS.paredao,
  },
});
