import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING, RADIUS } from "./globalStyles";

export default StyleSheet.create({
  // ─── container principal ───────────────
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ─── header ───────────────────────────
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLeft: {
    flex: 1,
  },

  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.black,
    color: COLORS.textPrimary,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  subtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },

  // ─── botão paredão no header ───────────
  paredaoButton: {
    backgroundColor: COLORS.paredao,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },

  paredaoButtonText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.black,
    color: COLORS.background,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  // ─── botão adicionar ──────────────────
  addButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACING.sm,
  },

  addButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  // ─── contador de participantes ─────────
  counter: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
    flexDirection: "row",
    gap: SPACING.md,
  },

  counterBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceLight,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },

  counterText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    fontWeight: FONTS.weights.medium,
  },

  counterDot: {
    width: 6,
    height: 6,
    borderRadius: RADIUS.full,
  },

  // ─── lista ────────────────────────────
  list: {
    paddingTop: SPACING.xs,
  },

  listContent: {
    paddingBottom: SPACING.xxl,
  },
});
