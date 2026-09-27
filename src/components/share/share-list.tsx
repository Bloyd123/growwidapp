import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { fonts } from '@/theme';

// Rows are translucent black on the card colour, and light grey on the dark offline screen.
export function shareRowColors(offline: boolean) {
  return offline
    ? { background: '#F4F4F4', ink: '#000000' }
    : { background: 'rgba(0,0,0,0.235)', ink: '#FFFFFF' };
}

export const SHARE_SIDE = 18.3;

// Rounded block of rows separated by thin gaps (the screen colour shows through).
export function ShareGroup({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.group, style]}>{children}</View>;
}

type ShareRowProps = {
  offline: boolean;
  icon: ReactNode;
  label: string;
  onPress: () => void;
  // "Add contact" uses a taller row and larger label.
  large?: boolean;
};

export function ShareRow({ offline, icon, label, onPress, large }: ShareRowProps) {
  const { background, ink } = shareRowColors(offline);
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, large && styles.rowLarge, { backgroundColor: background }, pressed && styles.pressed]}>
      <View style={styles.icon}>{icon}</View>
      <Text style={[styles.label, large && styles.labelLarge, { color: ink }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  group: {
    marginHorizontal: SHARE_SIDE,
    borderRadius: 8.3,
    overflow: 'hidden',
    gap: 1.2,
  },
  row: {
    height: 54.9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLarge: {
    height: 58.4,
  },
  pressed: {
    opacity: 0.8,
  },
  icon: {
    width: 24,
    marginLeft: 15,
    alignItems: 'center',
  },
  label: {
    marginLeft: 20,
    fontFamily: fonts.ui,
    fontSize: 18.3,
    includeFontPadding: false,
  },
  labelLarge: {
    marginLeft: 17.4,
    fontSize: 20.1,
  },
});
