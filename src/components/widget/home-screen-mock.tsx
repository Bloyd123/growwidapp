import { useId } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

import { GoogleMark } from '@/components/brand-icons';
import { FieldIcon, Icon } from '@/components/icons';
import { colors, fonts } from '@/theme';

// Phone home screen (220×478) showing the QR widget, as on the "Adding the widget" screen.
export const MOCK_WIDTH = 259.6;
export const MOCK_HEIGHT = 564;

const DOT_COLUMNS = [70.8, 130.7, 190.8];
const DOT_ROWS = [105.6, 174.5, 243.4, 312.1];
const DOCK_CENTERS = [39.3, 99.4, 159.3, 219.2];

export function HomeScreenMock({ qrValue }: { qrValue: string }) {
  return (
    <View style={styles.phone}>
      <Wallpaper />
      <View style={styles.pageEdge} />

      <View style={styles.close}>
        <Icon name="close" size={16.5} color="rgba(255,255,255,0.9)" />
      </View>

      {DOT_ROWS.flatMap((top) =>
        DOT_COLUMNS.map((left) => <View key={`${left}-${top}`} style={[styles.dot, { left, top }]} />),
      )}

      <Text style={[styles.clockSmall, { top: 253.7 }]}>Wed, 6 May</Text>
      <Text style={styles.clock}>1:34</Text>
      <Text style={[styles.clockSmall, { top: 298 }]}>PM</Text>

      <View style={styles.widgetOutline} />
      <View style={styles.searchPill}>
        <GoogleMark size={16.5} />
        <View style={styles.searchIcons}>
          <Mic />
          <Lens />
        </View>
      </View>
      <View style={styles.qrWidget}>
        <QRCode value={qrValue} size={77.9} backgroundColor="#FFFFFF" color="#000000" quietZone={0} />
      </View>

      <PageIndicator />

      {DOCK_CENTERS.map((center, i) => (
        <View key={center} style={[styles.dockSlot, { left: center - 19.5 }]}>
          <DockIcon kind={i} />
        </View>
      ))}
    </View>
  );
}

function Wallpaper() {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <Svg width={MOCK_WIDTH} height={MOCK_HEIGHT} style={StyleSheet.absoluteFill}>
      <Defs>
        <LinearGradient id={`${id}base`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#6A3A2C" />
          <Stop offset="0.45" stopColor="#8A4632" />
          <Stop offset="1" stopColor="#A98B70" />
        </LinearGradient>
        <RadialGradient id={`${id}red`}>
          <Stop offset="0" stopColor="#DF3E36" stopOpacity={0.95} />
          <Stop offset="1" stopColor="#DF3E36" stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id={`${id}warm`}>
          <Stop offset="0" stopColor="#D08462" stopOpacity={0.9} />
          <Stop offset="1" stopColor="#D08462" stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id={`${id}dark`}>
          <Stop offset="0" stopColor="#4A3A32" stopOpacity={0.65} />
          <Stop offset="1" stopColor="#35251F" stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id={`${id}sand`}>
          <Stop offset="0" stopColor="#BFA387" stopOpacity={0.85} />
          <Stop offset="1" stopColor="#BFA387" stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect width={MOCK_WIDTH} height={MOCK_HEIGHT} fill={`url(#${id}base)`} />
      <Ellipse cx={20} cy={40} rx={110} ry={120} fill={`url(#${id}dark)`} />
      <Ellipse cx={190} cy={40} rx={120} ry={110} fill={`url(#${id}warm)`} />
      <Ellipse cx={80} cy={150} rx={115} ry={130} fill={`url(#${id}red)`} />
      <Ellipse cx={40} cy={420} rx={140} ry={140} fill={`url(#${id}sand)`} />
      <Ellipse cx={200} cy={330} rx={90} ry={140} fill={`url(#${id}sand)`} opacity={0.5} />
    </Svg>
  );
}

function Mic() {
  return (
    <Svg width={13} height={13} viewBox="0 0 24 24">
      <Path
        fill="#1F1F1F"
        d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
      />
    </Svg>
  );
}

function Lens() {
  return (
    <Svg width={13} height={13} viewBox="0 0 24 24">
      <Path
        d="M3 8V6a3 3 0 0 1 3-3h2M16 3h2a3 3 0 0 1 3 3v2M8 21H6a3 3 0 0 1-3-3v-2"
        fill="none"
        stroke="#1F1F1F"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <Circle cx={12} cy={12} r={3.6} fill="none" stroke="#1F1F1F" strokeWidth={2.4} />
      <Circle cx={18.5} cy={18.5} r={2.2} fill="#1F1F1F" />
    </Svg>
  );
}

// "=  ⌂  •  •  +" row under the widget.
function PageIndicator() {
  return (
    <View style={styles.pager}>
      <Svg width={54.3} height={7.1} viewBox="0 0 46 6">
        <Path d="M0 1.8h4.5M0 4.2h4.5" stroke="rgba(255,255,255,0.75)" strokeWidth={0.9} />
        <Path d="M8 5.6V3l2.3-2 2.3 2v2.6z" fill="#FFFFFF" />
        <Circle cx={21} cy={3} r={1.9} fill="rgba(255,255,255,0.7)" />
        <Circle cx={31.4} cy={3} r={1.9} fill="rgba(255,255,255,0.7)" />
        <Path d="M39.4 3h4.4M41.6 0.8v4.4" stroke="rgba(255,255,255,0.75)" strokeWidth={0.9} />
      </Svg>
    </View>
  );
}

