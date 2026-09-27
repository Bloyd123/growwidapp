import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Overlay } from '@/components/overlay';

type PlainSheetProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  // Scrim darkness: 0.32 (light grey) or 0.6 (dark), as in the references.
  dim?: number;
  // Extra space under the content, above the navigation bar.
  bottomGap?: number;
  style?: StyleProp<ViewStyle>;
};

// Bottom sheet without a header: rounded top, slides up over a scrim, tap outside to close.
export function PlainSheet({ visible, onClose, children, dim = 0.32, bottomGap = 0, style }: PlainSheetProps) {
  const insets = useSafeAreaInsets();
  return (
    <Overlay visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable accessibilityLabel="Close" style={StyleSheet.absoluteFill} onPress={onClose}>
          <Animated.View entering={FadeIn.duration(200)} style={[styles.scrim, { backgroundColor: `rgba(0,0,0,${dim})` }]} />
        </Pressable>
        <Animated.View
          entering={SlideInDown.duration(260)}
          style={[styles.sheet, { paddingBottom: insets.bottom + bottomGap }, style]}>
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
  },
  sheet: {
    borderTopLeftRadius: 28.3,
    borderTopRightRadius: 28.3,
    backgroundColor: '#FFFFFF',
  },
});
