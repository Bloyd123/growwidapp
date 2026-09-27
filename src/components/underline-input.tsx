import { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { colors, fonts } from '@/theme';

type UnderlineInputProps = Pick<
  TextInputProps,
  'value' | 'onChangeText' | 'placeholder' | 'keyboardType' | 'autoCapitalize' | 'autoCorrect'
> & {
  // Small caption above the line (Add field screens).
  label?: string;
  style?: StyleProp<ViewStyle>;
};

const webNoFocusRing = Platform.OS === 'web' ? ({ outlineStyle: 'none' } as unknown as TextStyle) : null;

// Single-line input with only a bottom rule; the rule turns black and thicker on focus.
export function UnderlineInput({ label, style, ...inputProps }: UnderlineInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={style}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        {...inputProps}
        placeholderTextColor="#6F6F6F"
        cursorColor="#000000"
        selectionColor="#000000"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[styles.input, webNoFocusRing]}
      />
      <View style={[styles.rule, focused && styles.ruleFocused]} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.ui,
    fontSize: 11.8,
    lineHeight: 15.3,
    color: '#000000',
  },
  input: {
    height: 35.4,
    paddingVertical: 0,
    paddingHorizontal: 0,
    fontFamily: fonts.ui,
    fontSize: 18.1,
    color: '#000000',
    includeFontPadding: false,
  },
  rule: {
    height: 1.8,
    backgroundColor: '#6F6F6F',
  },
  ruleFocused: {
    height: 2.4,
    backgroundColor: colors.inkDeep,
  },
});
