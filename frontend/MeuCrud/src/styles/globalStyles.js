import { StyleSheet } from "react-native";

// ─────────────────────────────────────────
//  BBB 26 — Global Design Tokens
//  Tema: laranja, amarelo, branco — energia de programa de TV
// ─────────────────────────────────────────

export const COLORS = {
  // Primárias — laranja BBB
  primary: "#FF6B35", // laranja vibrante
  primaryDark: "#E55A26", // laranja escuro
  primaryLight: "#FF8C5A", // laranja claro

  // Secundárias — amarelo spotlight
  accent: "#FFD60A", // amarelo spotlight
  accentDark: "#E6C000", // amarelo escuro

  // Neutros — fundo claro com superfícies brancas/cinzas
  background: "#FFFFFF", // branco puro
  surface: "#F7F7F7", // cinza muito claro para cards
  surfaceLight: "#EDEDED", // bordas e divisores
  surfaceMid: "#DDDDDD", // intermediário

  // Status do jogo
  inHouse: "#4CAF50", // verde — Na casa
  eliminated: "#FF3B30", // vermelho — Eliminado(a)
  paredao: "#FFD60A", // amarelo — No paredão

  // Texto
  textPrimary: "#111111", // preto suave
  textSecondary: "#333333", // cinza escuro
  textMuted: "#666666", // cinza médio

  // Extras
  white: "#FFFFFF",
  orange: "#FF6B35",
  yellow: "#FFD60A",
};

export const FONTS = {
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 26,
    title: 32,
  },
  weights: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    black: "900",
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  sm: 6,
  md: 12,
  lg: 20,
  full: 999,
};

// ─────────────────────────────────────────
//  Estilos globais reutilizáveis
// ─────────────────────────────────────────

export default StyleSheet.create({
  screen: {
    marginTop: 34,
    flex: 1,
    backgroundColor: COLORS.background,
  },

  screenHeader: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.background,
  },

  screenTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.black,
    color: COLORS.textPrimary,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  screenSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.surfaceLight,
    marginVertical: SPACING.md,
  },

  emptyText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textMuted,
    textAlign: "center",
    marginTop: SPACING.xxl,
  },

  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    alignSelf: "flex-start",
  },

  badgeText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: COLORS.background,
  },

  buttonPrimary: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.md,
    alignItems: "center",
  },

  buttonPrimaryText: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.white,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  buttonSecondary: {
    backgroundColor: "transparent",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
    alignItems: "center",
  },

  buttonSecondaryText: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    color: COLORS.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
});