function DockIcon({ kind }: { kind: number }) {
  switch (kind) {
    case 0:
      return (
        <View style={[styles.dockIcon, { backgroundColor: '#18B84E', borderRadius: 13 }]}>
          <FieldIcon name="phone" size={20.1} color="#FFFFFF" />
        </View>
      );
    case 1:
      return (
        <View style={[styles.dockIcon, styles.dockWhite]}>
          <Svg width={23.6} height={23.6} viewBox="0 0 24 24">
            <Path d="M12 3.5c-5 0-9 3.3-9 7.6 0 2.4 1.3 4.5 3.3 5.9L5.6 21l4.3-2.5c.7.1 1.4.2 2.1.2 5 0 9-3.4 9-7.6s-4-7.6-9-7.6z" fill="#3F7BE8" />
          </Svg>
        </View>
      );
    case 2:
      return (
        <View style={[styles.dockIcon, styles.dockWhite]}>
          <Svg width={28.3} height={28.3} viewBox="0 0 24 24">
            <Path d="M12 2a10 10 0 0 1 8.66 5H12a5 5 0 0 0-4.33 2.5L3.34 7A10 10 0 0 1 12 2z" fill="#EA4335" />
            <Path d="M20.66 7a10 10 0 0 1-8.66 15l4.33-7.5A5 5 0 0 0 16.33 9.5 5 5 0 0 0 12 7z" fill="#FBBC05" />
            <Path d="M12 22A10 10 0 0 1 3.34 7l4.33 7.5A5 5 0 0 0 12 17z" fill="#34A853" />
            <Circle cx={12} cy={12} r={4.4} fill="#FFFFFF" />
            <Circle cx={12} cy={12} r={3.4} fill="#4285F4" />
          </Svg>
        </View>
      );
    default:
      return (
        <View style={[styles.dockIcon, { backgroundColor: '#D8DCE2', borderRadius: 13 }]}>
          <View style={styles.lensOuter}>
            <View style={styles.lensInner} />
          </View>
          <View style={styles.cameraDot} />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  phone: {
    width: MOCK_WIDTH,
    height: MOCK_HEIGHT,
    borderRadius: 14.2,
    overflow: 'hidden',
    boxShadow: '0 8px 22px rgba(60,10,0,0.55)',
  },
  pageEdge: {
    position: 'absolute',
    right: 1.2,
    top: 47.2,
    width: 4.7,
    height: 401.2,
    borderRadius: 2.4,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  close: {
    position: 'absolute',
    left: 21.7,
    top: 6.5,
  },
  dot: {
    position: 'absolute',
    width: 2.4,
    height: 2.4,
    marginLeft: -1.2,
    marginTop: -1.2,
    borderRadius: 1.2,
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
  clockSmall: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: fonts.uiSemiBold,
    fontSize: 10.6,
    lineHeight: 14.2,
    color: '#FFFFFF',
  },
  clock: {
    position: 'absolute',
    top: 270.2,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: fonts.uiBold,
    fontSize: 21.2,
    lineHeight: 26,
    color: '#FFFFFF',
  },
  widgetOutline: {
    position: 'absolute',
    left: 72.8,
    top: 313.3,
    width: 114,
    height: 129.8,
    borderRadius: 14.2,
    borderWidth: 0.75,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  searchPill: {
    position: 'absolute',
    left: 21.6,
    top: 368.8,
    width: 216.4,
    height: 34.2,
    borderRadius: 17.1,
    paddingHorizontal: 8.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(245,245,245,0.92)',
  },
  searchIcons: {
    flexDirection: 'row',
    gap: 20.1,
    marginRight: 2.4,
  },
  qrWidget: {
    position: 'absolute',
    left: 76.7,
    top: 338.8,
    width: 102.3,
    height: 103.1,
    borderRadius: 11.8,
    borderWidth: 3.3,
    borderColor: colors.coral,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pager: {
    position: 'absolute',
    top: 469.1,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  dockSlot: {
    position: 'absolute',
    top: 498.8,
  },
  dockIcon: {
    width: 38.9,
    height: 38.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dockWhite: {
    borderRadius: 19.5,
    backgroundColor: '#FFFFFF',
  },
  lensOuter: {
    width: 20.1,
    height: 20.1,
    borderRadius: 10,
    backgroundColor: '#1B232E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lensInner: {
    width: 8.3,
    height: 8.3,
    borderRadius: 4.1,
    backgroundColor: '#3C4A5C',
  },
  cameraDot: {
    position: 'absolute',
    top: 7.1,
    left: 8.3,
    width: 4.1,
    height: 4.1,
    borderRadius: 2.1,
    backgroundColor: '#EF4B3F',
  },
});
