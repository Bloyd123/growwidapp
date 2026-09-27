import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LinkedInTile, PhotosMark, WhatsAppMark, XTile } from '@/components/brand-icons';
import { AlertDialog } from '@/components/confirm-dialog';
import { FieldIcon, Icon } from '@/components/icons';
import { OfflineCard } from '@/components/share/offline-card';
import { ShareGroup, ShareRow, shareRowColors } from '@/components/share/share-list';
import { ShareQr } from '@/components/share/share-qr';
import { goBack } from '@/lib/go-back';
import { cardVCard } from '@/lib/vcard';
import { cardUrl, useProfile } from '@/state/profile';
import { colors, fonts } from '@/theme';

const HEADER_HEIGHT = 63.8;
const OFFLINE_BACKGROUND = colors.ink;

// Opened from Share on My Card. The screen takes the card colour; offline mode turns it dark
// and swaps the QR for one that carries the contact itself.
export default function SendYourCardScreen() {
  const insets = useSafeAreaInsets();
  const { card } = useProfile();
  const [offline, setOffline] = useState(false);
  const [askBrightness, setAskBrightness] = useState(false);
  const [savedQr, setSavedQr] = useState(false);

  const url = cardUrl(card);
  const { ink } = shareRowColors(offline);
  const background = offline ? OFFLINE_BACKGROUND : card.color;

  // Hands the link to the phone's own share sheet (LinkedIn, X, Nearby Share…).
  const shareLink = () => {
    Share.share({ message: `Hi, tap this link to get my business card: ${url}` }).catch(() => {});
  };
  const openMessage = (kind: 'text' | 'email' | 'whatsapp') =>
    router.push({ pathname: '/share/message', params: { kind } });

  return (
    <View style={[styles.screen, { backgroundColor: background, paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close" hitSlop={12} onPress={() => goBack('/my-card')} style={styles.close}>
          <Icon name="close" size={22.3} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.title}>Send Your Card</Text>
        {/* Settings: offers to turn on auto brightness so the QR is easy to scan. */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Settings"
          onPress={() => setAskBrightness(true)}
          style={styles.gear}>
          <Icon name="gear" size={23.4} color="#FFFFFF" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 31 }]}>
        <ShareQr value={offline ? cardVCard(card) : url} offline={offline} />
        <Text style={styles.caption}>Point your camera at the QR code to receive the card</Text>

        <ShareGroup style={[styles.offlineGroup, !offline && styles.offlineGroupOnline]}>
          <OfflineCard offline={offline} onChange={setOffline} />
        </ShareGroup>
        {offline ? (
          <ShareGroup style={styles.addContact}>
            <ShareRow
              offline
              large
              icon={<Icon name="plus" size={23.5} color={ink} />}
              label="Add contact"
              onPress={() => router.push('/share/contact')}
            />
          </ShareGroup>
        ) : null}

        <ShareGroup style={styles.gap}>
          <ShareRow
            offline={offline}
            icon={<Icon name="copy" size={22.6} color={ink} />}
            label="Copy link"
            onPress={() => Clipboard.setStringAsync(url)}
          />
        </ShareGroup>

        <ShareGroup style={styles.gap}>
          <ShareRow offline={offline} icon={<Icon name="chat" size={22.7} color={ink} />} label="Text your card" onPress={() => openMessage('text')} />
          <ShareRow offline={offline} icon={<FieldIcon name="mail" size={24} color={ink} />} label="Email your card" onPress={() => openMessage('email')} />
          <ShareRow offline={offline} icon={<WhatsAppMark size={22.4} />} label="Send via WhatsApp" onPress={() => openMessage('whatsapp')} />
          <ShareRow offline={offline} icon={<LinkedInTile size={22.4} />} label="Send via LinkedIn" onPress={shareLink} />
          <ShareRow offline={offline} icon={<Icon name="dots" size={19} color={ink} />} label="Send another way" onPress={shareLink} />
        </ShareGroup>

        <ShareGroup style={styles.gap}>
          <ShareRow offline={offline} icon={<LinkedInTile size={22.4} />} label="Post to LinkedIn" onPress={shareLink} />
          <ShareRow offline={offline} icon={<XTile size={22.4} />} label="Post to X" onPress={shareLink} />
        </ShareGroup>

        <ShareGroup style={styles.gap}>
          <ShareRow offline={offline} icon={<PhotosMark size={24} />} label="Save QR code to photos" onPress={() => setSavedQr(true)} />
          <ShareRow offline={offline} icon={<Icon name="sendRight" size={22} color={ink} />} label="Send QR code" onPress={shareLink} />
        </ShareGroup>

        <ShareGroup style={styles.walletGap}>
          <ShareRow
            offline={offline}
            icon={<Icon name="walletClasp" size={25} color={ink} />}
            label="Add card to wallet"
            onPress={() => router.push('/share/wallet')}
          />
        </ShareGroup>
      </ScrollView>

      <AlertDialog
        visible={askBrightness}
        title="Enable auto brightness"
        message="Auto brightness is currently turned off. Would you like to enable it?"
        actions={[
          { label: 'NOT NOW', onPress: () => setAskBrightness(false) },
          { label: 'ENABLE', onPress: () => setAskBrightness(false) },
        ]}
        onRequestClose={() => setAskBrightness(false)}
      />
      <AlertDialog
        visible={savedQr}
        title="Successfully saved your QR code to your photos! 🎉"
        message="Open the photo library on your phone to view the QR code"
        actions={[{ label: 'GOT IT', onPress: () => setSavedQr(false) }]}
        onRequestClose={() => setSavedQr(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 44dp touch box centred on the X glyph.
  close: {
    position: 'absolute',
    left: 8.6,
    top: 10.2,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.ui,
    fontSize: 20.1,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  // 44dp touch box centred on the gear glyph.
  gear: {
    position: 'absolute',
    right: 10.7,
    top: 10,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingTop: 12.4,
  },
  caption: {
    marginTop: 26.9,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontFamily: fonts.uiSemiBold,
    fontSize: 24,
    lineHeight: 35,
    color: '#FFFFFF',
  },
  offlineGroup: {
    marginTop: 17.1,
  },
  offlineGroupOnline: {
    marginBottom: 2.5,
  },
  addContact: {
    marginTop: 1.8,
  },
  gap: {
    marginTop: 7.6,
  },
  walletGap: {
    marginTop: 15.3,
  },
});
