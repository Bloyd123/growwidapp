import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/icons';
import { ProfileCard, useCardWidth } from '@/components/profile-card';
import { ShareIntroSheet } from '@/components/share/share-intro-sheet';
import { SideMenu } from '@/components/side-menu';
import { TAB_BAR_HEIGHT, TabBar } from '@/components/tab-bar';
import { cardUrl, useProfile } from '@/state/profile';
import { colors, fonts } from '@/theme';

const PAGE_GAP = 18.9;
// Room above the cards inside the pager so their shadow isn't clipped.
const SHADOW_ROOM = 23.6;
const HEADER_HEIGHT = 66.1;
const QR_TOP = 10.6;
const QR_SIZE = 161.7;
const CARDS_GAP = 25.4;
const SHARE_BOTTOM = 21.2;
const SHARE_HEIGHT = 50.7;

export default function MyCardScreen() {
  const insets = useSafeAreaInsets();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const { card, profile, update } = useProfile();
  const pager = useRef<ScrollView>(null);
  const [page, setPage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareIntro, setShareIntro] = useState(false);
  const [pagerHeight, setPagerHeight] = useState(0);
  const onCard = page === 0;
  const tabBarHeight = TAB_BAR_HEIGHT + insets.bottom;
  const cardWidth = useCardWidth();
  const pageStep = cardWidth + PAGE_GAP;
  const sideInset = (windowWidth - cardWidth) / 2;
  // Cards fill the rest of the screen and run down behind the tab bar, like the reference.
  const estimatedPagerHeight = windowHeight - (insets.top + HEADER_HEIGHT + QR_TOP + QR_SIZE + CARDS_GAP) + SHADOW_ROOM;
  const cardHeight = (pagerHeight || estimatedPagerHeight) - SHADOW_ROOM;
  // The last card row can scroll up clear of the Share button.
  const cardBottomInset = tabBarHeight + SHARE_BOTTOM + SHARE_HEIGHT + 16.5;

  const onPagerScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPage(Math.round(e.nativeEvent.contentOffset.x / pageStep));
  };
  const goTo = (index: number) => pager.current?.scrollTo({ x: index * pageStep, animated: true });
  // The first Share tap explains offline sharing; later taps open Send Your Card directly.
  const openShare = () => (profile.shareIntroSeen ? router.push('/share') : setShareIntro(true));

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open menu"
          hitSlop={10}
          onPress={() => setMenuOpen(true)}
          style={styles.menu}>
          <View style={styles.menuBar} />
          <View style={styles.menuBar} />
          <View style={styles.menuBar} />
        </Pressable>
        {profile.notificationsOn ? null : (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            hitSlop={10}
            onPress={() => router.push('/notifications')}
            style={styles.bell}>
            <Icon name="bell" size={26} color="#000000" />
            <View style={styles.bellBadge} />
          </Pressable>
        )}
        {onCard ? (
          <>
            <Text style={styles.title}>{card.name}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Edit card"
              hitSlop={10}
              onPress={() => router.push('/edit-card')}
              style={styles.edit}>
              <Icon name="edit" size={24.8} color="#000000" />
            </Pressable>
          </>
        ) : null}
      </View>

      <View style={[styles.qr, !onCard && styles.hidden]}>
        <QRCode value={cardUrl(card)} size={QR_SIZE} color="#000000" backgroundColor={colors.canvas} quietZone={0} />
      </View>
      <ScrollView
        ref={pager}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={pageStep}
        decelerationRate="fast"
        onScroll={onPagerScroll}
        scrollEventThrottle={32}
        onLayout={(e) => setPagerHeight(e.nativeEvent.layout.height)}
        style={styles.pager}
        contentContainerStyle={[styles.pages, { paddingHorizontal: sideInset }]}>
        <Pressable disabled={page === 0} onPress={() => goTo(0)}>
          <ProfileCard card={card} width={cardWidth} height={cardHeight} bottomInset={cardBottomInset} />
        </Pressable>
        <Pressable disabled={page === 1} onPress={() => goTo(1)}>
          <AddCardPage width={cardWidth} height={cardHeight} />
        </Pressable>
      </ScrollView>

      {onCard ? (
        <View style={[styles.shareWrap, { bottom: tabBarHeight + SHARE_BOTTOM }]}>
          <Pressable
            accessibilityRole="button"
            onPress={openShare}
            style={({ pressed }) => [styles.share, pressed && styles.sharePressed]}>
            <Icon name="send" size={23.6} color="#FFFFFF" />
            <Text style={styles.shareLabel}>Share</Text>
          </Pressable>
        </View>
      ) : null}

      <TabBar />
      <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
      <ShareIntroSheet
        visible={shareIntro}
        onClose={() => setShareIntro(false)}
        onGotIt={() => {
          setShareIntro(false);
          update({ shareIntroSeen: true });
          router.push('/share');
        }}
      />
    </View>
  );
}

