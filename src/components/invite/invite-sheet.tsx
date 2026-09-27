import * as Clipboard from 'expo-clipboard';
import { useState, type ReactNode } from 'react';
import { Linking, Platform, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GmailTile, LinkedInTile, MessagesTile, WhatsAppTile } from '@/components/brand-icons';
import { AlertDialog } from '@/components/confirm-dialog';
import { GroowidMark } from '@/components/groowid-logo';
import { Icon } from '@/components/icons';
import { Overlay } from '@/components/overlay';
import { colors, fonts } from '@/theme';

const APP_LINK = 'https://groowid.app/download';
const INVITE_MESSAGE = `Hey! I use Groowid to share my digital business card. Get the app here: ${APP_LINK}`;

// Hands the invite to the phone's own share sheet (LinkedIn, More Options, Share app link).
function shareInvite() {
  Share.share({ title: 'Groowid: Digital Business Card', message: INVITE_MESSAGE }).catch(() => {});
}
function open(url: string) {
  Linking.openURL(url).catch(() => {});
}
const body = encodeURIComponent(INVITE_MESSAGE);

type InviteSheetProps = { visible: boolean; onClose: () => void };

// Menu → "Invite friends": ways to send the app link, plus a full-screen "scan to download" QR.
export function InviteSheet({ visible, onClose }: InviteSheetProps) {
  const insets = useSafeAreaInsets();
  const [page, setPage] = useState<'list' | 'qr'>('list');
  const [copied, setCopied] = useState(false);
  const [wasVisible, setWasVisible] = useState(visible);
  if (visible !== wasVisible) {
    setWasVisible(visible);
    if (visible) setPage('list');
  }

  const copyLink = () => {
    Clipboard.setStringAsync(APP_LINK).catch(() => {});
    setCopied(true);
  };

  return (
    <>
      <Overlay visible={visible} onRequestClose={() => (page === 'qr' ? setPage('list') : onClose())}>
        <View style={styles.root}>
          <Animated.View entering={FadeIn.duration(200)} style={styles.scrim} />
          <Animated.View entering={SlideInDown.duration(280)} style={[styles.sheet, { marginTop: insets.top }]}>
            <View style={styles.handle} />
            <Pressable accessibilityRole="button" accessibilityLabel="Close" hitSlop={12} onPress={onClose} style={styles.close}>
              <Icon name="close" size={24.9} color="#000000" />
            </Pressable>
            <Text style={styles.title}>How would you like to invite your friends to Groowid?</Text>

            <Row label="Scan QR code" right={<Icon name="qrCode" size={22.5} color="#000000" />} onPress={() => setPage('qr')} />
            <Row label="Copy Link" right={<Icon name="copy" size={22.9} color="#000000" />} onPress={copyLink} style={styles.gap} />

            <View style={[styles.group, styles.gap]}>
              <AppRow icon={<LinkedInTile size={22.5} />} label="LinkedIn" onPress={shareInvite} />
              <AppRow icon={<WhatsAppTile size={22.5} />} label="WhatsApp" onPress={() => open(`https://wa.me/?text=${body}`)} />
              <AppRow
                icon={<MessagesTile size={22.5} />}
                label="Messages"
                onPress={() => open(`sms:${Platform.OS === 'ios' ? '&' : '?'}body=${body}`)}
              />
              <AppRow
                icon={<GmailTile size={22.5} />}
                label="Gmail"
                onPress={() => open(`mailto:?subject=${encodeURIComponent('Try Groowid')}&body=${body}`)}
              />
            </View>

            <Row label="More Options" right={<Icon name="dots" size={15.7} color="#000000" />} onPress={shareInvite} style={[styles.gap, styles.moreRow]} />
          </Animated.View>

          {page === 'qr' ? <DownloadQr onBack={() => setPage('list')} /> : null}
        </View>
      </Overlay>

      <AlertDialog
        visible={copied}
        title="Copied App link! 🥳"
        message="Now you can paste the link wherever you'd like to share it."
        actions={[{ label: 'GOT IT', onPress: () => setCopied(false) }]}
        onRequestClose={() => setCopied(false)}
      />
    </>
  );
}

function Row({
  label,
  right,
  onPress,
  style,
}: {
  label: string;
  right: ReactNode;
  onPress: () => void;
  style?: object | object[];
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.row, style, pressed && styles.pressed]}>
      <Text style={styles.rowText}>{label}</Text>
      {right}
    </Pressable>
  );
}

