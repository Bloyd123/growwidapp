import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PlainSheet } from '@/components/plain-sheet';
import { fonts } from '@/theme';

export type SheetAction = { key: string; icon: ReactNode; label: string; onPress: () => void };

type ActionSheetProps = {
  visible: boolean;
  actions: SheetAction[];
  onClose: () => void;
  // Row height and top padding differ slightly between the share and More sheets.
  rowHeight?: number;
  paddingTop?: number;
  dim?: number;
};

// List of icon + label actions in a bottom sheet (Share contact, More…).
export function ActionSheet({ visible, actions, onClose, rowHeight = 55.5, paddingTop = 12, dim }: ActionSheetProps) {
  return (
    <PlainSheet visible={visible} onClose={onClose} dim={dim} bottomGap={paddingTop} style={styles.sheet}>
      <View style={{ paddingTop }}>
        {actions.map((action) => (
          <Pressable
            key={action.key}
            accessibilityRole="button"
            onPress={() => {
              onClose();
              action.onPress();
            }}
            style={({ pressed }) => [styles.row, { height: rowHeight }, pressed && styles.pressed]}>
            <View style={styles.icon}>{action.icon}</View>
            <Text style={styles.label}>{action.label}</Text>
          </Pressable>
        ))}
      </View>
    </PlainSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    borderTopLeftRadius: 18.9,
    borderTopRightRadius: 18.9,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: {
    backgroundColor: '#F4F4F4',
  },
  icon: {
    width: 26,
    marginLeft: 22.7,
    alignItems: 'center',
  },
  label: {
    marginLeft: 15.6,
    fontFamily: fonts.ui,
    fontSize: 15.7,
    color: '#000000',
    includeFontPadding: false,
  },
});
