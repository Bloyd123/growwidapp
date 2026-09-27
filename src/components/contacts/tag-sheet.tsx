import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View, type TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/icons';
import { PlainSheet } from '@/components/plain-sheet';
import { fonts } from '@/theme';

const webNoFocusRing = Platform.OS === 'web' ? ({ outlineStyle: 'none' } as unknown as TextStyle) : null;

type TagSheetProps = {
  visible: boolean;
  // All tags the user has, and the ones on this contact.
  allTags: string[];
  selected: string[];
  onSave: (allTags: string[], selected: string[]) => void;
  onClose: () => void;
};

// "Add Tag": type a new tag or tap existing ones (✓ on this contact, ⊕ not), × deletes a tag.
export function TagSheet({ visible, allTags, selected, onSave, onClose }: TagSheetProps) {
  const insets = useSafeAreaInsets();
  const [tags, setTags] = useState(allTags);
  const [picked, setPicked] = useState(selected);
  const [draft, setDraft] = useState('');
  const input = useRef<TextInput>(null);
  const [wasVisible, setWasVisible] = useState(visible);
  if (visible !== wasVisible) {
    setWasVisible(visible);
    if (visible) {
      setTags(allTags);
      setPicked(selected);
      setDraft('');
    }
  }

  // Focus once the sheet has slid in (autoFocus fires before the overlay is on screen).
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => input.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, [visible]);

  const addDraft = () => {
    const tag = draft.trim();
    if (!tag) return { tags, picked };
    const nextTags = tags.includes(tag) ? tags : [...tags, tag];
    const nextPicked = picked.includes(tag) ? picked : [...picked, tag];
    setTags(nextTags);
    setPicked(nextPicked);
    setDraft('');
    return { tags: nextTags, picked: nextPicked };
  };
  const save = () => {
    const next = addDraft();
    onSave(next.tags, next.picked);
  };

  return (
    <PlainSheet visible={visible} onClose={onClose} style={[styles.sheet, { marginTop: insets.top + 59.1 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Tag</Text>
        <Pressable accessibilityRole="button" hitSlop={10} onPress={save} style={styles.save}>
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      </View>
      <TextInput
        ref={input}
        value={draft}
        onChangeText={setDraft}
        onSubmitEditing={addDraft}
        autoCapitalize="none"
        returnKeyType="done"
        cursorColor="#000000"
        selectionColor="#000000"
        style={[styles.input, webNoFocusRing]}
      />
      <View style={styles.chips}>
        {tags.map((tag) => {
          const on = picked.includes(tag);
          return (
            <View key={tag} style={[styles.chip, on ? styles.chipOn : styles.chipOff]}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: on }}
                onPress={() => setPicked((prev) => (on ? prev.filter((t) => t !== tag) : [...prev, tag]))}
                style={styles.chipToggle}>
                <Icon name={on ? 'checkCircle' : 'plusCircle'} size={17.7} color="#000000" />
                <Text style={styles.chipText}>{tag}</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Delete ${tag}`}
                hitSlop={8}
                onPress={() => {
                  setTags((prev) => prev.filter((t) => t !== tag));
                  setPicked((prev) => prev.filter((t) => t !== tag));
                }}>
                <Icon name="close" size={17.7} color="#000000" />
              </Pressable>
            </View>
          );
        })}
      </View>
    </PlainSheet>
  );
}

const styles = StyleSheet.create({
  // Square top edge, as in the reference.
  sheet: {
    flex: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  header: {
    height: 62.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 20,
    color: '#000000',
    includeFontPadding: false,
  },
  save: {
    position: 'absolute',
    right: 36,
    top: 20,
  },
  saveText: {
    fontFamily: fonts.uiMedium,
    fontSize: 17.6,
    color: '#3A3A3A',
    includeFontPadding: false,
  },
  input: {
    height: 54.9,
    marginTop: 2.5,
    marginHorizontal: 15.9,
    paddingHorizontal: 16,
    borderRadius: 9.4,
    borderWidth: 2,
    borderColor: '#000000',
    fontFamily: fonts.ui,
    fontSize: 17.7,
    color: '#000000',
  },
  chips: {
    marginTop: 24.8,
    marginHorizontal: 16.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 13.6,
  },
  chip: {
    height: 31.9,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5.9,
  },
  chipToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5.9,
  },
  chipOn: {
    borderWidth: 1.2,
    borderColor: '#CFCFCF',
    backgroundColor: '#FFFFFF',
  },
  chipOff: {
    backgroundColor: '#E9E9E9',
  },
  chipText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 13.6,
    color: '#000000',
    includeFontPadding: false,
  },
});
