import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { WalletStackMark } from '@/components/brand-icons';
import { GroowidMark } from '@/components/groowid-logo';
import { Icon, PersonPlaceholder } from '@/components/icons';
import { displayName } from '@/components/profile-card';
import { goBack } from '@/lib/go-back';
import { useProfile } from '@/state/profile';
import { colors, fonts } from '@/theme';

const TEXT = '#C4C7CE';
const LINK = '#A8C7FA';

// "Add card to wallet": the wallet app's Add pass sheet with the Groowid card as a pass.
export default function ShareWalletScreen() {
  const insets = useSafeAreaInsets();
  const { card } = useProfile();

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 14.9 }]}>
      <StatusBar style="light" />
      <Pressable accessibilityRole="button" accessibilityLabel="Close" hitSlop={12} onPress={() => goBack('/share')} style={styles.close}>
        <Icon name="close" size={25} color="#E3E3E3" />
      </Pressable>
      <View style={[styles.account, { top: insets.top + 15.8 }]}>
        {card.photoUri ? (
          <Image source={{ uri: card.photoUri }} style={styles.accountPhoto} />
        ) : (
          <PersonPlaceholder width={20} color="#9AA0A6" />
        )}
      </View>

      <View style={styles.brand}>
        <WalletStackMark size={22.4} />
        <Text style={styles.brandText}>Google Wallet</Text>
      </View>
      <Text style={styles.heading}>Add pass</Text>

      <View style={styles.pass}>
        <View style={styles.passHead}>
          <View style={styles.passLogo}>
            <GroowidMark size={17} color="#FFFFFF" />
          </View>
          <Text style={styles.passTitle}>Groowid Card</Text>
        </View>
        <View style={styles.passRule} />
        <Text style={styles.passName}>{displayName(card)}</Text>
      </View>

      <View style={styles.flex} />

      <Text style={styles.body}>
        After adding your pass, you’ll see it in places like Calendar, Assistant and more. You can turn this off in{' '}
        <Text style={styles.link}>Manage passes data</Text> or in the pass details.
      </Text>
      <Text style={[styles.body, styles.paragraph]}>
        Pass providers can automatically add passes, promotions, offers and more that relate to your existing passes,
        depending on your <Text style={styles.link}>settings</Text>.
      </Text>
      <Text style={[styles.body, styles.paragraph]}>
        <Text style={styles.link}>Terms</Text> and <Text style={styles.link}>Privacy Policy</Text>
      </Text>

      <View style={styles.buttons}>
        <Pressable accessibilityRole="button" onPress={() => goBack('/share')} style={[styles.button, styles.cancel]}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => goBack('/share')} style={[styles.button, styles.add]}>
          <Text style={styles.addText}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1C1F26',
  },
  close: {
    marginTop: 19.4,
    marginLeft: 27.3,
    alignSelf: 'flex-start',
  },
  account: {
    position: 'absolute',
    right: 32.4,
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3C4043',
  },
  accountPhoto: {
    width: 32,
    height: 32,
  },
  brand: {
    marginTop: 33.5,
    marginLeft: 30.7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10.6,
  },
  brandText: {
    fontFamily: fonts.uiMedium,
    fontSize: 19.7,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  heading: {
    marginTop: 17,
    marginLeft: 27.5,
    fontFamily: fonts.ui,
    fontSize: 32.8,
    lineHeight: 40,
    color: TEXT,
  },
  pass: {
    height: 191.9,
    marginTop: 41.5,
    marginHorizontal: 23.6,
    borderRadius: 23.6,
    borderWidth: 1.5,
    borderColor: '#9AA0A6',
    backgroundColor: '#FFFFFF',
  },
  passHead: {
    height: 64,
    paddingLeft: 16.2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passLogo: {
    width: 29.5,
    height: 29.5,
    borderRadius: 14.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardIcon,
  },
  passTitle: {
    marginLeft: 17.9,
    fontFamily: fonts.ui,
    fontSize: 16.9,
    color: '#1F1F1F',
    includeFontPadding: false,
  },
  passRule: {
    height: 1.2,
    marginHorizontal: 15,
    backgroundColor: '#E0E0E0',
  },
  passName: {
    marginTop: 8,
    marginLeft: 16.2,
    fontFamily: fonts.uiMedium,
    fontSize: 30,
    color: '#1F1F1F',
  },
  flex: {
    flex: 1,
  },
  body: {
    marginHorizontal: 28.3,
    fontFamily: fonts.ui,
    fontSize: 13.3,
    lineHeight: 16.2,
    color: TEXT,
  },
  paragraph: {
    marginTop: 15.7,
  },
  link: {
    color: LINK,
    textDecorationLine: 'underline',
  },
  buttons: {
    marginTop: 24,
    marginHorizontal: 20.1,
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    flex: 1,
    height: 57.3,
    borderRadius: 28.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancel: {
    borderWidth: 1.2,
    borderColor: '#8E918F',
  },
  cancelText: {
    fontFamily: fonts.uiMedium,
    fontSize: 17.7,
    color: TEXT,
  },
  add: {
    backgroundColor: LINK,
  },
  addText: {
    fontFamily: fonts.uiMedium,
    fontSize: 17.7,
    color: '#062E6F',
  },
});
