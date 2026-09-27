import { router } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Icon, PersonPlaceholder } from '@/components/icons';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { pickFromLibrary, takePhoto } from '@/lib/pick-image';
import { useProfile } from '@/state/profile';
import { colors, typography } from '@/theme';

export default function PhotoScreen() {
  const { profile, update } = useProfile();
  const next = () => router.push('/create-account');
  const setPhoto = (uri: string | null) => {
    if (uri) update({ photoUri: uri });
  };

  return (
    <OnboardingScreen
      step={5}
      variant="media"
      title="Finally, add a profile picture"
      subtitle="A profile picture makes your card easier to remember"
      footerGap={12.4}
      footer={
        profile.photoUri ? (
          <Button title="Continue" height={59} onPress={next} />
        ) : (
          <Button title="Not now" variant="text" height={59} onPress={next} labelStyle={styles.notNow} />
        )
      }>
      <View style={styles.square}>
        {profile.photoUri ? (
          <Image source={{ uri: profile.photoUri }} style={StyleSheet.absoluteFill} />
        ) : (
          <PersonPlaceholder width={53.1} color={colors.glyph} />
        )}
      </View>
      <Button
        title="Select from photo library"
        variant="secondary"
        height={59}
        icon={<Icon name="photoLibrary" size={26} color="#000000" />}
        labelStyle={styles.action}
        onPress={async () => setPhoto(await pickFromLibrary())}
        style={styles.library}
      />
      <Button
        title="Use camera"
        variant="text"
        height={59}
        icon={<Icon name="camera" size={26} color="#000000" />}
        labelStyle={styles.action}
        onPress={async () => setPhoto(await takePhoto())}
        style={styles.camera}
      />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  square: {
    alignSelf: 'center',
    marginTop: 29.7,
    width: 199.8,
    height: 199.8,
    borderRadius: 16.5,
    overflow: 'hidden',
    backgroundColor: colors.fill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    ...typography.action,
    color: '#000000',
  },
  notNow: {
    color: '#000000',
  },
  library: {
    marginTop: 48.7,
  },
  camera: {
    marginTop: 7.8,
  },
});
