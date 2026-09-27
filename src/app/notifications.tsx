import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Icon } from '@/components/icons';
import { PermissionDialog } from '@/components/notifications/permission-dialog';
import { NotificationsPhoneMock } from '@/components/notifications/phone-mock';
import { goBack } from '@/lib/go-back';
import { useProfile } from '@/state/profile';
import { colors, fonts } from '@/theme';

// Opened from the bell on My Card. "Allow" turns notifications on, which hides the bell.
export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const { update } = useProfile();
  const [asking, setAsking] = useState(false);

  const allow = () => {
    setAsking(false);
    update({ notificationsOn: true });
    goBack('/my-card');
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <NotificationsPhoneMock topInset={insets.top} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close"
        hitSlop={12}
        onPress={() => goBack('/my-card')}
        style={[styles.close, { top: insets.top + 13 }]}>
        <Icon name="close" size={22.4} color="#000000" />
      </Pressable>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 15.9 }]}>
        <Text style={styles.heading}>Get notified when you make new contacts.</Text>
        <Text style={styles.body}>
          Enable notifications to keep track of the people you meet and add context to your contacts in real time.
        </Text>
        <Button title="Enable notifications" height={55.5} onPress={() => setAsking(true)} style={styles.button} />
      </View>

      <PermissionDialog visible={asking} onAllow={allow} onDeny={() => setAsking(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  close: {
    position: 'absolute',
    left: 13,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heading: {
    paddingHorizontal: 24,
    textAlign: 'center',
    fontFamily: fonts.uiSemiBold,
    fontSize: 27.5,
    lineHeight: 36.6,
    color: '#000000',
  },
  body: {
    marginTop: 6.8,
    paddingHorizontal: 24,
    textAlign: 'center',
    fontFamily: fonts.ui,
    fontSize: 15.5,
    lineHeight: 24.2,
    color: '#2B2B2B',
  },
  button: {
    marginTop: 38,
    marginHorizontal: 15.9,
  },
});
