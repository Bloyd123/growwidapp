import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SparkleMark } from '@/components/brand-icons';
import { GroowidMark } from '@/components/groowid-logo';
import { Icon, type IconName } from '@/components/icons';
import { goBack } from '@/lib/go-back';
import { pickFromLibrary } from '@/lib/pick-image';
import { fonts } from '@/theme';

type Mode = 'badge' | 'paper' | 'qr';

const MODES: { key: Mode; label: string; icon: IconName }[] = [
  { key: 'badge', label: 'Event badge', icon: 'contactBadge' },
  { key: 'paper', label: 'Paper card', icon: 'paperCard' },
  { key: 'qr', label: 'QR code', icon: 'qrCode' },
];

// Scan frame per mode, measured from the reference (top is below the status bar).
const FRAME: Record<Mode, { top: number; height: number }> = {
  badge: { top: 192.5, height: 414.3 },
  paper: { top: 316.4, height: 241.4 },
  qr: { top: 192.5, height: 414.3 },
};
const FRAME_SIDE = 30.7;
const DIM = 'rgba(0,0,0,0.55)';

const openNewContact = () => router.push('/contacts/new');

// Scan tab: live camera with a badge / paper card / QR frame. Shutter, gallery or
// "Enter manually" open New contact; QR mode opens it as soon as a code is seen.
export default function ScanScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode] = useState<Mode>('badge');
  const [torch, setTorch] = useState(false);
  const scanned = useRef(false);

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) requestPermission();
  }, [permission, requestPermission]);

  const frame = FRAME[mode];
  const frameTop = insets.top + frame.top;
  const frameWidth = width - FRAME_SIDE * 2;
  const isQr = mode === 'qr';

  const fromGallery = async () => {
    if (await pickFromLibrary()) openNewContact();
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      {permission?.granted ? (
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          enableTorch={torch}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={
            isQr
              ? () => {
                  if (scanned.current) return;
                  scanned.current = true;
                  openNewContact();
                }
              : undefined
          }
        />
      ) : null}

      {/* Darken everything outside the frame. */}
      <View style={[styles.dim, { top: 0, height: frameTop }]} />
      <View style={[styles.dim, { top: frameTop + frame.height, height: height - frameTop - frame.height }]} />
      <View style={[styles.dim, { top: frameTop, height: frame.height, left: 0, width: FRAME_SIDE }]} />
      <View style={[styles.dim, { top: frameTop, height: frame.height, left: width - FRAME_SIDE, width: FRAME_SIDE }]} />

      <View style={[styles.frame, { top: frameTop, height: frame.height, width: frameWidth }]}>
        <View style={[styles.corner, styles.cornerTL]} />
        <View style={[styles.corner, styles.cornerTR]} />
        <View style={[styles.corner, styles.cornerBL]} />
        <View style={[styles.corner, styles.cornerBR]} />
        {mode === 'badge' ? (
          <>
            <Text style={[styles.hintName, { top: 132 }]}>FULL NAME</Text>
            <Text style={[styles.hintCompany, { top: 171 }]}>COMPANY</Text>
            <View style={[styles.hintLogo, { top: 243.3, left: frameWidth / 2 - 20 }]}>
              <GroowidMark size={24} color="rgba(0,0,0,0.75)" />
            </View>
          </>
        ) : null}
        {mode === 'paper' ? (
          <>
            <Text style={[styles.hintName, styles.hintNamePaper, { top: 82 }]}>FULL NAME</Text>
            <Text style={[styles.hintCompany, styles.hintCompanyPaper, { top: 114 }]}>COMPANY</Text>
            <View style={[styles.hintLogo, styles.hintLogoPaper, { top: 103.9, left: frameWidth - 76.7 }]}>
              <GroowidMark size={20} color="rgba(0,0,0,0.75)" />
            </View>
          </>
        ) : null}
      </View>

      <View style={[styles.heading, { top: frameTop - 84 }]}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Scan contact information</Text>
          <Icon name="info" size={20} color="#FFFFFF" />
        </View>
        <View style={styles.subtitleRow}>
          <Text style={styles.subtitle}>
            {isQr ? 'Scan any QR code, including LinkedIn QR codes' : 'Capture name & company, we’ll enrich the rest'}
          </Text>
          <SparkleMark size={18} />
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close"
        hitSlop={12}
        onPress={() => goBack('/my-card')}
        style={[styles.close, { top: insets.top + 20.9 }]}>
        <Icon name="close" size={22} color="#FFFFFF" />
      </Pressable>
      <Pressable accessibilityRole="button" onPress={openNewContact} style={[styles.manual, { top: insets.top + 12.4 }]}>
        <Icon name="edit" size={20} color="#FFFFFF" />
        <Text style={styles.manualText}>Enter manually</Text>
      </Pressable>

      <View style={[styles.panel, { paddingBottom: insets.bottom + 18 }]}>
        <View style={styles.modes}>
          {MODES.map((m) => {
            const on = m.key === mode;
            return (
              <Pressable
                key={m.key}
                accessibilityRole="button"
                accessibilityState={{ selected: on }}
                onPress={() => {
                  scanned.current = false;
                  setMode(m.key);
                }}
                style={[styles.mode, on && styles.modeOn]}>
                <Icon name={m.icon} size={20} color="#FFFFFF" />
                <Text style={styles.modeText}>{m.label}</Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.controls}>
          <Pressable accessibilityRole="button" accessibilityLabel="Choose from gallery" onPress={fromGallery} style={styles.roundButton}>
            <Icon name="image" size={22} color="#FFFFFF" />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Take photo"
            disabled={isQr}
            onPress={openNewContact}
            style={[styles.shutter, isQr && styles.shutterOff]}>
            <View style={styles.shutterInner} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Torch"
            accessibilityState={{ checked: torch }}
            onPress={() => setTorch((t) => !t)}
            style={[styles.roundButton, torch && styles.roundButtonOn]}>
            <Icon name="flashlight" size={22} color={torch ? '#000000' : '#FFFFFF'} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const CORNER = 21;
const CORNER_WIDTH = 2.6;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000',
  },
  dim: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: DIM,
  },
  frame: {
    position: 'absolute',
    left: FRAME_SIDE,
  },
  corner: {
    position: 'absolute',
    width: CORNER,
    height: CORNER,
    borderColor: '#FFFFFF',
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderTopLeftRadius: 6,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderTopRightRadius: 6,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderBottomLeftRadius: 6,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderBottomRightRadius: 6,
  },
  hintName: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: fonts.ui,
    fontSize: 33.7,
    lineHeight: 40,
    color: 'rgba(255,255,255,0.45)',
  },
  hintCompany: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: fonts.uiSemiBold,
    fontSize: 37,
    lineHeight: 46,
    color: 'rgba(255,255,255,0.45)',
  },
  hintNamePaper: {
    left: 20,
    right: undefined,
    width: 243.6,
    fontSize: 25.3,
    lineHeight: 32,
  },
  hintCompanyPaper: {
    left: 20,
    right: undefined,
    width: 243.6,
    fontSize: 33.3,
    lineHeight: 42,
  },
  hintLogo: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  hintLogoPaper: {
    width: 33,
    height: 33,
    borderRadius: 7,
  },
  heading: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  titleRow: {
    height: 26,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  title: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 20,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  subtitleRow: {
    height: 24,
    marginTop: 17,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subtitle: {
    fontFamily: fonts.ui,
    fontSize: 15.5,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  close: {
    position: 'absolute',
    left: 16.7,
  },
  manual: {
    position: 'absolute',
    right: 20,
    height: 39.6,
    paddingLeft: 14.2,
    paddingRight: 20,
    borderRadius: 19.8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(28,28,28,0.8)',
  },
  manualText: {
    fontFamily: fonts.uiMedium,
    fontSize: 14,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 16.6,
    borderTopLeftRadius: 23.6,
    borderTopRightRadius: 23.6,
    backgroundColor: '#140A09',
  },
  modes: {
    marginHorizontal: 16.5,
    flexDirection: 'row',
    gap: 8.3,
  },
  mode: {
    flex: 1,
    height: 56,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#2B2B2B',
  },
  modeOn: {
    borderColor: '#FFFFFF',
  },
  modeText: {
    fontFamily: fonts.uiMedium,
    fontSize: 12.5,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  controls: {
    height: 72,
    marginTop: 32.5,
    paddingHorizontal: 63.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roundButton: {
    width: 48.4,
    height: 48.4,
    borderRadius: 24.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A3A3A',
  },
  roundButtonOn: {
    backgroundColor: '#FFFFFF',
  },
  shutter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterOff: {
    opacity: 0.3,
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
  },
});
