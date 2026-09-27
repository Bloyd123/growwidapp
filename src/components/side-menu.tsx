import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Fragment, useState } from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import Animated, { FadeIn, SlideInLeft } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from '@/components/icons';
import { InviteSheet } from '@/components/invite/invite-sheet';
import { Overlay } from '@/components/overlay';
import { useProfile } from '@/state/profile';
import { fonts } from '@/theme';

// Drawer covers 80% of the screen; promo cards leave 16dp either side.
const DRAWER_FRACTION = 0.8;
const PROMO_INSET = 15.9;
const PROMO_GAP = 9.4;

type MenuItem = {
  icon: IconName;
  label: string;
  dot?: boolean;
  route?: '/add-widget' | '/account';
  // Items that open something other than a plain screen.
  action?: 'invite' | 'notifications';
};
const SECTIONS: { title?: string; items: MenuItem[] }[] = [
  { items: [{ icon: 'briefcase', label: 'Get Groowid for your team' }] },
  {
    title: 'Discover',
    items: [
      { icon: 'smartphone', label: 'Groowid Widget', dot: true, route: '/add-widget' },
      { icon: 'watch', label: 'Android Smartwatch app' },
      { icon: 'signature', label: 'Email signature' },
      { icon: 'portrait', label: 'Virtual background' },
    ],
  },
  {
    title: 'Capturing information',
    items: [
      { icon: 'sparkles', label: 'Enrichment' },
      { icon: 'leadForm', label: 'Lead capture' },
      { icon: 'plug', label: 'CRM integration' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { icon: 'person', label: 'Manage account', route: '/account' },
      { icon: 'bell', label: 'Notifications', action: 'notifications' },
      { icon: 'contactBook', label: 'Contact preferences' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'lifebuoy', label: 'Help' },
      { icon: 'sadFace', label: 'Have feedback? Let us know' },
    ],
  },
  {
    title: 'Help us grow',
    items: [
      { icon: 'heart', label: 'Loving Groowid? Leave a review' },
      { icon: 'mail', label: 'Invite friends', action: 'invite' },
    ],
  },
];

const PROMOS = [
  {
    title: 'Get Groowid for your team',
    body: 'Manage team cards, consistent branding,\nCRM integrations & more',
    colors: ['#8A2828', '#4E1210', '#0E0101'] as const,
    border: '#A33A38',
    external: true,
  },
  {
    title: 'Try Premium for ₹0.00',
    body: '5x Business cards, full customization,\nremove Groowid branding & more',
    colors: ['#F25C54', '#C8403A', '#9A2B2B'] as const,
    border: '#F47F78',
    external: false,
  },
];

type SideMenuProps = { visible: boolean; onClose: () => void };

// Black drawer opened from the ☰ button on My Card.
export function SideMenu({ visible, onClose }: SideMenuProps) {
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const [promo, setPromo] = useState(0);
  const [inviting, setInviting] = useState(false);
  const { profile } = useProfile();
  const drawerWidth = Math.round(windowWidth * DRAWER_FRACTION);
  const promoWidth = drawerWidth - PROMO_INSET * 2 - 1.2;

  const onPromoScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPromo(Math.round(e.nativeEvent.contentOffset.x / (promoWidth + PROMO_GAP)));
  };
  const open = (item: MenuItem) => {
    if (item.action === 'invite') {
      onClose();
      setInviting(true);
    } else if (item.action === 'notifications') {
      onClose();
      // Already allowed: the phone's own notification settings for the app; otherwise our prompt.
      if (profile.notificationsOn) Linking.openSettings().catch(() => {});
      else router.push('/notifications');
    } else if (item.route) {
      onClose();
      router.push(item.route);
    }
  };

  return (
    <>
      <Overlay visible={visible} onRequestClose={onClose}>
        <View style={styles.root}>
          <Animated.View
            entering={SlideInLeft.duration(240)}
            style={[styles.drawer, { width: drawerWidth, paddingTop: insets.top }]}>
            <View style={styles.top}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close menu"
                hitSlop={12}
                onPress={onClose}
                style={styles.close}>
                <Icon name="close" size={24.8} color="#FFFFFF" />
              </Pressable>
              <View style={styles.dots}>
                {PROMOS.map((p, i) => (
                  <View key={p.title} style={[styles.dot, i === promo && styles.dotActive]} />
                ))}
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={promoWidth + PROMO_GAP}
              decelerationRate="fast"
              onScroll={onPromoScroll}
              scrollEventThrottle={32}
              style={styles.promoPager}
              contentContainerStyle={styles.promoRow}>
              {PROMOS.map((p) => (
                <LinearGradient
                  key={p.title}
                  colors={p.colors}
                  start={{ x: 0, y: 0.3 }}
                  end={{ x: 1, y: 0.7 }}
                  style={[styles.promo, { width: promoWidth, borderColor: p.border }]}>
                  <Text style={styles.promoTitle}>{p.title}</Text>
                  <Text style={styles.promoBody}>{p.body}</Text>
                  <View style={styles.promoButton}>
                    <Text style={styles.promoButtonText}>View all features</Text>
                    {p.external ? <Icon name="externalLink" size={16.5} color="#3A3A3A" /> : null}
                  </View>
                </LinearGradient>
              ))}
            </ScrollView>

            <ScrollView style={styles.listScroll} contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 28.3 }]}>
              {SECTIONS.map((section, s) => (
                <Fragment key={section.title ?? 'top'}>
                  {s > 1 ? <View style={styles.divider} /> : null}
                  {section.title ? <Text style={styles.sectionTitle}>{section.title}</Text> : null}
                  {section.items.map((item) => (
                    <Pressable key={item.label} onPress={() => open(item)} style={styles.item}>
                      <View style={styles.itemIcon}>
                        <Icon name={item.icon} size={24.8} color="#FFFFFF" />
                      </View>
                      <Text style={styles.itemText}>{item.label}</Text>
                      {item.dot ? <View style={styles.itemDot} /> : null}
                    </Pressable>
                  ))}
                </Fragment>
              ))}
            </ScrollView>
          </Animated.View>
          <Pressable accessibilityLabel="Close menu" style={styles.scrimArea} onPress={onClose}>
            <Animated.View entering={FadeIn.duration(240)} style={styles.scrim} />
          </Pressable>
        </View>
      </Overlay>
      <InviteSheet visible={inviting} onClose={() => setInviting(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  drawer: {
    backgroundColor: '#000000',
  },
  scrimArea: {
    flex: 1,
  },
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.32)',
  },
  top: {
    height: 85,
  },
  close: {
    position: 'absolute',
    right: 15.6,
    top: 16.8,
  },
  dots: {
    position: 'absolute',
    top: 65.2,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7.1,
  },
  dot: {
    width: 8.3,
    height: 8.3,
    borderRadius: 4.1,
    backgroundColor: '#7A7A7A',
  },
  dotActive: {
    backgroundColor: '#FF5A4F',
  },
  promoPager: {
    flexGrow: 0,
    flexShrink: 0,
    height: 146.3,
  },
  listScroll: {
    flex: 1,
  },
  promoRow: {
    paddingHorizontal: PROMO_INSET,
    gap: PROMO_GAP,
  },
  promo: {
    height: 146.3,
    borderRadius: 18.9,
    borderWidth: 2,
    overflow: 'hidden',
  },
  promoTitle: {
    marginTop: 13.6,
    marginLeft: 26.6,
    fontFamily: fonts.uiSemiBold,
    fontSize: 17.8,
    lineHeight: 23.6,
    color: '#FFFFFF',
  },
  promoBody: {
    marginTop: 1.2,
    marginLeft: 26.6,
    fontFamily: fonts.ui,
    fontSize: 13.6,
    lineHeight: 19.5,
    color: 'rgba(255,255,255,0.92)',
  },
  promoButton: {
    position: 'absolute',
    left: 14.8,
    right: 13.6,
    top: 87.9,
    height: 38.4,
    borderRadius: 9.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9.4,
    backgroundColor: '#FFFFFF',
  },
  promoButtonText: {
    fontFamily: fonts.uiMedium,
    fontSize: 13.9,
    color: '#3A3A3A',
  },
  list: {
    paddingTop: 7.2,
  },
  divider: {
    height: 1.8,
    marginTop: 7.5,
    marginBottom: 8.4,
    backgroundColor: '#2B2E35',
  },
  sectionTitle: {
    height: 36,
    lineHeight: 36,
    marginLeft: 17.7,
    fontFamily: fonts.uiMedium,
    fontSize: 14.2,
    color: '#71747B',
  },
  item: {
    minHeight: 48,
    paddingVertical: 6,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 17.7,
  },
  itemIcon: {
    width: 26,
    alignItems: 'center',
  },
  itemText: {
    flexShrink: 1,
    marginLeft: 12,
    fontFamily: fonts.uiSemiBold,
    fontSize: 16.5,
    lineHeight: 22,
    color: '#FFFFFF',
  },
  itemDot: {
    width: 5.9,
    height: 5.9,
    borderRadius: 2.9,
    marginLeft: 9.4,
    backgroundColor: '#F0584E',
  },
});
