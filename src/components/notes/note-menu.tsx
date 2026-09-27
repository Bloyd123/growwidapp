import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Overlay } from '@/components/overlay';
import { fonts } from '@/theme';

type NoteMenuProps = {
  visible: boolean;
  onEditTitle: () => void;
  onEditSummary: () => void;
  onClose: () => void;
};

// ⋮ on a note: small popup under the button with Edit title / Edit summary.
export function NoteMenu({ visible, onEditTitle, onEditSummary, onClose }: NoteMenuProps) {
  const insets = useSafeAreaInsets();
  return (
    <Overlay visible={visible} onRequestClose={onClose}>
      <Pressable accessibilityLabel="Close menu" style={StyleSheet.absoluteFill} onPress={onClose} />
      <Animated.View entering={FadeIn.duration(120)} style={[styles.menu, { top: insets.top + 56.3 }]}>
        <Item label="Edit title" onPress={onEditTitle} />
        <Item label="Edit summary" onPress={onEditSummary} />
      </Animated.View>
    </Overlay>
  );
}

function Item({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="menuitem" onPress={onPress} style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    right: 13,
    width: 127.5,
    paddingVertical: 6.7,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 3px 12px rgba(0,0,0,0.16)',
  },
  item: {
    height: 49,
    paddingLeft: 21.3,
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: '#F2F2F2',
  },
  text: {
    fontFamily: fonts.uiMedium,
    fontSize: 14,
    color: '#2B2B2B',
    includeFontPadding: false,
  },
});
