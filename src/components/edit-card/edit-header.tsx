import { useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View, type TextStyle } from 'react-native';

import { Icon } from '@/components/icons';
import { fonts } from '@/theme';

export const EDIT_HEADER_HEIGHT = 66.1;
const webNoFocusRing = Platform.OS === 'web' ? ({ outlineStyle: 'none' } as unknown as TextStyle) : null;

type CardHeaderProps = {
  name: string;
  onRename: (name: string) => void;
  onCancel: () => void;
  onSave: () => void;
};

// "Cancel · Groowid ✏ · Save" bar of the Edit card screen; the card name is editable in place.
export function EditCardHeader({ name, onRename, onCancel, onSave }: CardHeaderProps) {
  const input = useRef<TextInput>(null);
  // TextInput doesn't size to its text, so measure the name with a hidden Text.
  const [nameWidth, setNameWidth] = useState(0);
  return (
    <View style={styles.header}>
      <Pressable accessibilityRole="button" hitSlop={10} onPress={onCancel} style={styles.left}>
        <Text style={styles.side}>Cancel</Text>
      </Pressable>
      <Text style={[styles.name, styles.measure]} onLayout={(e) => setNameWidth(e.nativeEvent.layout.width)}>
        {name || ' '}
      </Text>
      <View style={styles.center}>
        <TextInput
          ref={input}
          value={name}
          onChangeText={onRename}
          style={[styles.name, { width: nameWidth + 4.7 }, webNoFocusRing]}
          selectionColor="#000000"
        />
        <Pressable accessibilityLabel="Rename card" hitSlop={10} onPress={() => input.current?.focus()}>
          <Icon name="pencil" size={22.4} color="#111111" />
        </Pressable>
      </View>
      <Pressable accessibilityRole="button" hitSlop={10} onPress={onSave} style={styles.right}>
        <Text style={styles.side}>Save</Text>
      </Pressable>
    </View>
  );
}

type AddHeaderProps = {
  title: string;
  canSave: boolean;
  onBack: () => void;
  onSave: () => void;
};

// "‹ Add Phone · Save" bar of the add-field screen; Save is grey until there is a value.
export function AddFieldHeader({ title, canSave, onBack, onSave }: AddHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable accessibilityRole="button" accessibilityLabel="Back" hitSlop={12} onPress={onBack} style={styles.back}>
        <Icon name="chevronLeft" size={28.3} color="#000000" />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !canSave }}
        disabled={!canSave}
        hitSlop={10}
        onPress={onSave}
        style={styles.right}>
        <Text style={[styles.side, !canSave && styles.disabled]}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: EDIT_HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    position: 'absolute',
    left: 16.5,
  },
  right: {
    position: 'absolute',
    right: 16.5,
  },
  back: {
    position: 'absolute',
    left: 13.6,
  },
  side: {
    fontFamily: fonts.uiMedium,
    fontSize: 15.8,
    color: '#000000',
  },
  disabled: {
    color: '#C4C4C4',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9.4,
  },
  measure: {
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
  },
  name: {
    minWidth: 35.4,
    padding: 0,
    fontFamily: fonts.uiMedium,
    fontSize: 21,
    color: '#666666',
    textAlign: 'center',
    includeFontPadding: false,
  },
  title: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 20.5,
    color: '#000000',
  },
});
