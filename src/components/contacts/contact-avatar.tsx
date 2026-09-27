import { StyleSheet, Text, View } from 'react-native';

import { SampleLogoMark } from '@/components/brand-icons';
import type { Contact } from '@/state/contacts';
import { fonts } from '@/theme';

// Coloured circle with the contact's initial (or a company logo).
export function ContactAvatar({ contact, size }: { contact: Contact; size: number }) {
  if (contact.logo) {
    return (
      <View style={[styles.circle, { width: size, height: size }]}>
        <SampleLogoMark size={size * 0.55} />
      </View>
    );
  }
  const initial = (contact.firstName || contact.lastName || '?').charAt(0).toUpperCase();
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: contact.avatarColor }]}>
      <Text style={[styles.initial, { fontSize: size * 0.53 }]}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontFamily: fonts.uiSemiBold,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});
