import { LinearGradient } from 'expo-linear-gradient';
import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { FieldIcon } from '@/components/icons';
import { LogoView } from '@/components/logo-tile';
import { fieldType } from '@/data/field-types';
import type { Card, Entry } from '@/state/profile';
import { colors, fonts } from '@/theme';

// Cards take 88% of the screen width so the neighbouring cards peek in at the sides.
const CARD_WIDTH_FRACTION = 0.88;
const COVER_HEIGHT = 218.9;
// Card without a logo or cover photo shows a band of the card colour.
const COLOR_BAND_HEIGHT = 86.1;
const PHOTO_SIZE = 89.7;

export function displayName(card: Card) {
  const { prefix, suffix } = card.extras;
  return [prefix, card.firstName, card.middleName, card.lastName, suffix].filter(Boolean).join(' ');
}

// Text shown for a field on the card: its title (e.g. "Visit our website") or the raw value.
export function entryText(entry: Entry) {
  return fieldType(entry.type).titleField === 'title' && entry.title ? entry.title : entry.value;
}

export function useCardWidth() {
  const { width } = useWindowDimensions();
  return Math.round(width * CARD_WIDTH_FRACTION);
}

type ProfileCardProps = {
  card: Card;
  width: number;
  height: number;
  // Space left under the last row so it can scroll clear of the Share button and tab bar.
  bottomInset: number;
};

// The user's digital card as shown on the My Card screen. The card stays in place; a long card
// scrolls inside its own frame.
export function ProfileCard({ card, width, height, bottomInset }: ProfileCardProps) {
  const hasCover = Boolean(card.coverUri || card.logo);

  return (
    <View style={[styles.card, { width, height }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: bottomInset }}>
        {card.coverUri ? (
          <Image source={{ uri: card.coverUri }} style={styles.coverImage} />
        ) : hasCover ? (
          <View style={styles.cover}>{card.logo ? <LogoView logo={card.logo} size={113.3} /> : null}</View>
        ) : (
          <View style={[styles.colorBand, { backgroundColor: card.color }]} />
        )}
        {hasCover ? (
          <>
            <View style={styles.coverEdge} />
            <LinearGradient colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0)']} style={styles.coverShade} />
          </>
        ) : null}

        {card.photoUri ? (
          <Image source={{ uri: card.photoUri }} style={[styles.photo, { marginTop: -PHOTO_SIZE / 2 }]} />
        ) : null}

        <View style={[styles.body, !hasCover && styles.bodyAfterBand]}>
          <Text style={styles.name}>{displayName(card)}</Text>
          {card.jobTitle ? <Text style={styles.meta}>{card.jobTitle}</Text> : null}
          {card.department ? <Text style={styles.meta}>{card.department}</Text> : null}
          {card.company ? <Text style={styles.meta}>{card.company}</Text> : null}
          {card.headline ? <Text style={styles.headline}>{card.headline}</Text> : null}

          <View style={styles.rows}>
            {card.entries.map((entry) => (
              <View key={entry.id} style={styles.row}>
                <View style={[styles.dot, { backgroundColor: card.color }]}>
                  <FieldIcon name={fieldType(entry.type).icon} size={18.9} color="#FFFFFF" />
                </View>
                <Text style={styles.rowText} numberOfLines={1}>
                  {entryText(entry)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderTopLeftRadius: 18.9,
    borderTopRightRadius: 18.9,
    overflow: 'hidden',
    backgroundColor: colors.background,
    boxShadow: '0 2px 22px rgba(0,0,0,0.16)',
  },
  cover: {
    height: COVER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImage: {
    width: '100%',
    height: COVER_HEIGHT,
  },
  colorBand: {
    height: COLOR_BAND_HEIGHT,
  },
  coverEdge: {
    height: 1.2,
    backgroundColor: '#EFEFEF',
  },
  coverShade: {
    height: 8.3,
  },
  photo: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE / 2,
    borderWidth: 3,
    borderColor: colors.background,
    marginLeft: 20.1,
  },
  body: {
    paddingHorizontal: 21.8,
    marginTop: 5.3,
  },
  bodyAfterBand: {
    marginTop: 24.8,
  },
  name: {
    marginBottom: 4,
    fontFamily: fonts.uiSemiBold,
    fontSize: 21.2,
    lineHeight: 28.3,
    color: '#000000',
  },
  meta: {
    fontFamily: fonts.uiMedium,
    fontSize: 14.2,
    lineHeight: 22.4,
    color: '#000000',
  },
  headline: {
    marginTop: 7.1,
    fontFamily: fonts.ui,
    fontSize: 14.2,
    lineHeight: 20.1,
    color: colors.muted,
  },
  rows: {
    marginTop: 21,
    gap: 13,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -1.8,
  },
  dot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
    marginLeft: 11.2,
    fontFamily: fonts.uiSemiBold,
    fontSize: 13.6,
    color: '#000000',
  },
});
