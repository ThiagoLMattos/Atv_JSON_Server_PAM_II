import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING, RADIUS } from "./globalStyles";

export default StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    alignSelf: "flex-start",
  },

  text: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  // Na casa
  inHouse: {
    backgroundColor: COLORS.inHouse,
  },

  // No paredão
  paredao: {
    backgroundColor: COLORS.paredao,
  },

  // Eliminado(a)
  eliminated: {
    backgroundColor: COLORS.eliminated,
  },

  // texto escuro para badges claros (paredão amarelo)
  textDark: {
    color: COLORS.background,
  },

  // texto claro para badges escuros (eliminado vermelho)
  textLight: {
    color: COLORS.textPrimary,
  },
});
