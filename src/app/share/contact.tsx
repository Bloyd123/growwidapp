import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FieldIcon, Icon, type IconName } from '@/components/icons';
import { displayName } from '@/components/profile-card';
import { goBack } from '@/lib/go-back';
import { useProfile } from '@/state/profile';

const ACTIONS: { label: string; icon: IconName | 'phone' }[] = [
  { label: 'Call', icon: 'phone' },
  { label: 'Message', icon: 'message' },
  { label: 'Video', icon: 'videocam' },
  { label: 'Email', icon: 'mail' },
];

// "Add contact": the new contact as the phone's contacts app shows it (dark system style).
export default function ShareContactScreen() {
  const insets = useSafeAreaInsets();
  const { card } = useProfile();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <Pressable accessibilityRole="button" accessibilityLabel="Back" hitSlop={12} onPress={() => goBack('/share')} style={styles.back}>
        <Icon name="arrowBack" size={24} color="#FFFFFF" />
      </Pressable>

      {card.photoUri ? (
        <Image source={{ uri: card.photoUri }} style={styles.avatar} />
      ) : (
        <View style={styles.avatar} />
      )}
      <Text style={styles.name}>{displayName(card)}</Text>

      <View style={styles.actions}>
        {ACTIONS.map((action) => (
          <View key={action.label} style={styles.action}>
            <View style={styles.actionButton}>
              {action.icon === 'phone' ? (
                <FieldIcon name="phone" size={24} color="#FFFFFF" />
              ) : (
                <Icon name={action.icon} size={24} color="#FFFFFF" />
              )}
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2E2E2E',
  },
  back: {
    alignSelf: 'flex-start',
    marginTop: 22.5,
    marginLeft: 20,
  },
  avatar: {
    width: 120.4,
    height: 120.4,
    marginTop: 21.6,
    borderRadius: 60.2,
    backgroundColor: '#4D4D4D',
  },
  name: {
    marginTop: 21.6,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '500',
    color: '#F2F2F2',
  },
  actions: {
    marginTop: 67.5,
    flexDirection: 'row',
    gap: 18.5,
  },
  action: {
    width: 71.7,
    alignItems: 'center',
  },
  actionButton: {
    width: 71.7,
    height: 56.3,
    borderRadius: 11.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#454545',
  },
  actionLabel: {
    marginTop: 5.8,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    color: '#F2F2F2',
  },
});
