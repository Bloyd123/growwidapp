import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppleMark, GoogleMark, MicrosoftMark } from '@/components/brand-icons';
import { Button } from '@/components/button';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { TextField } from '@/components/text-field';
import { useProfile } from '@/state/profile';
import { colors, typography } from '@/theme';

export default function CreateAccountScreen() {
  const { profile, update } = useProfile();
  const next = () => router.push('/add-widget');

  return (
    <OnboardingScreen variant="media" title={'Create your account to save your\ncard'}>
      <TextField
        tone="account"
        label="Personal email"
        value={profile.personalEmail}
        onChangeText={(personalEmail) => update({ personalEmail })}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        style={styles.email}
      />
      <Button
        title="Continue"
        height={55.8}
        disabled={!profile.personalEmail.trim()}
        onPress={next}
        style={styles.continue}
      />
      <View style={styles.divider} />
      <Button
        title="Continue with Google"
        variant="secondary"
        height={55.8}
        icon={<GoogleMark size={20.1} />}
        onPress={next}
        labelStyle={styles.social}
        style={[styles.provider, styles.first]}
      />
      <Button
        title="Continue with Microsoft"
        variant="secondary"
        height={55.8}
        icon={<MicrosoftMark size={20.1} />}
        onPress={next}
        labelStyle={styles.social}
        style={styles.provider}
      />
      <Button
        title="Continue with Apple"
        variant="secondary"
        height={55.8}
        icon={<AppleMark size={22.4} />}
        onPress={next}
        labelStyle={styles.social}
        style={styles.provider}
      />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  email: {
    marginTop: 35.2,
  },
  continue: {
    marginTop: 20.4,
  },
  divider: {
    marginTop: 24.4,
    height: 1.2,
    backgroundColor: colors.fill,
  },
  provider: {
    marginTop: 8.3,
    borderColor: '#DADADA',
  },
  first: {
    marginTop: 24.4,
  },
  social: {
    ...typography.action,
    color: colors.muted,
  },
});
