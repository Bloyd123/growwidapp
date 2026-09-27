import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/icons';
import { TAB_BAR_HEIGHT } from '@/components/tab-bar';
import { colors, fonts } from '@/theme';

// Space between the Start recording button and the tab bar.
const FOOTER_GAP = 23.5;
// Pill + gap + button, used to pad scrolling content above the footer.
export const RECORD_FOOTER_HEIGHT = 47.2 + 16.6 + 56.7 + FOOTER_GAP;

// "By starting, you confirm everyone in this recording has agreed to be recorded. ↗"
// The Notes list shows it lighter and more spaced out than the intro screens.
export function ConsentPill({ light, style }: { light?: boolean; style?: StyleProp<ViewStyle> }) {
  const text = [styles.pillText, light && styles.pillTextLight];
  return (
    <View style={[styles.pill, light && styles.pillLight, style]}>
      <Text style={text}>By starting, you confirm everyone in this</Text>
      <View style={styles.pillLine}>
        <Text style={text}>recording has agreed to be recorded.</Text>
        <Icon name="openInNew" size={14.6} color="#1A1A1A" />
      </View>
    </View>
  );
}

export function StartRecordingButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Icon name="tabMic" size={20.6} color="#FFFFFF" />
      <Text style={styles.buttonText}>Start recording</Text>
    </Pressable>
  );
}

// Consent pill + Start recording, pinned above the tab bar on the AI Notetaker tab.
export function RecordFooter({ onStart, lightPill }: { onStart: () => void; lightPill?: boolean }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.footer, { bottom: TAB_BAR_HEIGHT + insets.bottom + FOOTER_GAP }]}>
      <ConsentPill light={lightPill} />
      <StartRecordingButton onPress={onStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 16.6,
    pointerEvents: 'box-none',
  },
  pill: {
    height: 47.2,
    paddingLeft: 15.4,
    paddingRight: 14.8,
    borderRadius: 23.6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },
  pillLight: {
    height: 52.6,
    borderRadius: 26.3,
    backgroundColor: '#E8E8E8',
  },
  pillLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2.5,
  },
  pillText: {
    fontFamily: fonts.uiMedium,
    fontSize: 11.8,
    lineHeight: 15.9,
    color: '#1A1A1A',
  },
  pillTextLight: {
    fontFamily: fonts.ui,
    fontSize: 12.1,
    lineHeight: 20,
  },
  button: {
    height: 56.7,
    paddingLeft: 23.7,
    paddingRight: 31.6,
    borderRadius: 28.4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: colors.ink,
    boxShadow: '0 6px 14px rgba(0,0,0,0.2)',
  },
  pressed: {
    opacity: 0.85,
  },
  buttonText: {
    fontFamily: fonts.uiMedium,
    fontSize: 17.7,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});
