import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors, fonts } from '@/theme';

// Sprout mark on its own; used in the logo and as the app icon glyph.
export function GroowidMark({
  size,
  color = colors.ink,
  style,
}: {
  size: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Path d="M12 22V12" stroke={color} strokeWidth={2.6} strokeLinecap="round" />
      <Path d="M12 14C12 9 8.5 6 3 6c0 5 3.5 8 9 8z" fill={color} />
      <Path d="M12 11c0-5.5 3.5-9 9-9 0 5.5-3.5 9-9 9z" fill={color} />
    </Svg>
  );
}

export function GroowidLogo() {
  return (
    <View style={styles.row} accessibilityRole="header" accessibilityLabel="Groowid">
      <GroowidMark size={22.4} style={styles.mark} />
      <Text style={styles.wordmark}>GROOWID</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4.7,
  },
  mark: {
    marginTop: 1.2,
  },
  wordmark: {
    fontFamily: fonts.logo,
    fontSize: 24,
    lineHeight: 28.3,
    letterSpacing: 0.2,
    color: colors.ink,
    includeFontPadding: false,
  },
});
