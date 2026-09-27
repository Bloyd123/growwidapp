import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { GroowidLogo } from '@/components/groowid-logo';
import { WelcomeHero } from '@/components/welcome/welcome-hero';
import { colors, typography } from '@/theme';

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8.7 }]}>
        <GroowidLogo />
        <Text style={styles.title}>Share your{'\n'}business card</Text>
      </View>

      <WelcomeHero />

      <View style={[styles.panel, { paddingBottom: insets.bottom + 10.9 }]}>
        <Button title="Get started" onPress={() => router.push('/onboarding/name')} />
        <Button title="Sign in" variant="secondary" style={styles.signIn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    ...typography.display,
    marginTop: 10.9,
    color: colors.text,
    textAlign: 'center',
    includeFontPadding: false,
  },
  panel: {
    gap: 7.7,
    paddingTop: 24,
    paddingHorizontal: 24,
    borderTopLeftRadius: 10.9,
    borderTopRightRadius: 10.9,
    backgroundColor: colors.background,
  },
  signIn: {
    borderColor: colors.border,
  },
});
