/**
 * Modern styling system with theme-aware utilities
 * Makes it super easy to change theme colors and maintain consistency
 */

import { StyleSheet } from 'react-native';

export interface ThemeColors {
  // Primary gradient colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Secondary colors
  secondary: string;
  accent: string;
  
  // Semantic colors
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Text hierarchy
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  
  // Backgrounds
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceElevated: string;
  
  // Borders and dividers
  border: string;
  borderLight: string;
  
  // Overlays
  overlay: string;
  backdrop: string;
  
  // Gradients
  gradientPrimary: readonly [string, string, ...string[]];
  gradientSecondary: readonly [string, string, ...string[]];
  gradientSurface: readonly [string, string, ...string[]];
  
  // Shadow colors
  shadowColor: string;
  shadowLight: string;
  shadowMedium: string;
  shadowStrong: string;
  
  // Legacy compatibility
  tint: string;
  icon: string;
}

// Design tokens for consistent spacing and sizing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  pill: 50,
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    huge: 32,
    massive: 36,
  },
  weights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

export const shadows = {
  small: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  xl: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
};

// Theme-aware style creators
export const createThemedStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    // Container styles
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    
    // Card styles
    card: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.lg,
      padding: spacing.xl,
      ...shadows.medium,
      shadowColor: colors.shadowColor,
    },
    cardElevated: {
      backgroundColor: colors.surfaceElevated,
      borderRadius: borderRadius.xl,
      padding: spacing.xxl,
      ...shadows.large,
      shadowColor: colors.shadowColor,
    },
    
    // Button styles
    primaryButton: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
      ...shadows.small,
      shadowColor: colors.shadowColor,
    },
    secondaryButton: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    
    // Text styles
    heading1: {
      fontSize: typography.sizes.massive,
      fontWeight: typography.weights.extrabold,
      color: colors.text,
      lineHeight: typography.sizes.massive * typography.lineHeights.tight,
    },
    heading2: {
      fontSize: typography.sizes.xxxl,
      fontWeight: typography.weights.bold,
      color: colors.text,
      lineHeight: typography.sizes.xxxl * typography.lineHeights.tight,
    },
    heading3: {
      fontSize: typography.sizes.xxl,
      fontWeight: typography.weights.bold,
      color: colors.text,
      lineHeight: typography.sizes.xxl * typography.lineHeights.normal,
    },
    body: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.normal,
      color: colors.text,
      lineHeight: typography.sizes.base * typography.lineHeights.normal,
    },
    bodySecondary: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.normal,
      color: colors.textSecondary,
      lineHeight: typography.sizes.base * typography.lineHeights.normal,
    },
    caption: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.medium,
      color: colors.textTertiary,
      lineHeight: typography.sizes.sm * typography.lineHeights.normal,
    },
    
    // Input styles
    input: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      fontSize: typography.sizes.base,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
    },
    inputFocused: {
      borderColor: colors.primary,
      ...shadows.small,
      shadowColor: colors.primary,
    },
    
    // Layout utilities
    row: {
      flexDirection: 'row',
    },
    column: {
      flexDirection: 'column',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    spaceAround: {
      justifyContent: 'space-around',
    },
    
    // Spacing utilities
    mb_xs: { marginBottom: spacing.xs },
    mb_sm: { marginBottom: spacing.sm },
    mb_md: { marginBottom: spacing.md },
    mb_lg: { marginBottom: spacing.lg },
    mb_xl: { marginBottom: spacing.xl },
    mb_xxl: { marginBottom: spacing.xxl },
    
    mt_xs: { marginTop: spacing.xs },
    mt_sm: { marginTop: spacing.sm },
    mt_md: { marginTop: spacing.md },
    mt_lg: { marginTop: spacing.lg },
    mt_xl: { marginTop: spacing.xl },
    mt_xxl: { marginTop: spacing.xxl },
    
    p_xs: { padding: spacing.xs },
    p_sm: { padding: spacing.sm },
    p_md: { padding: spacing.md },
    p_lg: { padding: spacing.lg },
    p_xl: { padding: spacing.xl },
    p_xxl: { padding: spacing.xxl },
    
    px_xs: { paddingHorizontal: spacing.xs },
    px_sm: { paddingHorizontal: spacing.sm },
    px_md: { paddingHorizontal: spacing.md },
    px_lg: { paddingHorizontal: spacing.lg },
    px_xl: { paddingHorizontal: spacing.xl },
    px_xxl: { paddingHorizontal: spacing.xxl },
    
    py_xs: { paddingVertical: spacing.xs },
    py_sm: { paddingVertical: spacing.sm },
    py_md: { paddingVertical: spacing.md },
    py_lg: { paddingVertical: spacing.lg },
    py_xl: { paddingVertical: spacing.xl },
    py_xxl: { paddingVertical: spacing.xxl },
  });
};

// Utility functions for theme-aware components
export const getButtonStyle = (colors: ThemeColors, variant: 'primary' | 'secondary' | 'ghost' = 'primary') => {
  const baseStyle = {
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  switch (variant) {
    case 'primary':
      return {
        ...baseStyle,
        backgroundColor: colors.primary,
        ...shadows.small,
        shadowColor: colors.shadowColor,
      };
    case 'secondary':
      return {
        ...baseStyle,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      };
    case 'ghost':
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
      };
    default:
      return baseStyle;
  }
};

export const getCardStyle = (colors: ThemeColors, elevation: 'low' | 'medium' | 'high' = 'medium') => {
  const baseStyle = {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    shadowColor: colors.shadowColor,
  };

  switch (elevation) {
    case 'low':
      return { ...baseStyle, ...shadows.small };
    case 'medium':
      return { ...baseStyle, ...shadows.medium };
    case 'high':
      return { ...baseStyle, ...shadows.large };
    default:
      return baseStyle;
  }
};