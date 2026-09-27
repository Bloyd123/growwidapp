import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts } from '@/theme';

// White block of the Edit card screen with its heading; full-bleed children add their own padding.
export function Section({
  title,
  children,
  style,
}: {
  title: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.section, style]}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

// Grey band between sections.
export function SectionGap({ height = 11.8 }: { height?: number }) {
  return <View style={[styles.gap, { height }]} />;
}

const styles = StyleSheet.create({
  section: {
    paddingTop: 19.5,
    paddingBottom: 18.3,
    backgroundColor: colors.background,
  },
  title: {
    marginLeft: 16.5,
    fontFamily: fonts.uiSemiBold,
    fontSize: 20.1,
    lineHeight: 26,
    color: '#000000',
  },
  gap: {
    backgroundColor: colors.canvas,
  },
});
