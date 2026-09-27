import type { ReactElement } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { AppleMark, GoogleMark, MicrosoftMark } from '@/components/brand-icons';
import type { Logo } from '@/state/profile';
import { fonts } from '@/theme';

// Marks we can draw locally for a few well-known domains (no network lookup).
const KNOWN_MARKS: Record<string, (size: number) => ReactElement> = {
  'google.com': (size) => <GoogleMark size={size * 0.95} />,
  'microsoft.com': (size) => <MicrosoftMark size={size * 0.85} />,
  'apple.com': (size) => <AppleMark size={size} />,
};

// Company logo: a picked image, a known mark, or the domain's first letter in a brand-like colour.
export function LogoView({ logo, size }: { logo: Logo; size: number }) {
  if (logo.kind === 'image') {
    return <Image source={{ uri: logo.uri }} style={{ width: size * 1.6, height: size }} resizeMode="contain" />;
  }
  const known = KNOWN_MARKS[logo.source];
  return (
    <View style={[styles.box, { width: size, height: size }]}>
      {known ? (
        known(size)
      ) : (
        <Text
          allowFontScaling={false}
          style={[styles.letter, { color: logo.color, fontSize: size * 1.02, lineHeight: size * 1.1 }]}>
          {logo.letter}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontFamily: fonts.uiBold,
    includeFontPadding: false,
  },
});
