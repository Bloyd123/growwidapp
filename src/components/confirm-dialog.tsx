import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Overlay } from '@/components/overlay';
import { colors } from '@/theme';

type DialogAction = { label: string; onPress: () => void };

type AlertDialogProps = {
  visible: boolean;
  title: string;
  message: string;
  // Shown right-aligned, left to right.
  actions: DialogAction[];
  // Android back button.
  onRequestClose: () => void;
};

// Android-style alert with coral text actions (system font, like the reference).
export function AlertDialog({ visible, title, message, actions, onRequestClose }: AlertDialogProps) {
  const insets = useSafeAreaInsets();
  return (
    <Overlay visible={visible} onRequestClose={onRequestClose}>
      <Animated.View
        entering={FadeIn.duration(150)}
        style={[styles.scrim, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.box}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            {actions.map((action) => (
              <Pressable key={action.label} accessibilityRole="button" onPress={action.onPress} style={styles.action}>
                <Text style={styles.actionText}>{action.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Animated.View>
    </Overlay>
  );
}

type ConfirmDialogProps = {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

// NO / YES confirmation, e.g. "Unsaved Changes".
export function ConfirmDialog({ visible, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <AlertDialog
      visible={visible}
      title={title}
      message={message}
      actions={[
        { label: 'NO', onPress: onCancel },
        { label: 'YES', onPress: onConfirm },
      ]}
      onRequestClose={onCancel}
    />
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 27.2,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  box: {
    borderRadius: 2.4,
    paddingTop: 19.4,
    paddingHorizontal: 24.7,
    paddingBottom: 9.5,
    backgroundColor: colors.background,
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: 19,
    lineHeight: 21.2,
    fontWeight: '500',
    color: '#000000',
  },
  message: {
    marginTop: 11.5,
    fontSize: 15.5,
    lineHeight: 18.9,
    color: '#222222',
  },
  actions: {
    marginTop: 19.1,
    marginRight: -14.8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 2.9,
  },
  action: {
    height: 42.5,
    paddingHorizontal: 14.2,
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.6,
    color: colors.cardIcon,
  },
});
