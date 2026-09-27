import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { Button } from '@/components/button';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { TextField } from '@/components/text-field';
import { useProfile } from '@/state/profile';
import { colors, typography } from '@/theme';

export default function NameScreen() {
  const { profile, update } = useProfile();
  const canContinue = profile.firstName.trim().length > 0;

  return (
    <OnboardingScreen
      step={1}
      title={'First things first… what’s your\nname?'}
      footer={
        <Button
          title="Continue"
          disabled={!canContinue}
          onPress={() => router.push('/onboarding/contact')}
        />
      }>
      <TextField
        label="First name (required)"
        value={profile.firstName}
        onChangeText={(firstName) => update({ firstName })}
        autoCapitalize="words"
        autoComplete="given-name"
        style={styles.first}
      />
      <TextField
        label="Last name"
        value={profile.lastName}
        onChangeText={(lastName) => update({ lastName })}
        autoCapitalize="words"
        autoComplete="family-name"
        style={styles.next}
      />
      <Text style={styles.legal}>
        By continuing, you agree to the <Text style={styles.link}>Privacy Policy</Text> &{' '}
        <Text style={styles.link}>Terms of Service</Text>
      </Text>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  first: {
    marginTop: 32.3,
  },
  next: {
    marginTop: 24.2,
  },
  legal: {
    ...typography.fine,
    marginTop: 15.2,
    color: '#000000',
    includeFontPadding: false,
  },
  link: {
    textDecorationLine: 'underline',
    color: colors.inkDeep,
  },
});
