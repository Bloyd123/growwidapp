import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Icon, type IconName } from '@/components/icons';
import { PlainSheet } from '@/components/plain-sheet';
import { colors, fonts } from '@/theme';

type ConsentSheetProps = {
  visible: boolean;
  onAccept: () => void;
  onClose: () => void;
};

// First "Start recording": the AI Notetaker terms. Continue unlocks once the box is ticked.
export function ConsentSheet({ visible, onAccept, onClose }: ConsentSheetProps) {
  const [accepted, setAccepted] = useState(false);
  const [wasVisible, setWasVisible] = useState(visible);
  if (visible !== wasVisible) {
    setWasVisible(visible);
    if (visible) setAccepted(false);
  }

  return (
    <PlainSheet visible={visible} onClose={onClose} bottomGap={17} style={styles.sheet}>
      <View style={styles.handle} />
      <Illustration />
      <Text style={styles.title}>Welcome to AI Notetaker!</Text>
      <Text style={styles.body}>
        Each time you start a note, you confirm you and everyone else to a conversation agrees to be recorded and for the
        recording to be shared with you and Groowid and our third party providers (who may be located in the United
        States) to create your AI notes, per our <Text style={styles.link}>Privacy Policy</Text> and{' '}
        <Text style={styles.link}>T&amp;Cs</Text>. You are fully responsible for obtaining this consent under our T&amp;Cs.
      </Text>

      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: accepted }}
        onPress={() => setAccepted((v) => !v)}
        style={styles.check}>
        <View style={[styles.box, accepted && styles.boxOn]}>
          {accepted ? <Icon name="check" size={16} color="#FFFFFF" /> : null}
        </View>
        <Text style={styles.checkText}>I have read and accept these terms and conditions</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !accepted }}
        disabled={!accepted}
        onPress={onAccept}
        style={[styles.button, accepted && styles.buttonOn]}>
        <Text style={[styles.buttonText, accepted && styles.buttonTextOn]}>Continue</Text>
      </Pressable>
    </PlainSheet>
  );
}

const TABS: { icon: IconName; label: string; x: number; active?: boolean }[] = [
  { icon: 'tabCard', label: 'My Card', x: 78 },
  { icon: 'tabScan', label: 'Scan', x: 161 },
  { icon: 'tabMic', label: 'AI Notetaker', x: 230.5, active: true },
  { icon: 'tabContacts', label: 'Contacts', x: 300 },
];

