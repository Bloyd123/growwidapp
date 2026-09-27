import { Pressable, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Icon } from '@/components/icons';
import { PremiumBadge } from '@/components/premium-badge';
import { Toggle } from '@/components/toggle';
import type { Card } from '@/state/profile';
import { fonts } from '@/theme';

import { Section, SectionGap } from './section';

type QrSettingsProps = {
  card: Card;
  qrValue: string;
  onChange: (patch: Partial<Card>) => void;
  onDelete?: () => void;
};

// QR code preview, card settings switches and the "Delete card" action.
export function QrSettings({ card, qrValue, onChange, onDelete }: QrSettingsProps) {
  return (
    <View>
      <SectionGap />
      <Section title="QR Code" style={styles.qrSection}>
        <View style={styles.qrBox}>
          <QRCode value={qrValue} size={197.6} quietZone={0} />
        </View>
        <SettingRow
          title="Add logo in QR code"
          premium
          value={card.qrLogo}
          onValueChange={(qrLogo) => onChange({ qrLogo })}
          description="Customize QR code with your logo for better branding"
          style={styles.firstSetting}
        />
      </Section>
      <SectionGap height={13} />
      <Section title="Settings" style={styles.settings}>
        <SettingRow
          title={'Add ‘Where We Met’ detail'}
          value={card.whereWeMet}
          onValueChange={(whereWeMet) => onChange({ whereWeMet })}
          description={'Automatically add the location of where you met\nyour contacts'}
          style={styles.whereWeMet}
        />
        <SettingRow
          title="Remove Groowid branding"
          premium
          value={card.removeBranding}
          onValueChange={(removeBranding) => onChange({ removeBranding })}
          description={'Remove Groowid Branding when someone exports\nyour contact to their phone'}
          style={styles.branding}
        />
      </Section>
      <View style={styles.deleteArea}>
        <Pressable accessibilityRole="button" onPress={onDelete} style={styles.delete}>
          <Icon name="trash" size={26} color="#D93A36" />
          <Text style={styles.deleteText}>Delete card</Text>
        </Pressable>
      </View>
    </View>
  );
}

type SettingRowProps = {
  title: string;
  premium?: boolean;
  value: boolean;
  onValueChange: (value: boolean) => void;
  description: string;
  style?: object;
};

function SettingRow({ title, premium, value, onValueChange, description, style }: SettingRowProps) {
  return (
    <View style={[styles.setting, style]}>
      <View style={styles.settingHead}>
        <Text style={styles.settingTitle}>{title}</Text>
        {premium ? <PremiumBadge /> : null}
        <View style={styles.flex} />
        <Toggle value={value} onValueChange={onValueChange} accessibilityLabel={title} />
      </View>
      <Text style={styles.settingText}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  qrSection: {
    paddingBottom: 41.3,
  },
  qrBox: {
    marginTop: 33.6,
    marginHorizontal: 15.9,
    height: 260.8,
    borderRadius: 14.2,
    borderWidth: 1,
    borderColor: '#DADADA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setting: {
    paddingLeft: 16.5,
    paddingRight: 21.8,
  },
  firstSetting: {
    marginTop: 31.9,
  },
  settings: {
    paddingTop: 20.7,
    paddingBottom: 38.9,
  },
  whereWeMet: {
    marginTop: 29.5,
  },
  branding: {
    marginTop: 19.5,
  },
  settingHead: {
    height: 26,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11.8,
  },
  flex: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: fonts.uiMedium,
    fontSize: 18.1,
    color: '#000000',
  },
  settingText: {
    marginTop: 7.1,
    fontFamily: fonts.ui,
    fontSize: 13.6,
    lineHeight: 20.7,
    color: '#5F5F5F',
  },
  deleteArea: {
    paddingTop: 28.3,
    paddingBottom: 153.4,
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },
  delete: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14.2,
  },
  deleteText: {
    fontFamily: fonts.uiMedium,
    fontSize: 18.4,
    color: '#D93A36',
  },
});
