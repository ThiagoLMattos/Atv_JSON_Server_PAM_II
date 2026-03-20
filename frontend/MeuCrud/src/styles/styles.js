import { StyleSheet } from "react-native";

export const COLORS = {
    primary: "#E63946",
    primaryDark: "#C1121F",
    primaryLight: "#FF6B6B",
    accent: "#FFD60A",
    accentDark: "#E6C000",
    background: "#0D0D0D",
    surface: "#1A1A1A",
    surfaceLight: "#2A2A2A",
    inHouse: "#2DC653",
    eliminated: "#E63946",
    paredao: "#FFD60A",
    textPrimary: "#FFFFFF",
    textSecondary: "#A0A0A0",
    textMuted: "#555555",
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

export default StyleSheet.create({
    screen: {
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
        color: COLORS.textPrimary,
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