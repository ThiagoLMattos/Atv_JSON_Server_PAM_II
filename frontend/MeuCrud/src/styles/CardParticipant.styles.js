import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING, RADIUS } from "./globalStyles";

export default StyleSheet.create({
  // ─── container principal ───────────────
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
    overflow: "hidden",
  },

  // paredão — borda amarela
  cardParedao: {
    borderColor: COLORS.paredao,
    borderWidth: 1.5,
  },

  // eliminado — opacidade reduzida
  cardEliminated: {
    opacity: 0.6,
  },

  // ─── conteúdo do card ──────────────────
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    gap: SPACING.md,
  },

  // ─── info do participante ──────────────
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

  // ─── ações ────────────────────────────
  actions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },

  // botão base
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

  // editar — cinza
  btnEdit: {
    backgroundColor: COLORS.surfaceLight,
  },
  btnEditText: {
    color: COLORS.textSecondary,
  },

  // paredão — amarelo
  btnParedao: {
    backgroundColor: COLORS.paredao,
  },
  btnParedaoText: {
    color: COLORS.background,
  },

  // tirar do paredão — outline amarelo
  btnRemoveParedao: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.paredao,
  },
  btnRemoveParedaoText: {
    color: COLORS.paredao,
  },

  // eliminar — vermelho
  btnEliminate: {
    backgroundColor: COLORS.primary,
  },
  btnEliminateText: {
    color: COLORS.textPrimary,
  },

  // deletar — muted, discreto
  btnDelete: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.textMuted,
  },
  btnDeleteText: {
    color: COLORS.textMuted,
  },
});
