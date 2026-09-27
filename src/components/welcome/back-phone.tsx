import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { welcomeDemoCard } from '@/data/mock';
import { fonts } from '@/theme';

import { FieldRow } from './field-row';

// All geometry is in reference-screenshot px and multiplied by `s`.
const ROW_TOP = 167;
const ROW_STEP = 14;
const TAB_COUNT = 4;

type BackPhoneProps = { s: number };

// The upright dark-bezel phone behind the tilted card; the bottom panel cuts it off.
export function BackPhone({ s }: BackPhoneProps) {
  const styles = useMemo(() => createStyles(s), [s]);
  const card = welcomeDemoCard;

  return (
    <View style={styles.phone}>
      <View style={styles.cover} />
      <View style={styles.avatar}>
        <Avatar size={30 * s} ringWidth={0.8 * s} />
      </View>

      <Text allowFontScaling={false} numberOfLines={1} style={styles.name}>
        {card.fullName}
      </Text>
      <View style={styles.meta}>
        <Text allowFontScaling={false} numberOfLines={1} style={styles.metaText}>
          {card.jobTitle}
        </Text>
        <Text allowFontScaling={false} numberOfLines={1} style={styles.metaText}>
          {card.company}
        </Text>
      </View>

      {card.fields.slice(0, 4).map((field, i) => (
        <FieldRow
          key={field.icon}
          field={field}
          iconSize={9 * s}
          gap={3 * s}
          fontSize={5.5 * s}
          lineHeight={7 * s}
          color="#3A3533"
          style={[styles.row, { top: (ROW_TOP + ROW_STEP * i) * s }]}
        />
      ))}

      <View style={styles.tabBar}>
        {Array.from({ length: TAB_COUNT }, (_, i) => (
          <View key={i} style={[styles.tabIcon, i === 0 && styles.tabIconActive]} />
        ))}
      </View>
    </View>
  );
}

function createStyles(s: number) {
  return StyleSheet.create({
    phone: {
      position: 'absolute',
      left: 48 * s,
      top: 85 * s,
      width: 132 * s,
      height: 240 * s,
      borderRadius: 16 * s,
      borderWidth: 2.5 * s,
      borderColor: '#221816',
      backgroundColor: '#FFFCF8',
      overflow: 'hidden',
    },
    cover: {
      position: 'absolute',
      left: 10.5 * s,
      top: 54.5 * s,
      width: 106 * s,
      height: 63 * s,
      borderTopLeftRadius: 7 * s,
      borderTopRightRadius: 7 * s,
      backgroundColor: '#F05040',
    },
    avatar: {
      position: 'absolute',
      left: 17 * s,
      top: 103.5 * s,
    },
    name: {
      position: 'absolute',
      left: 17.5 * s,
      top: 135 * s,
      fontFamily: fonts.sansSemiBold,
      fontSize: 8.2 * s,
      lineHeight: 11 * s,
      color: '#2E2725',
      includeFontPadding: false,
    },
    meta: {
      position: 'absolute',
      left: 17.5 * s,
      top: 148.5 * s,
    },
    metaText: {
      fontFamily: fonts.sans,
      fontSize: 5 * s,
      lineHeight: 6 * s,
      color: '#A09A96',
      includeFontPadding: false,
    },
    row: {
      position: 'absolute',
      left: 17.5 * s,
      right: 4 * s,
    },
    tabBar: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 211.5 * s,
      height: 28 * s,
      paddingTop: 3.5 * s,
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderTopWidth: 0.5 * s,
      borderTopColor: '#EEE8E2',
      backgroundColor: '#FFFCF8',
    },
    tabIcon: {
      width: 5 * s,
      height: 4 * s,
      borderRadius: 1 * s,
      backgroundColor: '#C9C3BF',
    },
    tabIconActive: {
      backgroundColor: '#2E2725',
    },
  });
}
