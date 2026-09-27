import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from '@/components/icons';
import { useNotes } from '@/state/notes';
import { colors, fonts } from '@/theme';

export const TAB_BAR_HEIGHT = 56.6;

// Tab centres as a fraction of the screen width, measured from the reference.
export type TabKey = 'card' | 'scan' | 'notetaker' | 'contacts';
const TABS: { key: TabKey; label: string; icon: IconName; center: number; route: '/my-card' | '/contacts' | '/scan' | '/notes' }[] = [
  { key: 'card', label: 'My Cards', icon: 'tabCard', center: 0.1167, route: '/my-card' },
  { key: 'scan', label: 'Scan', icon: 'tabScan', center: 0.35, route: '/scan' },
  { key: 'notetaker', label: 'AI Notetaker', icon: 'tabMic', center: 0.618, route: '/notes' },
  { key: 'contacts', label: 'Contacts', icon: 'tabContacts', center: 0.883, route: '/contacts' },
];
const ITEM_WIDTH = 99.1;
const INACTIVE = '#A3A3A3';

// Bottom navigation. Scan opens the camera; the red dot on AI Notetaker stays until its terms are accepted.
export function TabBar({ active = 'card' }: { active?: TabKey }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { consented } = useNotes();

  return (
    <View style={[styles.bar, { height: TAB_BAR_HEIGHT + insets.bottom }]}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        const color = isActive ? '#000000' : INACTIVE;
        return (
          <Pressable
            key={tab.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            disabled={isActive}
            onPress={() => router.navigate(tab.route)}
            style={[styles.item, { left: tab.center * width - ITEM_WIDTH / 2 }]}>
            <View>
              <Icon name={tab.icon} size={28.3} color={color} />
              {tab.key === 'notetaker' && !consented ? <View style={styles.badge} /> : null}
            </View>
            <Text style={[styles.label, { color }]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
    boxShadow: '0 -3px 12px rgba(0,0,0,0.05)',
  },
  item: {
    position: 'absolute',
    top: 5.3,
    width: ITEM_WIDTH,
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -1.2,
    right: -3.5,
    width: 9.4,
    height: 9.4,
    borderRadius: 4.7,
    backgroundColor: '#F4523F',
  },
  label: {
    fontFamily: fonts.uiMedium,
    fontSize: 12,
    lineHeight: 16.5,
    marginTop: -1.8,
  },
});
