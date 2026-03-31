import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING, RADIUS } from "./globalStyles";

export default StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5.0,
  },

  cardParedao: {
    borderColor: COLORS.paredao,
    borderWidth: 1.5,
  },

  cardInHouse: {
    borderColor: COLORS.inHouse,
    borderWidth: 1.5,
  },

  cardEliminated: {
    opacity: 0.6,
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

  btnEdit: {
    backgroundColor: COLORS.surfaceLight,
  },
  btnEditText: {
    color: COLORS.textSecondary,
  },

  btnParedao: {
    backgroundColor: COLORS.paredao,
  },
  btnParedaoText: {
    color: COLORS.background,
  },

  btnRemoveParedao: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.paredao,
  },
  btnRemoveParedaoText: {
    color: COLORS.paredao,
  },

  btnEliminate: {
    backgroundColor: COLORS.primary,
  },
  btnEliminateText: {
    color: COLORS.textPrimary,
  },

  btnDelete: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.textMuted,
  },
  btnDeleteText: {
    color: COLORS.textMuted,
  },
});
