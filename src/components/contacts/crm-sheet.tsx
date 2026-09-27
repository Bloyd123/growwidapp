import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { HubSpotMark, SalesforceMark, ZapierMark } from '@/components/brand-icons';
import { Button } from '@/components/button';
import { Icon, PersonPlaceholder } from '@/components/icons';
import { PlainSheet } from '@/components/plain-sheet';
import { fonts } from '@/theme';

const PANEL_HEIGHT = 319.9;

const PEOPLE = [
  { name: 'Liam Carter', meta: 'portalhub.com | Business Manager', tint: '#C9A7F5', top: 89.7 },
  { name: 'Sophia Williams', meta: 'sample.org | Senior Operations Director', tint: '#A9D4F5', top: 145.8 },
  { name: 'Oliver Brown', meta: 'sample.org | Senior Operations Director', tint: '#F5C9A7', top: 201.9, time: '21:00' },
  { name: 'Mia Thompson', meta: 'portalhub.com | Business Manager', tint: '#A7E3C4', top: 258, time: '21:00' },
  { name: 'Ethan Clark', meta: 'sample.org | Sales Lead', tint: '#F5A7C9', top: 314 },
];

const EXPORTS: { label: string; mark: ReactNode }[] = [
  { label: 'Export to Hubspot', mark: <HubSpotMark size={17} /> },
  { label: 'Export to Salesforce', mark: <SalesforceMark size={17} /> },
  { label: 'Export to Zapier', mark: <ZapierMark size={17} /> },
];

// Export icon on Contacts: "Sync contacts into your CRM in seconds".
export function CrmSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    <PlainSheet visible={visible} onClose={onClose} bottomGap={23.5} style={styles.sheet}>
      <View style={styles.panel}>
        <GhostCard top={120} />
        <GhostCard top={170} />
        <View style={styles.phone}>
          <Text style={styles.clock}>9:41</Text>
          <View style={styles.statusIcons}>
            <View style={[styles.bar, { height: 3 }]} />
            <View style={[styles.bar, { height: 4.5 }]} />
            <View style={[styles.bar, { height: 6 }]} />
            <View style={[styles.bar, { height: 7.5 }]} />
            <View style={styles.battery} />
          </View>
        </View>
        {PEOPLE.map((p) => (
          <View key={p.name} style={[styles.person, { top: p.top }]}>
            <Avatar tint={p.tint} size={33.6} />
            <View style={styles.personText}>
              <Text style={styles.personName} numberOfLines={1}>
                {p.name}
              </Text>
              <Text style={styles.personMeta} numberOfLines={1}>
                {p.meta}
              </Text>
            </View>
            {p.time ? <Text style={styles.time}>{p.time}</Text> : null}
          </View>
        ))}

        <View style={styles.detail}>
          <View style={styles.detailHead}>
            <Avatar tint="#C9A7F5" size={21} />
            <View style={styles.detailHeadText}>
              <Text style={styles.detailName}>Liam Carter</Text>
              <Text style={styles.detailMeta} numberOfLines={1}>
                sample.org | Senior Operations Director
              </Text>
            </View>
          </View>
          <View style={styles.detailRule} />
          <Text style={styles.detailMeta}>Date and Time</Text>
          <Text style={styles.detailValue}>April 20 2025 | 2:00pm</Text>
          <View style={styles.detailRule} />
          <View style={styles.detailTags}>
            <Text style={styles.detailTag}>Business</Text>
            <Text style={styles.detailTag}>Corporate</Text>
          </View>
          <View style={styles.detailRule} />
          <Text style={styles.detailMeta}>Add Notes</Text>
        </View>

        <View style={styles.exports}>
          {EXPORTS.map((e, i) => (
            <View key={e.label} style={[styles.exportRow, i === 1 && styles.exportRowShaded]}>
              {e.mark}
              <Text style={styles.exportText}>{e.label}</Text>
            </View>
          ))}
        </View>

        <Pressable accessibilityRole="button" accessibilityLabel="Close" hitSlop={12} onPress={onClose} style={styles.close}>
          <Icon name="close" size={24} color="#000000" />
        </Pressable>
      </View>

      <Text style={styles.heading}>{'Sync contacts into\nyour CRM in seconds'}</Text>
      <Text style={styles.body}>
        Let your CRM populate itself with every new person your team connects with, automatically.
      </Text>
      <Button title="Learn more" height={56.7} onPress={onClose} style={styles.button} />
    </PlainSheet>
  );
}

