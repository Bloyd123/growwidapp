import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/icons';
import { Overlay } from '@/components/overlay';
import { colors, typography } from '@/theme';

type BottomSheetProps = {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  bottomGap?: number;
};

// Modal sheet over a 60% black scrim, with a close button and centred title.
export function BottomSheet({ visible, title, onClose, children, bottomGap = 11.8 }: BottomSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Overlay visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable accessibilityLabel="Close" style={StyleSheet.absoluteFill} onPress={onClose}>
          <Animated.View entering={FadeIn.duration(200)} style={styles.scrim} />
        </Pressable>
        <Animated.View
          entering={SlideInDown.duration(260)}
          style={[styles.sheet, { paddingBottom: insets.bottom + bottomGap }]}>
          <View style={styles.header}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close"
              hitSlop={12}
              onPress={onClose}
              style={styles.close}>
              <Icon name="close" size={24.8} color="#000000" />
            </Pressable>
            <Text style={styles.title}>{title}</Text>
          </View>
          {children}
        </Animated.View>
      </KeyboardAvoidingView>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    backgroundColor: colors.background,
    paddingTop: 19.2,
  },
  header: {
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    left: 15.3,
    top: 0.6,
  },
  title: {
    ...typography.sheetTitle,
    color: '#000000',
    includeFontPadding: false,
  },
});
