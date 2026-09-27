import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { Icon } from '@/components/icons';
import { fonts } from '@/theme';

const STAR = (cx: number, cy: number, r: number) => {
  const k = r * 0.18;
  return `M${cx} ${cy - r}C${cx + k} ${cy - k} ${cx + k} ${cy - k} ${cx + r} ${cy}C${cx + k} ${cy + k} ${cx + k} ${cy + k} ${cx} ${cy + r}C${cx - k} ${cy + k} ${cx - k} ${cy + k} ${cx - r} ${cy}C${cx - k} ${cy - k} ${cx - k} ${cy - k} ${cx} ${cy - r}Z`;
};

// Summary tab icon: a purple-magenta sparkle with two small warm ones.
export function SummarySparkle({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <LinearGradient id="noteSparkle" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#7A3CE6" />
          <Stop offset="1" stopColor="#E0339E" />
        </LinearGradient>
      </Defs>
      <Path fill="url(#noteSparkle)" d={STAR(9.5, 13, 9)} />
      <Path fill="#F4705A" d={STAR(19, 5.5, 4)} />
      <Path fill="#E94367" d={STAR(18.5, 19.5, 3.6)} />
    </Svg>
  );
}

// Dashed "👤 Link contacts to this note" pill (visual only).
export function LinkContactsPill({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <Pressable accessibilityRole="button" style={[styles.link, style]}>
      <View style={styles.linkCircle}>
        <Icon name="person" size={17} color="#333333" />
      </View>
      <Text style={styles.linkText}>Link contacts to this note</Text>
    </Pressable>
  );
}

export type NoteTab = 'summary' | 'transcript';

// Summary ✦ / Transcript switch under the note title.
export function NoteTabs({ tab, onChange }: { tab: NoteTab; onChange: (tab: NoteTab) => void }) {
  return (
    <View style={styles.tabs}>
      {(['summary', 'transcript'] as NoteTab[]).map((key) => {
        const on = tab === key;
        const color = on ? '#000000' : '#3A3A3A';
        return (
          <Pressable
            key={key}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(key)}
            style={[styles.tab, on && styles.tabOn]}>
            {key === 'summary' ? <SummarySparkle size={22} /> : <Icon name="chatLines" size={21} color={color} />}
            <Text style={[styles.tabText, { color, marginLeft: key === 'summary' ? 7.5 : 8.6 }]}>
              {key === 'summary' ? 'Summary' : 'Transcript'}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    alignSelf: 'flex-start',
    height: 40.4,
    marginLeft: 15.9,
    paddingLeft: 5,
    paddingRight: 13,
    borderRadius: 20.2,
    borderWidth: 1.2,
    borderStyle: 'dashed',
    borderColor: '#C8C8C8',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  linkCircle: {
    width: 29.5,
    height: 29.5,
    borderRadius: 14.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
  },
  linkText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 13.6,
    color: '#292929',
    includeFontPadding: false,
  },
  tabs: {
    height: 54.9,
    marginHorizontal: 16.5,
    padding: 4,
    borderRadius: 14,
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
  },
  tab: {
    flex: 1,
    borderRadius: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabOn: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  tabText: {
    fontFamily: fonts.uiMedium,
    fontSize: 15.9,
    includeFontPadding: false,
  },
});
