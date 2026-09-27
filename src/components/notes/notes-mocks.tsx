import type { ReactNode } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Icon } from '@/components/icons';
import { colors, fonts } from '@/theme';

const MOCK_BG = '#FCFAF4';
const MOCK_SHADOW = '#C75241';
const MOCK_INK = '#1A1410';

// Sample people in the illustrations (initials instead of photos).
const PEOPLE = [
  { initials: 'TC', name: 'Tom Caldwell', color: '#6E9FAE' },
  { initials: 'SJ', name: 'Sophie Jones', color: '#E7A2D3' },
  { initials: 'SR', name: 'Steven Rice', color: '#D67A63' },
];

// Four-point sparkle.
export function FourStar({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path fill={color} d="M12 1c.8 6.5 4.5 10.2 11 11-6.5.8-10.2 4.5-11 11-.8-6.5-4.5-10.2-11-11 6.5-.8 10.2-4.5 11-11z" />
    </Svg>
  );
}

// Phone-screen card with the darker coral block offset behind it; the stage clips the bottom.
function MockCard({ left, top, width, border, children }: { left: number; top: number; width: number; border?: boolean; children: ReactNode }) {
  return (
    <>
      <View style={[styles.cardShadow, { left: left + 12.4, top: top + 16, width }]} />
      <View style={[styles.card, border && styles.cardBorder, { left, top, width }]}>{children}</View>
    </>
  );
}

// AI Notetaker tab before the first note: coral stage with a Summary / Transcript note mock.
export function HeroStage({ height, topInset }: { height: number; topInset: number }) {
  const { width } = useWindowDimensions();
  const cardWidth = 304.8;
  return (
    <View style={[styles.stage, { height }]}>
      <MockCard left={(width - cardWidth) / 2} top={topInset + 74.3} width={cardWidth} border>
        <View style={styles.segment}>
          <View style={[styles.segmentPill, { left: 128 }]} />
          <View style={styles.segmentHalf}>
            <SummaryStars />
            <Text style={styles.segmentText}>Summary</Text>
          </View>
          <View style={styles.segmentHalf}>
            <Icon name="chat" size={18.6} color={MOCK_INK} />
            <Text style={styles.segmentText}>Transcript</Text>
          </View>
        </View>

        <Text style={[styles.mockHeading, { top: 93.4 }]}>Contacts</Text>
        {PEOPLE.map((p, i) => (
          <View key={p.name} style={[styles.person, { left: 28 + i * 67.6 - 7 }]}>
            <View style={[styles.avatar, { backgroundColor: p.color }]}>
              <Text style={styles.avatarText}>{p.initials}</Text>
            </View>
            <Text style={styles.personName}>{p.name}</Text>
          </View>
        ))}
        <View style={[styles.star, { left: 28 + 46.4 - 7.35, top: 127.2 + 2.5 - 7.35 }]}>
          <FourStar size={14.7} color={colors.coralBright} />
        </View>
        <View style={[styles.star, { left: 28 + 55.5 - 3.25, top: 127.2 + 10 - 3.25 }]}>
          <FourStar size={6.5} color={colors.coralBright} />
        </View>
        <Text style={[styles.mockHeading, { top: 217.9 }]}>Overview</Text>
      </MockCard>
    </View>
  );
}

function SummaryStars() {
  return (
    <View style={styles.summaryStars}>
      <FourStar size={12.5} color={colors.coralBright} />
      <View style={styles.summaryStarSmall}>
        <FourStar size={6.4} color={colors.coralBright} />
      </View>
    </View>
  );
}

// ⓘ sheet: a note being recorded, with a transcript line from the speaker on the left.
export function RecordingStage({ height }: { height: number }) {
  return (
    <View style={[styles.stage, { height }]}>
      <MockCard left={67.7} top={113.3} width={290.4}>
        <View style={styles.controls}>
          <View style={styles.controlPause}>
            <Icon name="pause" size={15} color={MOCK_INK} />
            <Text style={styles.controlPauseText}>Pause</Text>
          </View>
          <View style={styles.wave}>
            <View style={[styles.waveDot, { height: 11 }]} />
            <View style={[styles.waveDot, { height: 22 }]} />
            <View style={[styles.waveDot, { height: 11 }]} />
          </View>
          <View style={styles.controlEnd}>
            <Icon name="stop" size={14.5} color="#FFFFFF" />
            <Text style={styles.controlEndText}>End</Text>
          </View>
        </View>
        <Text style={styles.transcript}>{'Yeah, I’ve been living in\nBoston for as long as I can\nremember.'}</Text>
      </MockCard>

      <View style={styles.speaker}>
        <Text style={styles.speakerText}>TC</Text>
      </View>
      <Svg style={styles.pointer} width={16} height={16} viewBox="0 0 16 16">
        <Path fill="#000000" d="M1 3.2 14.6.6 11.9 14.4z" />
      </Svg>
    </View>
  );
}

