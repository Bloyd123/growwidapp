import { useState, type ReactNode } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { Icon } from '@/components/icons';
import { colors, typography } from '@/theme';

export const FIELD_HEIGHT = 56;

type TextFieldProps = Pick<
  TextInputProps,
  | 'value'
  | 'onChangeText'
  | 'keyboardType'
  | 'autoCapitalize'
  | 'autoComplete'
  | 'autoCorrect'
  | 'multiline'
  | 'onFocus'
  | 'onBlur'
  | 'autoFocus'
> & {
  label: string;
  // Fixed text shown before the value once the label floats, e.g. "linkedin.com/in/".
  prefix?: string;
  labelAccessory?: ReactNode;
  leftIcon?: ReactNode;
  // Shows a trash button while focused (optional fields on the Edit card screen).
  onRemove?: () => void;
  // "account": cooler grey border/placeholder used on the create-account screen.
  tone?: 'default' | 'account';
  height?: number;
  style?: StyleProp<ViewStyle>;
};

// The browser draws its own focus ring around <input>; the outline View shows focus instead.
const webNoFocusRing = Platform.OS === 'web' ? ({ outlineStyle: 'none' } as unknown as TextStyle) : null;

// Outlined input whose label sits inside as a placeholder and floats into the border.
export function TextField({
  label,
  value = '',
  prefix,
  labelAccessory,
  leftIcon,
  onRemove,
  tone = 'default',
  height = FIELD_HEIGHT,
  multiline,
  style,
  onFocus,
  onBlur,
  ...inputProps
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const idleBorder = tone === 'account' ? '#BFC2C9' : colors.line;
  const placeholderColor = tone === 'account' ? '#676D79' : colors.placeholder;

  return (
    <View style={[styles.field, { height }, style]}>
      <View
        style={[
          StyleSheet.absoluteFill,
          styles.outline,
          focused ? styles.outlineFocused : { borderColor: idleBorder },
        ]}
      />

      <View style={[styles.row, leftIcon ? styles.rowWithIcon : null]}>
        {leftIcon}
        {floated && prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}
        <TextInput
          {...inputProps}
          multiline={multiline}
          value={value}
          placeholder={floated ? undefined : label}
          placeholderTextColor={placeholderColor}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          cursorColor={colors.inkDeep}
          selectionColor={colors.inkDeep}
          style={[styles.input, { height }, multiline && styles.multiline, webNoFocusRing]}
        />
        {onRemove && focused ? (
          <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${label}`} hitSlop={10} onPress={onRemove}>
            <Icon name="trash" size={26} color="#5C5C5C" />
          </Pressable>
        ) : null}
      </View>

      {floated && (
        <View style={styles.labelWrap}>
          <Text style={styles.label}>{label}</Text>
          {labelAccessory}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    justifyContent: 'center',
  },
  outline: {
    borderRadius: 9.4,
    borderWidth: 1,
    pointerEvents: 'none',
  },
  outlineFocused: {
    borderWidth: 2,
    borderColor: colors.inkDeep,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 17.1,
    paddingRight: 14.2,
  },
  rowWithIcon: {
    paddingLeft: 15.3,
    gap: 10.6,
  },
  prefix: {
    ...typography.field,
    marginRight: 4.7,
    color: colors.placeholder,
    includeFontPadding: false,
  },
  input: {
    ...typography.field,
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    color: colors.inkDeep,
    includeFontPadding: false,
  },
  multiline: {
    paddingTop: 18.9,
    textAlignVertical: 'top',
  },
  labelWrap: {
    position: 'absolute',
    pointerEvents: 'none',
    top: -6.5,
    left: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4.7,
    paddingHorizontal: 4.7,
    backgroundColor: colors.background,
  },
  label: {
    ...typography.fieldLabel,
    color: colors.inkDeep,
    includeFontPadding: false,
  },
});