function AppRow({ icon, label, onPress }: { icon: ReactNode; label: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.appRow, pressed && styles.pressed]}>
      {icon}
      <Text style={styles.appText}>{label}</Text>
    </Pressable>
  );
}

// "Scan QR code": black full-screen page with the download QR and a share button.
function DownloadQr({ onBack }: { onBack: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <Animated.View entering={FadeIn.duration(180)} style={[styles.qrPage, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Pressable accessibilityRole="button" accessibilityLabel="Back" hitSlop={12} onPress={onBack} style={styles.qrBack}>
        <Icon name="chevronLeft" size={26} color="#FFFFFF" />
      </Pressable>
      <Text style={styles.qrTitle}>Scan the QR code to download the app</Text>
      <View style={styles.qrFrame}>
        <View style={styles.qrInner}>
          <QRCode value={APP_LINK} size={333.5} ecl="Q" color="#000000" backgroundColor="#FFFFFF" quietZone={0} />
          <View style={styles.qrLogo}>
            <View style={styles.qrLogoTile}>
              <GroowidMark size={30} color="#2A0A04" />
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.qrHint}>Or share the download link</Text>
      <Pressable accessibilityRole="button" onPress={shareInvite} style={({ pressed }) => [styles.qrShare, pressed && styles.pressed]}>
        <Icon name="sendRight" size={25} color="#FFFFFF" />
        <Text style={styles.qrShareText}>SHARE APP LINK</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrim: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  handle: {
    alignSelf: 'center',
    width: 60.2,
    height: 5.1,
    marginTop: 7.9,
    borderRadius: 2.6,
    backgroundColor: '#E6E6E6',
  },
  close: {
    position: 'absolute',
    left: 20.8,
    top: 23.5,
  },
  title: {
    marginTop: 57.6,
    paddingHorizontal: 24,
    textAlign: 'center',
    fontFamily: fonts.ui,
    fontSize: 20,
    lineHeight: 25.5,
    color: '#000000',
  },
  row: {
    height: 62.6,
    marginTop: 32.7,
    marginHorizontal: 18.1,
    paddingLeft: 16.9,
    paddingRight: 22.8,
    borderRadius: 7.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F3F3',
  },
  gap: {
    marginTop: 7.8,
  },
  moreRow: {
    height: 61.4,
    paddingLeft: 19.3,
    paddingRight: 24.8,
  },
  pressed: {
    opacity: 0.8,
  },
  rowText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 14.3,
    color: '#000000',
    includeFontPadding: false,
  },
  group: {
    marginHorizontal: 18.1,
    borderRadius: 7.9,
    overflow: 'hidden',
    gap: 1.1,
  },
  appRow: {
    height: 54.7,
    paddingLeft: 16.1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 21.3,
    backgroundColor: '#F6F6F6',
  },
  appText: {
    fontFamily: fonts.ui,
    fontSize: 18.4,
    color: '#000000',
    includeFontPadding: false,
  },
  qrPage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  qrBack: {
    position: 'absolute',
    left: 15.5,
    top: 18.9,
  },
  qrTitle: {
    marginTop: 79.2,
    paddingHorizontal: 24,
    textAlign: 'center',
    fontFamily: fonts.uiSemiBold,
    fontSize: 26,
    lineHeight: 44,
    color: '#FFFFFF',
  },
  qrFrame: {
    alignSelf: 'stretch',
    height: 400.2,
    marginTop: 27.6,
    marginHorizontal: 17.7,
    paddingTop: 14.8,
    paddingBottom: 14.7,
    paddingHorizontal: 10,
    borderRadius: 5.9,
    backgroundColor: colors.coralBright,
  },
  qrInner: {
    flex: 1,
    borderRadius: 11.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  qrLogo: {
    position: 'absolute',
    width: 58,
    height: 58,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  qrLogoTile: {
    width: 47,
    height: 47,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.coralBright,
  },
  qrHint: {
    marginTop: 83,
    fontFamily: fonts.uiSemiBold,
    fontSize: 20.4,
    lineHeight: 26,
    color: '#FFFFFF',
  },
  qrShare: {
    height: 54.3,
    marginTop: 84.6,
    paddingLeft: 32,
    paddingRight: 30.7,
    borderRadius: 27.2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.3,
    backgroundColor: colors.coralBright,
  },
  qrShareText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15.7,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});
