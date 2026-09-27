import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { FieldIcon, Icon, PersonPlaceholder, type IconName } from '@/components/icons';
import { Overlay } from '@/components/overlay';
import { fonts } from '@/theme';

type ShareIntroSheetProps = {
  visible: boolean;
  onGotIt: () => void;
  onClose: () => void;
};

// First tap on Share: explains the offline card before Send Your Card opens.
export function ShareIntroSheet({ visible, onGotIt, onClose }: ShareIntroSheetProps) {
  const insets = useSafeAreaInsets();
  return (
    <Overlay visible={visible} onRequestClose={onClose}>
      <View style={styles.root}>
        <Pressable accessibilityLabel="Close" style={StyleSheet.absoluteFill} onPress={onClose}>
          <Animated.View entering={FadeIn.duration(200)} style={styles.scrim} />
        </Pressable>
        <Animated.View entering={SlideInDown.duration(280)} style={[styles.sheet, { paddingBottom: insets.bottom + 31.5 }]}>
          <Pressable accessibilityRole="button" accessibilityLabel="Close" hitSlop={12} onPress={onClose} style={styles.close}>
            <Icon name="close" size={24.2} color="#000000" />
          </Pressable>

          <View style={styles.panel}>
            <Chip label="Online card" icon="wifi" tile="#6BB8E4" left={53.2} width={105.4} />
            <Chip label="Offline card" icon="wifiOff" tile="#8C8C8C" left={233.6} width={106.8} />
            <OnlineCard />
            <OfflineCardPreview />
          </View>

          <Text style={styles.heading}>Share your card with low internet</Text>
          <Text style={styles.body}>
            Your offline card shares your{' '}
            <Text style={styles.bold}>name, job title, company name, email, phone, and Groowid card link</Text> — saved
            straight to their contacts, no internet needed.
          </Text>

          <Button title="Got it" height={57.3} onPress={onGotIt} style={styles.gotIt} />
          <Button title="Preview offline card" variant="secondary" height={56.1} style={styles.preview} />
        </Animated.View>
      </View>
    </Overlay>
  );
}

