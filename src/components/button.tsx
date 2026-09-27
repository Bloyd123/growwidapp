import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { colors, typography } from '@/theme';

type ButtonProps = {
  title: string;
  // primary: filled ink · secondary: outlined · text: label (and icon) only
  variant?: 'primary' | 'secondary' | 'text';
  onPress?: () => void;
  disabled?: boolean;
  height?: number;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export function Button({
  title,
  variant = 'primary',
  onPress,
  disabled = false,
  height = 56.6,
  icon,
  style,
  labelStyle,
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { height },
        styles[variant],
        disabled && variant === 'primary' && styles.primaryDisabled,
        pressed && styles.pressed,
        style,
      ]}>
      <View style={styles.content}>
        {icon}
        <Text
          style={[
            styles.label,
            variant === 'primary' ? styles.primaryLabel : styles.secondaryLabel,
            disabled && variant === 'primary' && styles.disabledLabel,
            labelStyle,
          ]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 9.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11.8,
  },
  primary: {
    backgroundColor: colors.inkDeep,
  },
  primaryDisabled: {
    backgroundColor: colors.disabledBg,
  },
  secondary: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.lineCool,
  },
  text: {},
  pressed: {
    opacity: 0.85,
  },
  label: {
    ...typography.cta,
    includeFontPadding: false,
  },
  primaryLabel: {
    color: colors.onInk,
  },
  secondaryLabel: {
    color: colors.muted,
  },
  disabledLabel: {
    color: colors.disabledText,
  },
});
