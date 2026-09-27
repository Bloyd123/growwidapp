import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { Icon } from '@/components/icons';
import { fonts } from '@/theme';

// Mint "✓ Contact Updated" pill shown at the top of the screen for a moment.
export function Toast({ message, top }: { message: string | null; top: number }) {
  if (!message) return null;
  return (
    <View style={[styles.wrap, { top }]}>
      <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(250)} style={styles.toast}>
        <Icon name="checkCircle" size={20} color="#000000" />
        <Text style={styles.text}>{message}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
    pointerEvents: 'none',
  },
  toast: {
    height: 44.9,
    paddingHorizontal: 16.5,
    borderRadius: 22.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9.4,
    backgroundColor: '#E3F3EA',
  },
  text: {
    fontFamily: fonts.ui,
    fontSize: 15.6,
    color: '#1A1A1A',
    includeFontPadding: false,
  },
});
