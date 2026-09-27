import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { noteTime, type Note } from '@/state/notes';
import { fonts } from '@/theme';

// White card in the Notes list: title and time, plus "Summarizing" while the note is processed.
export function NoteRow({ note, onPress }: { note: Note; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.texts}>
        <Text style={styles.title} numberOfLines={1}>
          {note.title}
        </Text>
        <Text style={styles.time}>{noteTime(note.createdAt)}</Text>
      </View>
      {note.status === 'summarizing' ? (
        <View style={styles.pill}>
          <Spinner size={16.6} />
          <Text style={styles.pillText}>Summarizing</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

// Open ring that keeps turning.
export function Spinner({ size }: { size: number }) {
  const turn = useSharedValue(0);
  useEffect(() => {
    turn.value = withRepeat(withTiming(360, { duration: 900, easing: Easing.linear }), -1, false);
  }, [turn]);
  const spin = useAnimatedStyle(() => ({ transform: [{ rotate: `${turn.value}deg` }] }));
  return (
    <Animated.View style={[{ width: size, height: size }, spin]}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d="M12 2.5a9.5 9.5 0 1 1-9.1 6.8" fill="none" stroke="#000000" strokeWidth={2.4} strokeLinecap="round" />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 80.2,
    marginHorizontal: 15.9,
    paddingLeft: 17.2,
    paddingRight: 15.9,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  pressed: {
    opacity: 0.8,
  },
  texts: {
    flex: 1,
    gap: 5.8,
  },
  title: {
    fontFamily: fonts.uiMedium,
    fontSize: 15.6,
    color: '#000000',
  },
  time: {
    fontFamily: fonts.ui,
    fontSize: 14.5,
    color: '#909090',
  },
  pill: {
    height: 33,
    paddingLeft: 7,
    paddingRight: 13,
    borderRadius: 16.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4.7,
    backgroundColor: '#E8E8E8',
  },
  pillText: {
    fontFamily: fonts.uiMedium,
    fontSize: 13.7,
    color: '#000000',
    includeFontPadding: false,
  },
});