// Beige card: phone bottom with the recording bar, pressed by a coral finger.
function Illustration() {
  const { width } = useWindowDimensions();
  // Drawn at 392 wide (425dp screen); centred on other widths.
  const dx = (width - 33 - 392) / 2;
  return (
    <View style={styles.illus}>
      <View style={{ position: 'absolute', left: dx, top: 0, width: 392, height: 348 }}>
        <View style={[styles.phone, styles.phoneShadow, { left: 72.9, top: -22 }]} />
        <View style={[styles.phone, { left: 54.9, top: -40 }]}>
          <View style={styles.phoneTabs} />
        </View>

        <View style={styles.hintPill}>
          <Text style={styles.hintText}>Always get consent before recording</Text>
        </View>
        <View style={styles.bar}>
          <View style={styles.barPause}>
            <Icon name="pause" size={14.8} color="#1A1A1A" />
          </View>
          <View style={styles.barWave}>
            <View style={[styles.barWaveLine, { height: 11 }]} />
            <View style={[styles.barWaveLine, { height: 15 }]} />
            <View style={[styles.barWaveLine, { height: 11 }]} />
          </View>
          <Text style={styles.barTime}>00:02</Text>
          <View style={styles.barEnd}>
            <View style={styles.barStop} />
            <Text style={styles.barEndText}>End</Text>
          </View>
        </View>
        {TABS.map((t) => (
          <View key={t.label} style={[styles.tab, { left: t.x - 30 }]}>
            <Icon name={t.icon} size={12.5} color={t.active ? '#000000' : '#B8B8B8'} />
            <Text style={[styles.tabText, t.active && styles.tabTextOn]}>{t.label}</Text>
          </View>
        ))}

        <Svg style={StyleSheet.absoluteFill} width={392} height={348} viewBox="0 0 392 348">
          <Path
            fill={colors.coralBright}
            stroke="#B5392B"
            strokeWidth={1.3}
            strokeLinejoin="round"
            d="M59 349C75 290 95 220 108 169c3-14 14-23 27-23 12 0 18 9 16 21-4 36-11 92-13 128 22 6 45 14 66 29 9 7 16 15 21 25z"
          />
          <Path fill="#E4574A" d="M160 349l7-37c12 4 24 10 34 18l6 19z" />
          <Path
            fill="none"
            stroke="#B5392B"
            strokeWidth={1.3}
            strokeLinejoin="round"
            d="M122 152c4-4 18-5 26 1l-1 11c-8-3-17-3-24 0z"
          />
          <Path
            fill={colors.coralBright}
            stroke="#B5392B"
            strokeWidth={1.3}
            d="M-2 262c20-1 32 16 36 38 3 20 6 35 8 49H-2z"
          />
          <Path fill="none" stroke="#B5392B" strokeWidth={1.3} strokeLinecap="round" d="M-1 272c8 4 9 18 1 26" />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    borderTopLeftRadius: 23.6,
    borderTopRightRadius: 23.6,
  },
  handle: {
    alignSelf: 'center',
    width: 31.5,
    height: 3.5,
    marginTop: 21.9,
    borderRadius: 1.8,
    backgroundColor: '#434248',
  },
  illus: {
    height: 348,
    marginTop: 21.9,
    marginHorizontal: 16.5,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#D4CEC0',
  },
  phone: {
    position: 'absolute',
    width: 283.9,
    height: 336,
    borderWidth: 6.2,
    borderColor: '#1E150C',
    borderBottomLeftRadius: 26.5,
    borderBottomRightRadius: 26.5,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  phoneShadow: {
    borderColor: '#A9A097',
    backgroundColor: '#A9A097',
  },
  phoneTabs: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 59.6,
    borderTopWidth: 1,
    borderTopColor: '#EEEBE6',
    backgroundColor: '#FCFBF8',
  },
  hintPill: {
    position: 'absolute',
    left: 99.5,
    top: 118,
    width: 195.7,
    height: 29.6,
    borderRadius: 14.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
  },
  hintText: {
    fontFamily: fonts.uiMedium,
    fontSize: 10.1,
    color: '#1A1A1A',
    includeFontPadding: false,
  },
  bar: {
    position: 'absolute',
    left: 72.3,
    top: 158.8,
    width: 246.5,
    height: 50.2,
    borderRadius: 25.1,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 6px 14px rgba(0,0,0,0.1)',
  },
  barPause: {
    position: 'absolute',
    left: 11.2,
    top: 8,
    width: 70.5,
    height: 34,
    paddingLeft: 8.5,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    justifyContent: 'center',
  },
  barWave: {
    position: 'absolute',
    left: 96.5,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2.6,
  },
  barWaveLine: {
    width: 2.4,
    borderRadius: 1.2,
    backgroundColor: '#F0554A',
  },
  barTime: {
    position: 'absolute',
    left: 115.7,
    top: 17.5,
    fontFamily: fonts.uiMedium,
    fontSize: 11.7,
    color: '#3D3D3D',
    includeFontPadding: false,
  },
  barEnd: {
    position: 'absolute',
    left: 163.7,
    top: 8,
    width: 71.6,
    height: 34.5,
    paddingLeft: 17,
    borderRadius: 17.2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.5,
    backgroundColor: colors.ink,
  },
  barStop: {
    width: 10.3,
    height: 10.3,
    borderRadius: 1.5,
    backgroundColor: '#FFFFFF',
  },
  barEndText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 11.7,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  tab: {
    position: 'absolute',
    top: 243,
    width: 60,
    alignItems: 'center',
    gap: 3.5,
  },
  tabText: {
    fontFamily: fonts.uiMedium,
    fontSize: 6.5,
    color: '#B8B8B8',
    includeFontPadding: false,
  },
  tabTextOn: {
    fontFamily: fonts.uiSemiBold,
    color: '#000000',
  },
  title: {
    marginTop: 24.2,
    marginHorizontal: 16.5,
    fontFamily: fonts.uiSemiBold,
    fontSize: 24.3,
    color: '#000000',
  },
  body: {
    marginTop: 5.3,
    marginHorizontal: 16.5,
    fontFamily: fonts.ui,
    fontSize: 13.55,
    lineHeight: 20.05,
    color: '#2B2B2B',
  },
  link: {
    fontFamily: fonts.uiSemiBold,
    color: '#000000',
    textDecorationLine: 'underline',
  },
  check: {
    marginTop: 18.6,
    marginLeft: 18.3,
    marginRight: 16.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  box: {
    width: 20.1,
    height: 20.1,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxOn: {
    borderColor: colors.ink,
    backgroundColor: colors.ink,
  },
  checkText: {
    // Wraps after "terms and", as in the reference.
    maxWidth: 290,
    fontFamily: fonts.ui,
    fontSize: 15.5,
    lineHeight: 24.2,
    color: '#1A1A1A',
  },
  button: {
    height: 55.4,
    marginTop: 26.1,
    marginHorizontal: 16.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.disabledBg,
  },
  buttonOn: {
    backgroundColor: colors.ink,
  },
  buttonText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 17.8,
    color: '#B1B1B1',
    includeFontPadding: false,
  },
  buttonTextOn: {
    color: '#FFFFFF',
  },
});
