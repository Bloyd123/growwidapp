import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CardDialog } from '@/components/card-dialog';
import { Icon } from '@/components/icons';
import { goBack } from '@/lib/go-back';
import { useContacts } from '@/state/contacts';
import { useNotes } from '@/state/notes';
import { useProfile } from '@/state/profile';
import { fonts } from '@/theme';

// Menu → Manage account: sign-in email, Sign out (back to Welcome) and Delete account.
export default function ManageAccountScreen() {
  const insets = useSafeAreaInsets();
  const { profile, reset } = useProfile();
  const contacts = useContacts();
  const notes = useNotes();
  const [confirming, setConfirming] = useState(false);
  const email = profile.workEmail || profile.personalEmail;

  const signOut = () => {
    setConfirming(false);
    reset();
    contacts.reset();
    notes.reset();
    if (router.canDismiss()) router.dismissAll();
    router.replace('/');
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close" hitSlop={12} onPress={() => goBack('/my-card')} style={styles.close}>
          <Icon name="close" size={24.2} color="#000000" />
        </Pressable>
        <Text style={styles.title}>Manage my account</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText} numberOfLines={1}>
          Sign in email: {email}
        </Text>
      </View>
      <View style={styles.rule} />
      <Pressable accessibilityRole="button" onPress={() => setConfirming(true)} style={({ pressed }) => [styles.row, styles.signOut, pressed && styles.pressed]}>
        <Text style={styles.rowText}>Sign out</Text>
        <Icon name="chevronRight" size={30} color="#110705" />
      </Pressable>
      <View style={styles.rule} />

      <Text style={[styles.delete, { bottom: insets.bottom + 22 }]}>DELETE ACCOUNT</Text>

      <CardDialog
        visible={confirming}
        title="Are you sure you want to sign out?"
        actions={[
          { label: 'No', onPress: () => setConfirming(false) },
          { label: 'Yes', onPress: signOut, accent: true },
        ]}
        onRequestClose={() => setConfirming(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 63.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    left: 11.9,
    top: 19.8,
  },
  title: {
    fontFamily: fonts.uiMedium,
    fontSize: 20.2,
    color: '#110705',
    includeFontPadding: false,
  },
  row: {
    height: 100.6,
    paddingHorizontal: 16.5,
    justifyContent: 'center',
  },
  signOut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 23,
  },
  pressed: {
    backgroundColor: '#F7F7F7',
  },
  rowText: {
    fontFamily: fonts.uiMedium,
    fontSize: 17.6,
    color: '#110705',
    includeFontPadding: false,
  },
  rule: {
    height: 1.2,
    backgroundColor: '#E0E0E0',
  },
  delete: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: fonts.uiMedium,
    fontSize: 14.5,
    letterSpacing: 0.7,
    color: '#6B6B6B',
  },
});
