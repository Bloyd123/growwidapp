import { useId, useMemo } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Defs, Ellipse, LinearGradient, RadialGradient, Rect, Stop } from 'react-native-svg';

import { Avatar } from '@/components/avatar';
import { welcomeDemoCard } from '@/data/mock';
import { colors, fonts } from '@/theme';

import { FieldRow } from './field-row';

// All geometry is in reference-screenshot px and multiplied by `s`.
const OUTER_W = 129;
const OUTER_H = 276;
const INSET = 5.05; // outer border + frame + screen border
const SCREEN_W = OUTER_W - INSET * 2;
const COVER_H = 83;
const ROW_TOP = 151.125;
const ROW_STEP = 19;

const COVER_CORAL = '#E94E3D';
const COVER_SHADE = '#7E3328';

type FrontPhoneProps = { s: number };

// The tilted light phone showing the full digital card.
export function FrontPhone({ s }: FrontPhoneProps) {
  const styles = useMemo(() => createStyles(s), [s]);
  const card = welcomeDemoCard;

  return (
    <View style={styles.phone}>
      <View style={styles.screen}>
        <CardCover width={SCREEN_W * s} height={COVER_H * s} />
        <CompanyWordmark fontSize={9.3 * s} raise={3.8 * s} style={styles.coverWordmark} />

        <View style={styles.badge}>
          <CompanyWordmark fontSize={5.7 * s} raise={2.3 * s} />
        </View>

        <View style={styles.avatar}>
          <Avatar size={34 * s} ringWidth={0.9 * s} />
        </View>

        <Text allowFontScaling={false} style={styles.name}>
          {card.fullName}
        </Text>
        <View style={styles.meta}>
          <Text allowFontScaling={false} style={styles.metaText}>
            {card.jobTitle}
          </Text>
          <Text allowFontScaling={false} style={styles.metaText}>
            {card.company}
          </Text>
        </View>

        {card.fields.map((field, i) => (
          <FieldRow
            key={field.icon}
            field={field}
            iconSize={13.25 * s}
            gap={5.5 * s}
            fontSize={5.3 * s}
            lineHeight={8 * s}
            color="#3A3533"
            style={[styles.row, { top: (ROW_TOP + ROW_STEP * i) * s }]}
          />
        ))}
      </View>
    </View>
  );
}

// Blurred-photo look: coral base with soft dark blobs.
function CardCover({ width, height }: { width: number; height: number }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${SCREEN_W} ${COVER_H}`}
      preserveAspectRatio="none"
      style={StyleSheet.absoluteFill}>
      <Defs>
        <RadialGradient id={`${id}blob`}>
          <Stop offset="0" stopColor={COVER_SHADE} stopOpacity={0.8} />
          <Stop offset="0.6" stopColor="#97392C" stopOpacity={0.55} />
          <Stop offset="1" stopColor={COVER_CORAL} stopOpacity={0} />
        </RadialGradient>
        <LinearGradient id={`${id}top`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#8A3A2D" stopOpacity={0.55} />
          <Stop offset="1" stopColor={COVER_CORAL} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={SCREEN_W} height={COVER_H} fill={COVER_CORAL} />
      <Ellipse cx={86} cy={28} rx={54} ry={46} fill={`url(#${id}blob)`} />
      <Ellipse cx={100} cy={90} rx={56} ry={36} fill={`url(#${id}blob)`} opacity={0.85} />
      <Rect x={0} y={0} width={SCREEN_W} height={24} fill={`url(#${id}top)`} />
    </Svg>
  );
}

type CompanyWordmarkProps = {
  fontSize: number;
  raise: number;
  style?: StyleProp<ViewStyle>;
};

// "NINE" with a raised "FOLD", as on the reference card.
function CompanyWordmark({ fontSize, raise, style }: CompanyWordmarkProps) {
  const text = {
    fontFamily: fonts.sans,
    fontSize,
    lineHeight: fontSize * 1.2,
    letterSpacing: fontSize * 0.02,
    color: '#2B1611',
    includeFontPadding: false,
  } as const;
  return (
    <View style={[wordmarkStyles.row, style]}>
      <Text allowFontScaling={false} style={[text, { marginTop: raise }]}>
        NINE
      </Text>
      <Text allowFontScaling={false} style={[text, { marginLeft: fontSize * 0.13 }]}>
        FOLD
      </Text>
    </View>
  );
}

const wordmarkStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

function createStyles(s: number) {
  return StyleSheet.create({
    phone: {
      position: 'absolute',
      left: 80.8 * s,
      top: 14.5 * s,
      width: OUTER_W * s,
      height: OUTER_H * s,
      padding: 3.5 * s,
      borderRadius: 17 * s,
      borderWidth: 0.8 * s,
      borderColor: '#E7E1D9',
      backgroundColor: '#FEFBF8',
      transform: [{ rotate: '-21deg' }],
    },
    screen: {
      flex: 1,
      borderRadius: 13 * s,
      borderWidth: 0.75 * s,
      borderColor: '#EAE6E0',
      backgroundColor: colors.background,
      overflow: 'hidden',
    },
    coverWordmark: {
      position: 'absolute',
      top: 37.5 * s,
      left: 0,
      right: 0,
      justifyContent: 'center',
    },
    badge: {
      position: 'absolute',
      left: 72 * s,
      top: 69.25 * s,
      width: 43 * s,
      height: 23.5 * s,
      borderRadius: 1.5 * s,
      borderWidth: 0.6 * s,
      borderColor: 'rgba(255,255,255,0.75)',
      backgroundColor: colors.coral,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatar: {
      position: 'absolute',
      left: 4.5 * s,
      top: 63.25 * s,
    },
    name: {
      position: 'absolute',
      left: 4.5 * s,
      top: 102 * s,
      fontFamily: fonts.sansSemiBold,
      fontSize: 8.6 * s,
      lineHeight: 11 * s,
      color: '#2D2727',
      includeFontPadding: false,
    },
    meta: {
      position: 'absolute',
      left: 4.5 * s,
      top: 117.5 * s,
    },
    metaText: {
      fontFamily: fonts.sans,
      fontSize: 5.5 * s,
      lineHeight: 8.5 * s,
      color: '#48423F',
      includeFontPadding: false,
    },
    row: {
      position: 'absolute',
      left: 3.75 * s,
      right: 3 * s,
    },
  });
}