// Last page of the cards carousel: dashed empty card with "Upgrade" and "+ Add card".
function AddCardPage({ width, height }: { width: number; height: number }) {
  return (
    <View style={[styles.addCard, { width, height }]}>
      <View style={styles.upgrade}>
        <Icon name="crown" size={20.1} color="#000000" />
        <Text style={styles.upgradeText}>Upgrade</Text>
      </View>
      <View style={styles.addBody}>
        <View style={styles.addCircle}>
          <Icon name="plus" size={40.1} color="#EE8A87" />
        </View>
        <Text style={styles.addText}>Add card</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  header: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    position: 'absolute',
    left: 18.9,
    top: 26,
    width: 18.3,
    gap: 3.2,
  },
  menuBar: {
    height: 2.9,
    borderRadius: 1.2,
    backgroundColor: '#000000',
  },
  bell: {
    position: 'absolute',
    left: 63.1,
    top: 18.9,
  },
  bellBadge: {
    position: 'absolute',
    top: -1.2,
    right: -2.4,
    width: 8.9,
    height: 8.9,
    borderRadius: 4.4,
    backgroundColor: '#F4664A',
  },
  title: {
    fontFamily: fonts.uiMedium,
    fontSize: 20.4,
    lineHeight: 26,
    color: '#000000',
  },
  edit: {
    position: 'absolute',
    right: 15.5,
    top: 21.2,
  },
  qr: {
    marginTop: QR_TOP,
    alignSelf: 'center',
  },
  hidden: {
    opacity: 0,
  },
  pager: {
    flex: 1,
    marginTop: CARDS_GAP - SHADOW_ROOM,
  },
  pages: {
    paddingTop: SHADOW_ROOM,
    gap: PAGE_GAP,
  },
  addCard: {
    borderTopLeftRadius: 18.9,
    borderTopRightRadius: 18.9,
    borderWidth: 0.8,
    borderStyle: 'dashed',
    borderColor: '#CFCFCF',
    backgroundColor: colors.background,
    boxShadow: '0 2px 22px rgba(0,0,0,0.16)',
  },
  upgrade: {
    position: 'absolute',
    top: 6.7,
    right: 9.1,
    height: 35.4,
    paddingHorizontal: 11.8,
    borderRadius: 17.7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5.9,
    backgroundColor: '#E8F1EC',
  },
  upgradeText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 12.2,
    color: '#000000',
  },
  addBody: {
    position: 'absolute',
    top: 234.8,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  addCircle: {
    width: 70.4,
    height: 70.4,
    borderRadius: 35.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCECEC',
  },
  addText: {
    marginTop: 14.2,
    fontFamily: fonts.uiSemiBold,
    fontSize: 17.7,
    color: '#000000',
  },
  shareWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  share: {
    width: 119.8,
    height: SHARE_HEIGHT,
    borderRadius: 25.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9.4,
    backgroundColor: colors.cardIcon,
    boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
  },
  sharePressed: {
    opacity: 0.9,
  },
  shareLabel: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 17.7,
    lineHeight: 23.6,
    color: '#FFFFFF',
  },
});
