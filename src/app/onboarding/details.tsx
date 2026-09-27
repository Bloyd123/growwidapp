import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

import { SparkleMark } from '@/components/brand-icons';
import { Button } from '@/components/button';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { TextField } from '@/components/text-field';
import { useProfile } from '@/state/profile';

export default function DetailsScreen() {
  const { profile, update } = useProfile();

  return (
    <OnboardingScreen
      step={3}
      title={'We found a few details. What\nshould your card show?'}
      footer={<Button title="Continue" onPress={() => router.push('/onboarding/logo')} />}>
      <TextField
        label="Company name"
        value={profile.company}
        onChangeText={(company) => update({ company })}
        autoCapitalize="words"
        style={styles.first}
      />
      <TextField
        label="Job title"
        value={profile.jobTitle}
        onChangeText={(jobTitle) => update({ jobTitle })}
        autoCapitalize="words"
        style={styles.next}
      />
      <TextField
        label="Company website"
        value={profile.website}
        onChangeText={(website) => update({ website })}
        keyboardType="url"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.next}
      />
      <TextField
        label="LinkedIn"
        labelAccessory={<SparkleMark size={20.1} />}
        prefix="linkedin.com/in/"
        value={profile.linkedin}
        onChangeText={(linkedin) => update({ linkedin })}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.next}
      />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  first: {
    marginTop: 32.6,
  },
  next: {
    marginTop: 24.4,
  },
});
