import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { GroowidMark } from '@/components/groowid-logo';
import { Icon } from '@/components/icons';
import { colors, fonts } from '@/theme';

// Laid out on a 425dp-wide stage (the reference device) and scaled to the screen width.
// Heights are measured from the bottom of the status bar.
const STAGE_WIDTH = 425;
export const PHONE_MOCK_HEIGHT = 528.4;

const NOTIFICATIONS = [
  { when: 'now', name: 'Cameron Reed', top: 54.3 },
  { when: '5m ago', name: 'Casey Williams', top: 188.3 },
];

// Top half of a phone's lock screen showing two "new contact" notifications.
export function NotificationsPhoneMock({ topInset }: { topInset: number }) {
  const { width } = useWindowDimensions();
  const scale = width / STAGE_WIDTH;
  // The frame runs up under the status bar and off the top of the screen.
  const hidden = topInset / scale + 40;

  return (
    <View style={{ height: topInset + PHONE_MOCK_HEIGHT * scale }}>
      <View
        style={[
          styles.stage,
          { top: topInset, left: (width - STAGE_WIDTH) / 2, transform: [{ scale }] },
        ]}>
        <View style={[styles.frame, { top: -hidden, height: PHONE_MOCK_HEIGHT + hidden }]}>
          <View style={styles.rim}>
            <LinearGradient
              colors={['#33434A', '#5E747C', '#8AA2AB']}
              locations={[0, 0.45, 1]}
              style={styles.screen}
            />
          </View>
        </View>

        {NOTIFICATIONS.map((n) => (
          <View key={n.name} style={[styles.card, { top: n.top }]}>
            <View style={styles.cardHead}>
              <View style={styles.appIcon}>
                <GroowidMark size={13} color="#FFFFFF" />
              </View>
              <Text style={styles.appName}>Groowid</Text>
              <Text style={styles.when}>{` • ${n.when}`}</Text>
            </View>
            <Svg width={13} height={7.5} viewBox="0 0 13 7.5" style={styles.chevron}>
              <Path d="M1 1l5.5 5.5L12 1" fill="none" stroke="#6F7376" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
            <Text style={styles.cardTitle}>You’ve got a new contact!</Text>
            <Text style={styles.cardBody}>{`${n.name} just shared their details with\nyou`}</Text>
          </View>
        ))}

        <View style={styles.badge}>
          <View style={styles.badgeBell}>
            <Icon name="bell" size={20.1} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.fingerprint}>
          <Icon name="fingerprint" size={33} color="#FFFFFF" />
        </View>
        <View style={[styles.round, { left: 42.5 }]}>
          <Icon name="homeOutline" size={20.1} color="#FFFFFF" />
        </View>
        <View style={[styles.round, { left: 334.7 }]}>
          <Icon name="wallet" size={21.2} color="#FFFFFF" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    position: 'absolute',
    width: STAGE_WIDTH,
    height: PHONE_MOCK_HEIGHT,
    transformOrigin: '50% 0%',
  },
  frame: {
    position: 'absolute',
    left: 7.1,
    width: 408.8,
    padding: 11.8,
    borderBottomLeftRadius: 47.2,
    borderBottomRightRadius: 47.2,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderColor: '#4A4A4A',
    backgroundColor: '#0B0B0B',
    boxShadow: '0 8px 18px rgba(0,0,0,0.18)',
  },
  rim: {
    flex: 1,
    borderBottomLeftRadius: 35.4,
    borderBottomRightRadius: 35.4,
    borderWidth: 1.8,
    borderTopWidth: 0,
    borderColor: '#DDE2E4',
    overflow: 'hidden',
  },
  screen: {
    flex: 1,
  },
  card: {
    position: 'absolute',
    left: 41.9,
    width: 338.9,
    height: 123.4,
    borderRadius: 23.6,
    paddingLeft: 19.5,
    backgroundColor: 'rgba(236,239,240,0.93)',
  },
  cardHead: {
    marginTop: 17.1,
    height: 18.9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  appIcon: {
    width: 18.9,
    height: 18.9,
    borderRadius: 4.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardIcon,
  },
  appName: {
    marginLeft: 5.3,
    fontFamily: fonts.sans,
    fontSize: 13.6,
    color: '#2A2C2E',
    includeFontPadding: false,
  },
  when: {
    fontFamily: fonts.sans,
    fontSize: 13.6,
    color: '#8C8F91',
    includeFontPadding: false,
  },
  chevron: {
    position: 'absolute',
    top: 22.9,
    right: 21.9,
  },
  cardTitle: {
    marginTop: 15.8,
    fontFamily: fonts.sansSemiBold,
    fontSize: 13.3,
    lineHeight: 18,
    color: '#111314',
  },
  cardBody: {
    marginTop: 3,
    fontFamily: fonts.sans,
    fontSize: 13.6,
    lineHeight: 17.1,
    color: '#5B6064',
  },
  badge: {
    position: 'absolute',
    left: 324.7,
    top: 31.9,
    width: 36.6,
    height: 36.6,
    borderRadius: 18.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2564B',
    boxShadow: '0 0 0 4px rgba(242,86,75,0.22), 0 3px 8px rgba(120,20,10,0.25)',
  },
  badgeBell: {
    transform: [{ rotate: '-22deg' }],
  },
  fingerprint: {
    position: 'absolute',
    left: 181.8,
    top: 332.1,
    width: 60.8,
    height: 60.8,
    borderRadius: 30.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  round: {
    position: 'absolute',
    top: 451.1,
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(40,60,68,0.28)',
  },
});
