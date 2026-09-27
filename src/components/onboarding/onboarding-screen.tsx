import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, typography } from '@/theme';

import { OnboardingHeader } from './onboarding-header';

export const SCREEN_PADDING = 15.9;

type OnboardingScreenProps = {
  step?: number;
  title: string;
  subtitle?: string;
  // "question": ink heading (name/contact/details) · "media": navy heading (logo/photo/account)
  variant?: 'question' | 'media';
  children?: ReactNode;
  // Pinned to the bottom; rises above the keyboard.
  footer?: ReactNode;
  footerGap?: number;
};

export function OnboardingScreen({
  step,
  title,
  subtitle,
  variant = 'question',
  children,
  footer,
  footerGap = 16.5,
}: OnboardingScreenProps) {
  const insets = useSafeAreaInsets();
  const isMedia = variant === 'media';

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <OnboardingHeader step={step} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.content, { paddingTop: isMedia ? 11.7 : 8.7 }]}
          keyboardShouldPersistTaps="handled">
          <Text style={[styles.heading, { color: isMedia ? colors.navy : colors.inkDeep }]}>
            {title}
          </Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          {children}
        </ScrollView>
        {footer ? (
          <View style={[styles.footer, { paddingBottom: insets.bottom + footerGap }]}>{footer}</View>
        ) : null}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 28.3,
  },
  heading: {
    ...typography.heading,
    includeFontPadding: false,
  },
  subtitle: {
    ...typography.subtitle,
    marginTop: 11.2,
    color: colors.muted,
    includeFontPadding: false,
  },
  footer: {
    paddingHorizontal: SCREEN_PADDING,
  },
});