function Avatar({ tint, size }: { tint: string; size: number }) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: tint }]}>
      <PersonPlaceholder width={size * 0.72} color="rgba(255,255,255,0.9)" />
    </View>
  );
}

// Faded contact card peeking out behind the phone.
function GhostCard({ top }: { top: number }) {
  return (
    <View style={[styles.ghost, { top }]}>
      <View style={styles.ghostDot} />
      <View style={styles.ghostLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    overflow: 'hidden',
  },
  panel: {
    height: PANEL_HEIGHT,
    overflow: 'hidden',
    backgroundColor: '#F1E7F2',
  },
  phone: {
    position: 'absolute',
    left: 101.5,
    top: 41.3,
    width: 217.3,
    height: 330,
    borderRadius: 35,
    borderWidth: 4.7,
    borderColor: '#221820',
    backgroundColor: '#F2F2F2',
  },
  clock: {
    position: 'absolute',
    left: 30,
    top: 14,
    fontFamily: fonts.uiSemiBold,
    fontSize: 9.4,
    color: '#000000',
  },
  statusIcons: {
    position: 'absolute',
    right: 22,
    top: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 1.4,
  },
  bar: {
    width: 2,
    borderRadius: 0.5,
    backgroundColor: '#000000',
  },
  battery: {
    width: 13,
    height: 6.5,
    marginLeft: 6,
    borderRadius: 1.8,
    backgroundColor: '#000000',
  },
  person: {
    position: 'absolute',
    left: 112.2,
    width: 195.9,
    height: 49,
    borderRadius: 12,
    paddingLeft: 7,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  personText: {
    flex: 1,
    marginLeft: 6.5,
  },
  personName: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 10.4,
    color: '#111111',
  },
  personMeta: {
    marginTop: 1,
    fontFamily: fonts.ui,
    fontSize: 6.3,
    color: '#5E5E5E',
  },
  time: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontFamily: fonts.ui,
    fontSize: 6.3,
    color: '#5E5E5E',
  },
  avatar: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  detail: {
    position: 'absolute',
    left: 224.3,
    top: 76.1,
    width: 142.3,
    height: 112.8,
    paddingHorizontal: 7,
    paddingTop: 7,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 8px rgba(80,40,90,0.12)',
  },
  detailHead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailHeadText: {
    flex: 1,
    marginLeft: 5.6,
  },
  detailName: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 8.6,
    color: '#111111',
  },
  detailMeta: {
    fontFamily: fonts.ui,
    fontSize: 5.3,
    color: '#5E5E5E',
  },
  detailValue: {
    marginTop: 2,
    fontFamily: fonts.uiMedium,
    fontSize: 7.2,
    color: '#111111',
  },
  detailRule: {
    height: 0.6,
    marginVertical: 5.5,
    backgroundColor: '#EEEEEE',
  },
  detailTags: {
    flexDirection: 'row',
    gap: 4,
  },
  detailTag: {
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    borderRadius: 2.5,
    borderWidth: 0.6,
    borderColor: '#F0B98C',
    backgroundColor: '#FFF2E5',
    fontFamily: fonts.uiMedium,
    fontSize: 5.3,
    color: '#7A3E12',
    overflow: 'hidden',
  },
  exports: {
    position: 'absolute',
    left: 40.7,
    top: 196,
    width: 124.6,
    borderRadius: 7,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 8px rgba(80,40,90,0.12)',
  },
  exportRow: {
    height: 26.2,
    paddingLeft: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7.7,
  },
  exportRowShaded: {
    backgroundColor: '#F3F3F3',
  },
  exportText: {
    fontFamily: fonts.uiMedium,
    fontSize: 7.6,
    color: '#1A1A1A',
  },
  ghost: {
    position: 'absolute',
    left: 50,
    width: 80,
    height: 30,
    borderRadius: 8,
    paddingLeft: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  ghostDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(200,180,210,0.45)',
  },
  ghostLine: {
    width: 32,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(160,140,170,0.35)',
  },
  close: {
    position: 'absolute',
    right: 16.3,
    top: 16.3,
  },
  heading: {
    marginTop: 38,
    textAlign: 'center',
    fontFamily: fonts.uiSemiBold,
    fontSize: 23.5,
    lineHeight: 32.5,
    color: '#000000',
  },
  body: {
    marginTop: 5.1,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontFamily: fonts.ui,
    fontSize: 15.6,
    lineHeight: 24.8,
    color: '#1A1A1A',
  },
  button: {
    marginTop: 46.5,
    marginHorizontal: 15.9,
  },
});