// Headline under the coral stage (tab hero and ⓘ sheet).
export function HeroCopy({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View style={style}>
      <Text style={styles.heroTitle}>{'Turn conversations into\nAI Notes'}</Text>
      <Text style={styles.heroBody}>{'Capture insights from meetings, networking, or quick\nthoughts, linked to your contacts.'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heroTitle: {
    textAlign: 'center',
    fontFamily: fonts.uiSemiBold,
    fontSize: 27.7,
    lineHeight: 36.6,
    color: '#000000',
  },
  heroBody: {
    marginTop: 9.9,
    textAlign: 'center',
    fontFamily: fonts.ui,
    fontSize: 15.6,
    lineHeight: 24.8,
    color: '#333333',
  },
  stage: {
    overflow: 'hidden',
    backgroundColor: colors.coralBright,
  },
  cardShadow: {
    position: 'absolute',
    height: 1000,
    borderRadius: 18,
    backgroundColor: MOCK_SHADOW,
  },
  card: {
    position: 'absolute',
    height: 1000,
    borderRadius: 18,
    backgroundColor: MOCK_BG,
  },
  cardBorder: {
    borderWidth: 1,
    borderColor: '#3B2B27',
  },
  segment: {
    position: 'absolute',
    left: 24.8,
    top: 35.7,
    width: 256,
    height: 44.2,
    padding: 3.4,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: '#E7E1D6',
  },
  segmentPill: {
    position: 'absolute',
    top: 3.4,
    width: 124.6,
    height: 37.4,
    borderRadius: 9,
    backgroundColor: MOCK_BG,
  },
  segmentHalf: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6.5,
  },
  segmentText: {
    fontFamily: fonts.uiMedium,
    fontSize: 14,
    color: MOCK_INK,
    includeFontPadding: false,
  },
  summaryStars: {
    width: 15,
    height: 13,
  },
  summaryStarSmall: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  mockHeading: {
    position: 'absolute',
    left: 27.1,
    fontFamily: fonts.uiMedium,
    fontSize: 17.3,
    color: '#3F3C38',
  },
  person: {
    position: 'absolute',
    top: 127.2,
    width: 70,
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 19,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  personName: {
    marginTop: 3.1,
    fontFamily: fonts.ui,
    fontSize: 8.9,
    color: '#9C9893',
  },
  star: {
    position: 'absolute',
  },
  controls: {
    position: 'absolute',
    left: 23.6,
    top: 24.4,
    width: 243.2,
    height: 54.3,
    paddingHorizontal: 5.6,
    borderRadius: 27.2,
    borderWidth: 1,
    borderColor: '#DAD6CF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlPause: {
    width: 82.6,
    height: 41,
    borderRadius: 20.5,
    borderWidth: 1.2,
    borderColor: '#9C9894',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  controlPauseText: {
    fontFamily: fonts.uiMedium,
    fontSize: 13.7,
    color: MOCK_INK,
    includeFontPadding: false,
  },
  wave: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1.7,
  },
  waveDot: {
    width: 6,
    borderRadius: 3,
    backgroundColor: colors.coralBright,
  },
  controlEnd: {
    width: 74,
    height: 41,
    borderRadius: 20.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: colors.ink,
  },
  controlEndText: {
    fontFamily: fonts.uiMedium,
    fontSize: 14,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  transcript: {
    position: 'absolute',
    left: 24.8,
    top: 104.7,
    fontFamily: fonts.ui,
    fontSize: 18.9,
    lineHeight: 24.2,
    color: MOCK_INK,
  },
  speaker: {
    position: 'absolute',
    left: 20.5,
    top: 230.2,
    width: 53.5,
    height: 53.5,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PEOPLE[0].color,
    boxShadow: '0 0 0 1px rgba(0,0,0,0.12)',
  },
  speakerText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 18,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  pointer: {
    position: 'absolute',
    left: 70,
    top: 219,
  },
});
