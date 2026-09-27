import { Pressable, StyleSheet, Text } from 'react-native';

import { Icon, type IconName } from '@/components/icons';
import { fonts } from '@/theme';

// Grey rounded action row inside a bottom sheet ("Select from photo library", "Take a photo").
export function SheetOption({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <Icon name={icon} size={24.8} color="#000000" />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 55.5,
    marginHorizontal: 17.9,
    borderRadius: 14.2,
    paddingLeft: 15.3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18.6,
    backgroundColor: '#F4F4F4',
  },
  pressed: {
    opacity: 0.75,
  },
  label: {
    fontFamily: fonts.uiMedium,
    fontSize: 18.3,
    color: '#000000',
    includeFontPadding: false,
  },
});
