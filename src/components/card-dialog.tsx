import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Overlay } from '@/components/overlay';
import { fonts } from '@/theme';

// accent: dark red and bold; bold: black and bold.
export type CardDialogAction = { label: string; onPress: () => void; accent?: boolean; bold?: boolean };

type CardDialogProps = {
  visible: boolean;
  title: string;
  body?: string;
  // Right-aligned text buttons.
  actions: CardDialogAction[];
  // Space between the buttons.
  actionGap?: number;
  onRequestClose: () => void;
};

// Rounded white dialog with a light border (Enrich contact, Sign out, Before you share).
export function CardDialog({ visible, title, body, actions, actionGap = 43, onRequestClose }: CardDialogProps) {
  const insets = useSafeAreaInsets();
  return (
    <Overlay visible={visible} onRequestClose={onRequestClose}>
      <Animated.View
        entering={FadeIn.duration(150)}
        style={[styles.scrim, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.box}>
          <Text style={styles.title}>{title}</Text>
          {body ? <Text style={styles.body}>{body}</Text> : null}
          <View style={[styles.actions, { gap: actionGap }]}>
            {actions.map((action) => (
              <Pressable key={action.label} accessibilityRole="button" hitSlop={10} onPress={action.onPress} style={styles.action}>
                <Text style={action.accent ? styles.accentText : action.bold ? styles.boldText : styles.plainText}>{action.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Animated.View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  box: {
    width: 321.1,
    maxWidth: '86%',
    paddingTop: 23.4,
    paddingHorizontal: 22,
    paddingBottom: 25,
    borderRadius: 23.6,
    borderWidth: 2,
    borderColor: '#E4E4E4',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 23.6,
    lineHeight: 32.3,
    color: '#000000',
  },
  body: {
    marginTop: 14.1,
    fontFamily: fonts.ui,
    fontSize: 15.6,
    lineHeight: 24.4,
    color: '#1A1A1A',
  },
  actions: {
    marginTop: 24.6,
    marginRight: 11.7,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  action: {
    height: 44,
    justifyContent: 'center',
  },
  plainText: {
    fontFamily: fonts.ui,
    fontSize: 15.2,
    color: '#000000',
  },
  boldText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15.7,
    color: '#000000',
  },
  accentText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15.4,
    color: '#B3261E',
  },
});
