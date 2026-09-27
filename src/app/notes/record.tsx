import { RecordingPresets, setAudioModeAsync, useAudioRecorder } from 'expo-audio';
import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View, type TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/icons';
import { LinkContactsPill } from '@/components/notes/note-parts';
import { TAB_BAR_HEIGHT, TabBar } from '@/components/tab-bar';
import { goBack } from '@/lib/go-back';
import { useNotes } from '@/state/notes';
import { colors, fonts } from '@/theme';

const webNoFocusRing = Platform.OS === 'web' ? ({ outlineStyle: 'none' } as unknown as TextStyle) : null;

const clock = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

// Live recording: optional title, Pause / Resume, running timer and End (saves the note).
export default function RecordNoteScreen() {
  const insets = useSafeAreaInsets();
  const { addRecording } = useNotes();
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [title, setTitle] = useState('');
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // The microphone permission was granted before this screen opened.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
        await recorder.prepareToRecordAsync();
        if (!cancelled) recorder.record();
      } catch {
        // Recording is best effort; the note is still saved on End.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [recorder]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [paused]);

  const togglePause = () => {
    try {
      if (paused) recorder.record();
      else recorder.pause();
    } catch {}
    setPaused((p) => !p);
  };

  const end = async () => {
    try {
      await recorder.stop();
    } catch {}
    addRecording(title.trim());
    goBack('/notes');
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header} />
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="New note"
        placeholderTextColor="#9E9E9E"
        cursorColor="#000000"
        selectionColor="#000000"
        style={[styles.title, webNoFocusRing]}
      />
      <LinkContactsPill style={styles.link} />

      <View style={[styles.bottom, { bottom: TAB_BAR_HEIGHT + insets.bottom + 23.8 }]}>
        <View style={styles.hint}>
          <Text style={styles.hintText}>New person? Pause and ask before they’re recorded.</Text>
          <Icon name="openInNew" size={15.2} color="#0D0906" />
        </View>
        <View style={styles.bar}>
          <Pressable accessibilityRole="button" onPress={togglePause} style={({ pressed }) => [styles.pause, pressed && styles.pressed]}>
            <Icon name={paused ? 'play' : 'pause'} size={20} color="#4D4D4D" />
            <Text style={styles.pauseText}>{paused ? 'Resume' : 'Pause'}</Text>
          </Pressable>
          <View style={styles.timer}>
            <View style={styles.levels}>
              {[0, 1, 2].map((i) => (
                <View key={i} style={[styles.level, paused && styles.levelPaused]} />
              ))}
            </View>
            <Text style={styles.timerText}>{clock(seconds)}</Text>
          </View>
          <Pressable accessibilityRole="button" onPress={end} style={({ pressed }) => [styles.end, pressed && styles.pressed]}>
            <Icon name="stop" size={19.7} color="#FFFFFF" />
            <Text style={styles.endText}>End</Text>
          </Pressable>
        </View>
      </View>

      <TabBar active="notetaker" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 64.4,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  title: {
    height: 32.8,
    marginTop: 15.4,
    marginHorizontal: 16.5,
    padding: 0,
    fontFamily: fonts.uiSemiBold,
    fontSize: 27.3,
    color: '#000000',
  },
  link: {
    marginTop: 19.3,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 16.2,
  },
  hint: {
    height: 31.1,
    paddingLeft: 17.3,
    paddingRight: 17.7,
    borderRadius: 15.6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8F8F8',
  },
  hintText: {
    fontFamily: fonts.ui,
    fontSize: 11.6,
    color: '#0D0906',
    includeFontPadding: false,
  },
  bar: {
    alignSelf: 'stretch',
    height: 68,
    marginHorizontal: 16.5,
    paddingHorizontal: 15.7,
    borderRadius: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 18px rgba(0,0,0,0.1)',
  },
  pressed: {
    opacity: 0.8,
  },
  pause: {
    width: 111,
    height: 44.1,
    paddingLeft: 16.2,
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: '#CFCFCF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9.5,
  },
  pauseText: {
    fontFamily: fonts.uiMedium,
    fontSize: 16.1,
    color: '#4D4D4D',
    includeFontPadding: false,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.2,
  },
  levels: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  level: {
    width: 3.1,
    height: 12.7,
    borderRadius: 1.6,
    backgroundColor: '#F0584A',
  },
  levelPaused: {
    backgroundColor: '#C9C9C9',
  },
  timerText: {
    fontFamily: fonts.uiMedium,
    fontSize: 14.7,
    color: '#1D1B20',
    includeFontPadding: false,
    fontVariant: ['tabular-nums'],
  },
  end: {
    width: 96.8,
    height: 44.1,
    paddingLeft: 16.3,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9.6,
    backgroundColor: colors.ink,
  },
  endText: {
    fontFamily: fonts.uiMedium,
    fontSize: 16.1,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});
