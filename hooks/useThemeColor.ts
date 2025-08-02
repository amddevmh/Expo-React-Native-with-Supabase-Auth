/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useTheme } from '../contexts/ThemeContext';

type ColorKeys = 'primary' | 'secondary' | 'background' | 'surface' | 'text' | 'textSecondary' | 'border' | 'tint' | 'icon';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorKeys
) {
  const { theme, colors } = useTheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colors[colorName];
  }
}
