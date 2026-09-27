import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View, type TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PlainSheet } from '@/components/plain-sheet';
import { fonts } from '@/theme';

const MAX_LENGTH = 1000;
const webNoFocusRing = Platform.OS === 'web' ? ({ outlineStyle: 'none' } as unknown as TextStyle) : null;

type NoteSheetProps = {
  visible: boolean;
  onSave: (text: string) => void;
  onClose: () => void;
  // Reused for AI note edits ("Edit title", "Edit summary").
  heading?: string;
  initialText?: string;
  label?: string;
  hint?: string;
};

// "Add note": Cancel / Add note / Save over a large outlined text box with a 0/1000 counter.
export function NoteSheet({
  visible,
  onSave,
  onClose,
  heading = 'Add note',
  initialText = '',
  label = 'Write a note...',
  hint = 'Notes are not visible to contacts',
}: NoteSheetProps) {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const input = useRef<TextInput>(null);
  const [wasVisible, setWasVisible] = useState(visible);
  if (visible !== wasVisible) {
    setWasVisible(visible);
    if (visible) setText(initialText);
  }
  const canSave = text.trim().length > 0;

  // Focus once the sheet has slid in (autoFocus fires before the overlay is on screen).
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => input.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <PlainSheet visible={visible} onClose={onClose} style={[styles.sheet, { marginTop: insets.top + 47.2 }]}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" hitSlop={10} onPress={onClose} style={styles.cancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
        <Text style={styles.title}>{heading}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !canSave }}
          disabled={!canSave}
          hitSlop={10}
          onPress={() => onSave(text.trim())}
          style={styles.save}>
          <Text style={[styles.saveText, canSave && styles.saveTextOn]}>Save</Text>
        </Pressable>
      </View>

      <View style={styles.box}>
        <TextInput
          ref={input}
          value={text}
          onChangeText={setText}
          multiline
          maxLength={MAX_LENGTH}
          cursorColor="#5B3F8C"
          selectionColor="#5B3F8C"
          style={[styles.input, webNoFocusRing]}
        />
        <View style={styles.labelWrap}>
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.hint}>{hint}</Text>
        <Text style={styles.count}>
          {text.length}/{MAX_LENGTH}
        </Text>
      </View>
    </PlainSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    borderTopLeftRadius: 18.9,
    borderTopRightRadius: 18.9,
  },
  header: {
    height: 67.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancel: {
    position: 'absolute',
    left: 24.8,
    top: 23.6,
  },
  cancelText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15.4,
    color: '#000000',
    includeFontPadding: false,
  },
  title: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15.8,
    color: '#9A9A9A',
    includeFontPadding: false,
  },
  save: {
    position: 'absolute',
    right: 23.6,
    top: 23.6,
  },
  saveText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15.8,
    color: '#BDBDBD',
    includeFontPadding: false,
  },
  saveTextOn: {
    color: '#000000',
  },
  box: {
    height: 417.3,
    marginTop: 9.6,
    marginHorizontal: 15.9,
    borderRadius: 9.4,
    borderWidth: 2,
    borderColor: '#000000',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    fontFamily: fonts.ui,
    fontSize: 16.5,
    lineHeight: 23,
    color: '#000000',
    textAlignVertical: 'top',
  },
  labelWrap: {
    position: 'absolute',
    top: -8,
    left: 12,
    paddingHorizontal: 4.7,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontFamily: fonts.ui,
    fontSize: 12.4,
    color: '#6B6B6B',
  },
  footer: {
    marginTop: 8.2,
    marginHorizontal: 16.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hint: {
    fontFamily: fonts.ui,
    fontSize: 13.8,
    color: '#8A8A8A',
  },
  count: {
    fontFamily: fonts.uiMedium,
    fontSize: 13.9,
    color: '#000000',
  },
});
