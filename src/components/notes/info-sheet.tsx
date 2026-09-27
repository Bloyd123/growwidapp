import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HeroCopy, RecordingStage } from '@/components/notes/notes-mocks';
import { ConsentPill } from '@/components/notes/record-footer';
import { PlainSheet } from '@/components/plain-sheet';
import { colors, fonts } from '@/theme';

// Notes ⓘ: what AI Notetaker does, over the recording illustration.
export function InfoSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <PlainSheet visible={visible} onClose={onClose} bottomGap={17} style={[styles.sheet, { marginTop: insets.top }]}>
      <RecordingStage height={484} />
      <View style={styles.handle} />
      <HeroCopy style={styles.copy} />
      <ConsentPill style={styles.pill} />
      <Pressable accessibilityRole="button" onPress={onClose} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>Got it</Text>
      </Pressable>
    </PlainSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    overflow: 'hidden',
    borderTopLeftRadius: 23.6,
    borderTopRightRadius: 23.6,
  },
  handle: {
    position: 'absolute',
    top: 22.8,
    alignSelf: 'center',
    width: 31.5,
    height: 3.2,
    borderRadius: 1.6,
    backgroundColor: '#E2E2E2',
  },
  copy: {
    marginTop: 64.4,
  },
  pill: {
    alignSelf: 'center',
    marginTop: 13.3,
  },
  button: {
    height: 55.4,
    marginTop: 'auto',
    marginHorizontal: 16.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ink,
  },
  pressed: {
    opacity: 0.85,
  },
  buttonText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 17.8,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});
