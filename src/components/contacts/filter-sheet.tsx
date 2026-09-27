import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { PlainSheet } from '@/components/plain-sheet';
import { fonts } from '@/theme';

export type FilterOption = { key: string; label: string; dot?: string };

type FilterSheetProps = {
  visible: boolean;
  title: string;
  options: FilterOption[];
  selected: string[];
  onApply: (selected: string[]) => void;
  onClose: () => void;
};

// Source / Tags / Cards filter: pick chips, then Reset or Apply.
export function FilterSheet({ visible, title, options, selected, onApply, onClose }: FilterSheetProps) {
  const [picked, setPicked] = useState<string[]>(selected);
  const [wasVisible, setWasVisible] = useState(visible);
  // Start from the applied selection each time the sheet opens.
  if (visible !== wasVisible) {
    setWasVisible(visible);
    if (visible) setPicked(selected);
  }

  const toggle = (key: string) =>
    setPicked((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  return (
    <PlainSheet visible={visible} onClose={onClose} bottomGap={14.9}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chips}>
        {options.map((option) => {
          const on = picked.includes(option.key);
          return (
            <Pressable
              key={option.key}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              onPress={() => toggle(option.key)}
              style={[styles.chip, on && styles.chipOn]}>
              {option.dot ? <View style={[styles.dot, { backgroundColor: option.dot }]} /> : null}
              <Text style={[styles.chipText, on && styles.chipTextOn]}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.buttons}>
        <Button title="Reset" variant="secondary" height={57.3} onPress={() => setPicked([])} style={styles.button} />
        <Button
          title="Apply"
          height={57.3}
          onPress={() => {
            onApply(picked);
            onClose();
          }}
          style={styles.button}
        />
      </View>
    </PlainSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 22,
    textAlign: 'center',
    fontFamily: fonts.uiMedium,
    fontSize: 20,
    lineHeight: 26,
    color: '#000000',
  },
  chips: {
    marginTop: 25.5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 12.9,
    rowGap: 12.4,
  },
  chip: {
    height: 32.5,
    paddingHorizontal: 12.4,
    borderRadius: 16.3,
    borderWidth: 1.2,
    borderColor: '#D5D5D5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#FFFFFF',
  },
  chipOn: {
    borderColor: '#000000',
    backgroundColor: '#000000',
  },
  dot: {
    width: 15.3,
    height: 15.3,
    borderRadius: 7.7,
  },
  chipText: {
    fontFamily: fonts.uiMedium,
    fontSize: 14,
    color: '#000000',
    includeFontPadding: false,
  },
  chipTextOn: {
    color: '#FFFFFF',
  },
  buttons: {
    marginTop: 23.6,
    marginHorizontal: 15.9,
    flexDirection: 'row',
    gap: 13,
  },
  button: {
    flex: 1,
  },
});
