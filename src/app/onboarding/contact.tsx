import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Button } from '@/components/button';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { TextField } from '@/components/text-field';
import { useProfile } from '@/state/profile';

export default function ContactScreen() {
  const { profile, update } = useProfile();

  return (
    <OnboardingScreen
      step={2}
      title="How can people reach you at work?"
      footer={<Button title="Continue" onPress={() => router.push('/onboarding/details')} />}>
      <TextField
        label="Work email"
        value={profile.workEmail}
        onChangeText={(workEmail) => update({ workEmail })}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        style={styles.first}
      />
      <TextField
        label="Phone number"
        value={profile.phone}
        onChangeText={(phone) => update({ phone })}
        keyboardType="phone-pad"
        autoComplete="tel"
        style={styles.next}
      />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  first: {
    marginTop: 24.7,
  },
  next: {
    marginTop: 24.2,
  },
});
