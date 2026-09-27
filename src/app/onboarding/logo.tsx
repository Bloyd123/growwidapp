import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BottomSheet } from '@/components/bottom-sheet';
import { Button } from '@/components/button';
import { Icon, ImagePlaceholder } from '@/components/icons';
import { LogoView } from '@/components/logo-tile';
import { OnboardingScreen, SCREEN_PADDING } from '@/components/onboarding/onboarding-screen';
import { TextField } from '@/components/text-field';
import { pickFromLibrary } from '@/lib/pick-image';
import { domainOf, makeLogoTile, useProfile, type Logo } from '@/state/profile';
import { colors, typography } from '@/theme';

type Sheet = 'none' | 'search' | 'confirm';

export default function LogoScreen() {
  const { profile, update } = useProfile();
  const [sheet, setSheet] = useState<Sheet>('none');
  const [website, setWebsite] = useState(profile.website);
  const [found, setFound] = useState<Logo | null>(null);
  const logo = profile.logo;
  const goNext = () => router.push('/onboarding/photo');

  const pickLogo = async () => {
    const uri = await pickFromLibrary();
    if (!uri) return;
    update({ logo: { kind: 'image', uri } });
    setSheet('none');
  };

  const search = () => {
    const tile = makeLogoTile(website);
    if (!tile) return;
    setFound(tile);
    setSheet('confirm');
  };

  return (
    <OnboardingScreen
      step={4}
      variant="media"
      title={'Next, let’s add your logo!'}
      subtitle={'A logo makes your card stand out and look\nprofessional.'}
      footerGap={12.4}
      footer={
        logo ? (
          <Button title="Continue" height={59} onPress={goNext} />
        ) : (
          <Button title="Not now" variant="text" height={59} onPress={goNext} labelStyle={styles.notNow} />
        )
      }>
      <View style={[styles.box, logo ? styles.boxFilled : styles.boxEmpty]}>
        {logo ? (
          <LogoView logo={logo} size={113.3} />
        ) : (
          <ImagePlaceholder size={62.5} color={colors.glyph} cutout={colors.fill} />
        )}
      </View>

      <Button
        title="Auto-detect my logo"
        variant="secondary"
        height={59}
        icon={<Icon name="wand" size={26} color="#000000" />}
        labelStyle={styles.action}
        onPress={() => setSheet('search')}
        style={styles.autoDetect}
      />
      <Button
        title="Select from photo library"
        variant="text"
        height={59}
        icon={<Icon name="photoLibrary" size={26} color="#000000" />}
        labelStyle={styles.action}
        onPress={pickLogo}
        style={styles.textAction}
      />
      {logo ? (
        <Button
          title="Remove logo"
          variant="text"
          height={59}
          icon={<Icon name="trash" size={26} color="#000000" />}
          labelStyle={styles.action}
          onPress={() => update({ logo: null })}
          style={styles.remove}
        />
      ) : null}

      <BottomSheet visible={sheet === 'search'} title="Auto-detect my logo" onClose={() => setSheet('none')}>
        <View style={styles.sheetBody}>
          <TextField
            label="Company website"
            value={website}
            onChangeText={setWebsite}
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={<Icon name="search" size={24.8} color="#505050" />}
            style={styles.sheetField}
          />
          <Button
            title="Search"
            height={59}
            onPress={search}
            labelStyle={website.trim() ? undefined : styles.searchIdle}
            style={styles.search}
          />
          <Button
            title="Select from photo library"
            variant="secondary"
            height={59}
            icon={<Icon name="photoLibrary" size={26} color="#000000" />}
            labelStyle={styles.action}
            onPress={pickLogo}
            style={styles.sheetSecondary}
          />
        </View>
      </BottomSheet>

      <BottomSheet
        visible={sheet === 'confirm'}
        title="Use this logo?"
        onClose={() => setSheet('none')}
        bottomGap={24.8}>
        <View style={styles.preview}>{found ? <LogoView logo={found} size={70.8} /> : null}</View>
        <Text style={styles.foundText}>We found this logo on {domainOf(website)}</Text>
        <View style={styles.choices}>
          <Button
            title="No"
            variant="secondary"
            height={57.8}
            onPress={() => setSheet('none')}
            labelStyle={styles.choiceLabel}
            style={styles.choiceNo}
          />
          <Button
            title="Yes"
            height={57.8}
            onPress={() => {
              update({ logo: found });
              setSheet('none');
            }}
            style={styles.choice}
          />
        </View>
      </BottomSheet>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: 21.2,
    height: 220.7,
    borderRadius: 14.2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxEmpty: {
    backgroundColor: colors.fill,
    borderColor: colors.fillBorder,
  },
  boxFilled: {
    backgroundColor: colors.background,
    borderColor: '#EEEEEE',
    boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
  },
  action: {
    ...typography.action,
    color: '#000000',
  },
  notNow: {
    color: '#000000',
  },
  autoDetect: {
    marginTop: 54.3,
  },
  textAction: {
    marginTop: 9.1,
  },
  remove: {
    marginTop: 6.8,
  },
  sheetBody: {
    paddingHorizontal: SCREEN_PADDING,
  },
  sheetField: {
    marginTop: 38,
  },
  search: {
    marginTop: 24.2,
  },
  searchIdle: {
    color: '#A3A3A3',
  },
  sheetSecondary: {
    marginTop: 7.7,
  },
  preview: {
    alignSelf: 'center',
    marginTop: 30.9,
    width: 236,
    height: 129.8,
    borderRadius: 9.4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
  },
  foundText: {
    ...typography.subtitle,
    fontSize: 16.5,
    lineHeight: 23.6,
    marginTop: 8.9,
    textAlign: 'center',
    color: '#000000',
    includeFontPadding: false,
  },
  choices: {
    flexDirection: 'row',
    gap: 7.7,
    marginTop: 18.3,
    paddingHorizontal: 20.7,
  },
  choice: {
    flex: 1,
  },
  choiceNo: {
    flex: 1,
    borderColor: '#DAD9DE',
  },
  choiceLabel: {
    color: '#000000',
  },
});
