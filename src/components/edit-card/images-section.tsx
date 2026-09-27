import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { BottomSheet } from '@/components/bottom-sheet';
import { Button } from '@/components/button';
import { Chip } from '@/components/chip';
import { Icon } from '@/components/icons';
import { LogoView } from '@/components/logo-tile';
import { SheetOption } from '@/components/sheet-option';
import { pickFromLibrary, takePhoto } from '@/lib/pick-image';
import type { Card } from '@/state/profile';
import { fonts } from '@/theme';

import { Section } from './section';

type Target = 'photoUri' | 'coverUri';
const SHEET_TITLES: Record<Target, string> = {
  photoUri: 'Add profile picture',
  coverUri: 'Add cover photo',
};

type ImagesSectionProps = {
  card: Card;
  onChange: (patch: Partial<Card>) => void;
};

// Cover preview plus "+ Profile picture" / "+ Cover photo", each opening a pick-or-shoot sheet.
export function ImagesSection({ card, onChange }: ImagesSectionProps) {
  const [sheet, setSheet] = useState<Target | null>(null);

  const choose = async (source: 'library' | 'camera') => {
    const target = sheet;
    if (!target) return;
    const uri = source === 'library' ? await pickFromLibrary() : await takePhoto();
    if (uri) onChange({ [target]: uri });
    setSheet(null);
  };

  const hasImage = Boolean(card.coverUri || card.logo);

  return (
    <Section title="Images & layout" style={styles.section}>
      <View style={[styles.preview, { backgroundColor: hasImage ? '#FFFFFF' : card.color }]}>
        {card.coverUri ? (
          <Image source={{ uri: card.coverUri }} style={StyleSheet.absoluteFill} />
        ) : card.logo ? (
          <LogoView logo={card.logo} size={122.7} />
        ) : null}
        {card.photoUri ? <Image source={{ uri: card.photoUri }} style={styles.photo} /> : null}
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.07)']} style={styles.shade} />
        <View style={styles.pencil}>
          <Icon name="pencil" size={20.1} color="#000000" />
        </View>
      </View>

      <View style={styles.chips}>
        <Chip variant="fill" plus label="Profile picture" onPress={() => setSheet('photoUri')} />
        <Chip variant="fill" plus label="Cover photo" onPress={() => setSheet('coverUri')} />
      </View>
      <Button
        title="Change image layout"
        variant="secondary"
        height={56.6}
        labelStyle={styles.layoutLabel}
        style={styles.layout}
      />

      <BottomSheet
        visible={sheet !== null}
        title={sheet ? SHEET_TITLES[sheet] : ''}
        onClose={() => setSheet(null)}
        bottomGap={35.4}>
        <View style={styles.options}>
          <SheetOption icon="photoStack" label="Select from photo library" onPress={() => choose('library')} />
          <SheetOption icon="camera" label="Take a photo" onPress={() => choose('camera')} />
        </View>
      </BottomSheet>
    </Section>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingBottom: 18.3,
  },
  preview: {
    marginTop: 17.7,
    height: 241.3,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photo: {
    position: 'absolute',
    left: 21.2,
    bottom: 21.2,
    width: 75.5,
    height: 75.5,
    borderRadius: 37.8,
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
  },
  shade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 14.8,
  },
  pencil: {
    position: 'absolute',
    right: 15.3,
    top: 14.8,
    width: 36.6,
    height: 36.6,
    borderRadius: 18.3,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  chips: {
    marginTop: 17.7,
    paddingHorizontal: 17.7,
    flexDirection: 'row',
    gap: 8.3,
  },
  layout: {
    marginTop: 17.7,
    marginHorizontal: 18.3,
    borderColor: '#D9D9D9',
  },
  layoutLabel: {
    fontFamily: fonts.uiMedium,
    fontSize: 14.3,
    color: '#000000',
  },
  options: {
    marginTop: 20.9,
    gap: 7.6,
  },
});
