import { Pressable, StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

type ToggleProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  // "dark": black/grey pill switch (Edit card) · "coral": Material-style switch (Add Phone)
  // "m3": pill whose knob is small when off (Share card offline)
  // "onCoral": classic Android switch drawn on a coral screen (Send from Groowid)
  // "magenta": large pill switch on the contact forms; `disabled` shows it greyed out
  variant?: 'dark' | 'coral' | 'm3' | 'onCoral' | 'magenta';
  disabled?: boolean;
  accessibilityLabel?: string;
};

export function Toggle({ value, onValueChange, variant = 'dark', disabled = false, accessibilityLabel }: ToggleProps) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
      hitSlop={8}
      onPress={() => onValueChange(!value)}
      style={BOX[variant]}>
      <Track variant={variant} value={value} disabled={disabled} />
      <Thumb variant={variant} value={value} />
    </Pressable>
  );
}

type PartProps = { variant: NonNullable<ToggleProps['variant']>; value: boolean; disabled?: boolean };

function Track({ variant, value, disabled }: PartProps) {
  switch (variant) {
    case 'magenta':
      return (
        <View
          style={[styles.fill, styles.bigPill, { backgroundColor: value && !disabled ? '#C74291' : '#E3DCE4' }]}
        />
      );
    case 'coral':
      return <View style={[styles.coralTrack, { backgroundColor: value ? '#F9B8B4' : '#D6D6D6' }]} />;
    case 'onCoral':
      return (
        <View style={[styles.onCoralTrack, { backgroundColor: value ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.19)' }]} />
      );
    case 'm3':
      return <View style={[styles.fill, styles.pill, { backgroundColor: value ? '#000000' : '#D8DBE1' }]} />;
    default:
      return <View style={[styles.fill, styles.pill, { backgroundColor: value ? '#000000' : '#E1E3EA' }]} />;
  }
}

function Thumb({ variant, value }: PartProps) {
  switch (variant) {
    case 'magenta':
      return <View style={[styles.bigThumb, { left: value ? 22.5 : 3.5 }]} />;
    case 'coral':
      return (
        <View
          style={[styles.coralThumb, { left: value ? 9.4 : 0, backgroundColor: value ? colors.cardIcon : '#F5F5F5' }]}
        />
      );
    case 'onCoral':
      return <View style={[styles.onCoralThumb, { left: value ? 29.5 : 0 }]} />;
    case 'm3':
      return value ? <View style={[styles.m3Thumb, { right: 3.5 }]} /> : <View style={styles.m3ThumbOff} />;
    default:
      return <View style={[styles.darkThumb, { left: value ? 28.3 : 2.4 }]} />;
  }
}

const styles = StyleSheet.create({
  fill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  pill: {
    borderRadius: 13,
  },
  bigPill: {
    borderRadius: 16.3,
  },
  bigThumb: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
  darkThumb: {
    position: 'absolute',
    width: 21.2,
    height: 21.2,
    borderRadius: 10.6,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
  },
  coralTrack: {
    height: 14.2,
    borderRadius: 7.1,
    marginHorizontal: 2.4,
  },
  coralThumb: {
    position: 'absolute',
    width: 23.6,
    height: 23.6,
    borderRadius: 11.8,
    boxShadow: '0 1px 2px rgba(0,0,0,0.25)',
  },
  m3Thumb: {
    position: 'absolute',
    width: 19.2,
    height: 19.2,
    borderRadius: 9.6,
    backgroundColor: '#FFFFFF',
  },
  m3ThumbOff: {
    position: 'absolute',
    left: 6.1,
    width: 13.3,
    height: 13.3,
    borderRadius: 6.7,
    backgroundColor: '#FFFFFF',
  },
  onCoralTrack: {
    height: 13.6,
    marginLeft: 8,
    borderRadius: 6.8,
  },
  onCoralThumb: {
    position: 'absolute',
    width: 20.7,
    height: 20.7,
    borderRadius: 10.4,
    backgroundColor: '#FAFAFA',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
  },
});

const BOX = StyleSheet.create({
  dark: {
    width: 51.9,
    height: 26,
    justifyContent: 'center',
  },
  coral: {
    width: 33,
    height: 23.6,
    justifyContent: 'center',
  },
  m3: {
    width: 51.9,
    height: 26.3,
    justifyContent: 'center',
  },
  onCoral: {
    width: 50.2,
    height: 21.8,
    justifyContent: 'center',
  },
  magenta: {
    width: 52,
    height: 32.5,
    justifyContent: 'center',
  },
});
