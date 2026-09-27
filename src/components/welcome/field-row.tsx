import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { FieldIcon } from '@/components/icons';
import { colors, fonts } from '@/theme';
import type { CardField } from '@/types';

type FieldRowProps = {
  field: CardField;
  iconSize: number;
  gap: number;
  fontSize: number;
  lineHeight: number;
  color: string;
  style?: StyleProp<ViewStyle>;
};

// One contact line on the illustrated card: coral icon dot + label.
export function FieldRow({ field, iconSize, gap, fontSize, lineHeight, color, style }: FieldRowProps) {
  return (
    <View style={[styles.row, { gap }, style]}>
      <View
        style={[styles.dot, { width: iconSize, height: iconSize, borderRadius: iconSize / 2 }]}>
        <FieldIcon name={field.icon} size={iconSize * 0.52} color={colors.onInk} />
      </View>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={[styles.label, { fontSize, lineHeight, color }]}>
        {field.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.sans,
    includeFontPadding: false,
  },
});
