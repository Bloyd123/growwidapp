import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const CARD_COLORS = [
  '#F25C54',
  '#2D3035',
  '#F59447',
  '#EBB922',
  '#C1A870',
  '#3FAD16',
  '#13CCAC',
  '#1E88E5',
  '#5E5CE6',
  '#AF52DE',
  '#FF4F9A',
];

type ColorPickerProps = { value: string; onChange: (color: string) => void };

// Horizontal row of colour dots; the first "rainbow" dot stands for a custom colour.
export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      <View style={styles.slot}>
        <Rainbow />
      </View>
      {CARD_COLORS.map((color) => (
        <Pressable
          key={color}
          accessibilityRole="button"
          accessibilityLabel={`Card color ${color}`}
          accessibilityState={{ selected: color === value }}
          onPress={() => onChange(color)}
          style={[styles.slot, color === value && styles.selected]}>
          <View style={[styles.dot, { backgroundColor: color }]} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

// Colour-wheel dot drawn as 12 hue wedges.
function Rainbow() {
  const wedges = Array.from({ length: 12 }, (_, i) => {
    const a0 = (i / 12) * 2 * Math.PI;
    const a1 = ((i + 1) / 12) * 2 * Math.PI;
    const p = (a: number) => `${11.5 + 11.5 * Math.sin(a)} ${11.5 - 11.5 * Math.cos(a)}`;
    return { d: `M11.5 11.5L${p(a0)}A11.5 11.5 0 0 1 ${p(a1)}Z`, color: `hsl(${i * 30}, 85%, 55%)` };
  });
  return (
    <Svg width={27.1} height={27.1} viewBox="0 0 23 23">
      {wedges.map((w) => (
        <Path key={w.d} d={w.d} fill={w.color} />
      ))}
    </Svg>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15.9,
    gap: 16.3,
  },
  slot: {
    width: 37.8,
    height: 37.8,
    borderRadius: 18.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderWidth: 1.5,
    borderColor: '#7C7676',
  },
  dot: {
    width: 27.1,
    height: 27.1,
    borderRadius: 13.6,
  },
});