function Chip({ label, icon, tile, left, width }: { label: string; icon: IconName; tile: string; left: number; width: number }) {
  return (
    <View style={[styles.chip, { left, width }]}>
      <View style={[styles.chipTile, { backgroundColor: tile }]}>
        <Icon name={icon} size={12.5} color="#1A1A1A" />
      </View>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

const SAMPLE_ROWS: { icon: 'phone' | 'mail' | 'web'; text: string }[] = [
  { icon: 'phone', text: '(707) 555-0148' },
  { icon: 'mail', text: 'blake.h@emberandvine.com' },
  { icon: 'web', text: 'emberandvine.com' },
];

// Mini digital card with a cover, photo, name and contact rows.
function OnlineCard() {
  return (
    <View style={styles.onlineCard}>
      <LinearGradient
        colors={['#F3E2D4', '#F08A4B', '#F4A36A', '#F6DCC8']}
        locations={[0, 0.35, 0.7, 1]}
        start={{ x: 0, y: 0.6 }}
        end={{ x: 1, y: 0.2 }}
        style={styles.cover}
      />
      <View style={styles.photo}>
        <PersonPlaceholder width={40} color="#3B2A22" />
      </View>
      <Text style={styles.onlineName}>Blake Harrison</Text>
      <Text style={styles.onlineMeta}>{'Chief Growth Officer\nEmber & Vine'}</Text>
      {SAMPLE_ROWS.map((row, i) => (
        <View key={row.text} style={[styles.onlineRow, { top: 153 + i * 21.2 }]}>
          <View style={styles.onlineDot}>
            <FieldIcon name={row.icon} size={7.5} color="#FFFFFF" />
          </View>
          <Text style={styles.onlineRowText}>{row.text}</Text>
        </View>
      ))}
    </View>
  );
}

const ACTION_INK = '#3A3A3A';

// Mini contact card as it is saved to the other phone without internet.
function OfflineCardPreview() {
  return (
    <View style={styles.offlineCard}>
      <View style={styles.initials}>
        <Text style={styles.initialsText}>BH</Text>
      </View>
      <Text style={styles.offlineMeta}>Chief Growth Office • Ember & Vine</Text>
      <Text style={styles.offlineName}>Blake Harrison</Text>
      <View style={styles.offlineActions}>
        <View style={styles.offlineAction}>
          <Icon name="message" size={10} color={ACTION_INK} />
        </View>
        <View style={styles.offlineAction}>
          <FieldIcon name="phone" size={10} color={ACTION_INK} />
        </View>
        <View style={styles.offlineAction}>
          <Icon name="videocam" size={10} color={ACTION_INK} />
        </View>
        <View style={styles.offlineAction}>
          <Icon name="mail" size={10} color={ACTION_INK} />
        </View>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>mobile</Text>
        <Text style={styles.infoValue}>(707) 555-0148</Text>
        <View style={styles.infoRule} />
        <Text style={styles.infoLabel}>email</Text>
        <Text style={styles.infoValue}>blake.h@emberandvine.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.32)',
  },
  sheet: {
    borderTopLeftRadius: 28.3,
    borderTopRightRadius: 28.3,
    backgroundColor: '#FFFFFF',
  },
  close: {
    alignSelf: 'flex-end',
    marginTop: 28.3,
    marginRight: 28,
  },
  panel: {
    height: 348.3,
    marginTop: 35.7,
    marginHorizontal: 16.5,
    borderRadius: 9.4,
    backgroundColor: '#F1EDE2',
  },
  chip: {
    position: 'absolute',
    top: 45.9,
    height: 30.4,
    borderRadius: 8.3,
    borderWidth: 1.2,
    borderStyle: 'dotted',
    borderColor: '#222222',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5.9,
    backgroundColor: '#FBFAF6',
  },
  chipTile: {
    width: 18.2,
    height: 18.2,
    borderRadius: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    marginLeft: 8.1,
    fontFamily: fonts.uiMedium,
    fontSize: 12,
    color: '#111111',
    includeFontPadding: false,
  },
  onlineCard: {
    position: 'absolute',
    left: 25,
    top: 84.8,
    width: 162.3,
    height: 216.8,
    borderRadius: 11.8,
    overflow: 'hidden',
    borderWidth: 0.8,
    borderColor: '#E4DED3',
    backgroundColor: '#FDFCFB',
  },
  cover: {
    height: 73.8,
  },
  photo: {
    position: 'absolute',
    left: 10.2,
    top: 48.2,
    width: 50.7,
    height: 50.7,
    borderRadius: 25.4,
    borderWidth: 2,
    borderColor: '#F7EFE6',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#E8A57F',
  },
  onlineName: {
    position: 'absolute',
    left: 15.3,
    top: 103,
    fontFamily: fonts.uiSemiBold,
    fontSize: 13.4,
    lineHeight: 18,
    color: '#1A1A1A',
  },
  onlineMeta: {
    position: 'absolute',
    left: 15.3,
    top: 123.4,
    fontFamily: fonts.ui,
    fontSize: 8.3,
    lineHeight: 9.1,
    color: '#9A9A9A',
  },
  onlineRow: {
    position: 'absolute',
    left: 14.7,
    height: 13.4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 13.4,
    height: 13.4,
    borderRadius: 6.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0705E',
  },
  onlineRowText: {
    marginLeft: 4.4,
    fontFamily: fonts.uiMedium,
    fontSize: 9.3,
    color: '#222222',
    includeFontPadding: false,
  },
  offlineCard: {
    position: 'absolute',
    left: 205.4,
    top: 84.8,
    width: 163.2,
    height: 217.4,
    borderRadius: 11.8,
    alignItems: 'center',
    backgroundColor: '#BDBDBD',
  },
  initials: {
    marginTop: 12.1,
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1.8,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
  },
  initialsText: {
    fontFamily: fonts.uiMedium,
    fontSize: 25,
    color: '#111111',
    includeFontPadding: false,
  },
  offlineMeta: {
    marginTop: 7.5,
    fontFamily: fonts.ui,
    fontSize: 7.6,
    lineHeight: 10,
    color: '#1A1A1A',
  },
  offlineName: {
    marginTop: 0.5,
    fontFamily: fonts.uiMedium,
    fontSize: 13.8,
    lineHeight: 18,
    color: '#111111',
  },
  offlineActions: {
    marginTop: 9.5,
    flexDirection: 'row',
    gap: 7.5,
  },
  offlineAction: {
    width: 19.3,
    height: 19.3,
    borderRadius: 9.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDEDED',
  },
  infoBox: {
    position: 'absolute',
    left: 15.6,
    top: 141.7,
    width: 131.5,
    height: 63.6,
    paddingHorizontal: 5,
    paddingTop: 5,
    borderRadius: 5.9,
    backgroundColor: '#F5F5F5',
  },
  infoLabel: {
    fontFamily: fonts.ui,
    fontSize: 7.2,
    lineHeight: 9,
    color: '#6B6B6B',
  },
  infoValue: {
    fontFamily: fonts.uiMedium,
    fontSize: 9.3,
    lineHeight: 13,
    color: '#111111',
  },
  infoRule: {
    height: 0.8,
    marginVertical: 3.8,
    backgroundColor: '#DDDDDD',
  },
  heading: {
    marginTop: 22.9,
    textAlign: 'center',
    fontFamily: fonts.uiSemiBold,
    fontSize: 23.9,
    lineHeight: 30,
    color: '#000000',
  },
  body: {
    marginTop: 6.5,
    paddingHorizontal: 16.5,
    textAlign: 'center',
    fontFamily: fonts.ui,
    fontSize: 15.5,
    lineHeight: 24.2,
    color: '#3A3A3A',
  },
  bold: {
    fontFamily: fonts.uiSemiBold,
    color: '#1A1A1A',
  },
  gotIt: {
    marginTop: 23.2,
    marginHorizontal: 15.3,
  },
  preview: {
    marginTop: 7.7,
    marginHorizontal: 15.9,
  },
});
