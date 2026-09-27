import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Icon } from '@/components/icons';
import { Overlay } from '@/components/overlay';

type PermissionDialogProps = {
  visible: boolean;
  onAllow: () => void;
  onDeny: () => void;
};

const ACCENT = '#7393F5';

// Look-alike of Android's dark "Allow … to send you notifications?" prompt (system font).
// Drawn by the app: in Expo Go the real prompt would name Expo Go, not Groowid.
export function PermissionDialog({ visible, onAllow, onDeny }: PermissionDialogProps) {
  return (
    <Overlay visible={visible} onRequestClose={onDeny}>
      <Animated.View entering={FadeIn.duration(150)} style={styles.scrim}>
        <View style={styles.box}>
          <Icon name="bellRinging" size={22.4} color={ACCENT} />
          <Text style={styles.title}>Allow Groowid to send you notifications?</Text>
          <View style={styles.divider} />
          <Pressable accessibilityRole="button" onPress={onAllow} style={styles.action}>
            <Text style={styles.actionText}>Allow</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={onDeny} style={styles.action}>
            <Text style={styles.actionText}>Don’t allow</Text>
          </Pressable>
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
    // Sits a little above centre, like the reference.
    paddingBottom: 32,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  box: {
    width: 320.6,
    maxWidth: '88%',
    paddingTop: 20.6,
    borderRadius: 15.3,
    alignItems: 'center',
    backgroundColor: '#303134',
    overflow: 'hidden',
  },
  title: {
    marginTop: 16.5,
    paddingHorizontal: 40,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '700',
    color: '#F2F2F2',
  },
  divider: {
    alignSelf: 'stretch',
    height: StyleSheet.hairlineWidth * 2,
    marginTop: 16.4,
    backgroundColor: '#48494C',
  },
  action: {
    alignSelf: 'stretch',
    height: 47.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 15.6,
    fontWeight: '500',
    color: ACCENT,
  },
});
