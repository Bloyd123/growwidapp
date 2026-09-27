import { Pressable, StyleSheet, Text, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import { Icon } from '@/components/icons';
import { colors, fonts } from '@/theme';

type ChipProps = {
  label: string;
  onPress?: () => void;
  // "outline": bordered pill · "fill": light grey pill
  variant?: 'outline' | 'fill';
  // Leading "+" (coral on filled chips, black on outlined ones).
  plus?: boolean;
  height?: number;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export function Chip({ label, onPress, variant = 'outline', plus, height = 37.8, style, labelStyle }: ChipProps) {
  const filled = variant === 'fill';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        { height, borderRadius: height / 2 },
        filled ? styles.fill : styles.outline,
        pressed && styles.pressed,
        style,
      ]}>
      {plus ? <Icon name="plus" size={20.1} color={filled ? colors.cardIcon : '#000000'} /> : null}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9.4,
    paddingHorizontal: 16.5,
  },
  outline: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    backgroundColor: colors.background,
  },
  fill: {
    backgroundColor: '#F2F2F2',
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    fontFamily: fonts.uiMedium,
    fontSize: 14.4,
    color: '#000000',
    includeFontPadding: false,
  },
});
