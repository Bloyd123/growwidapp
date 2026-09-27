import { Fragment } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/icons';
import { TextField } from '@/components/text-field';
import { newContactValueId, type LabeledValue } from '@/state/contacts';
import { fonts } from '@/theme';

export const FIELD_GAP = 16.5;

// "Associated card" dropdown: coloured dot + card name, or a grey placeholder.
export function CardSelect({ name, color, onPress }: { name: string | null; color: string; onPress: () => void }) {
  return (
    <View>
      <Text style={styles.selectLabel}>Associated card</Text>
      <Pressable accessibilityRole="button" onPress={onPress} style={styles.select}>
        {name ? <View style={[styles.cardDot, { backgroundColor: color }]} /> : null}
        <Text style={[styles.selectText, !name && styles.selectPlaceholder]}>{name ?? 'Select a card'}</Text>
        <Icon name="caretDown" size={22.8} color="#000000" />
      </Pressable>
      <Text style={styles.selectHint}>Choose which of your cards to save this contact against.</Text>
    </View>
  );
}

// Grey "+ Phone" style chip under "Add more details".
export function AddDetailChip({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.chip}>
      <Icon name="plus" size={18} color="#000000" />
      <Text style={styles.chipText}>{label}</Text>
    </Pressable>
  );
}

type EmailGroupProps = {
  emails: LabeledValue[];
  onChange: (emails: LabeledValue[]) => void;
  // id of the email whose label field and trash are showing (the one being edited).
  activeId: string | null;
  onActivate: (id: string) => void;
  // Edit contact always offers "+ Add email"; New contact only while an email is being edited.
  alwaysShowAdd?: boolean;
  autoFocusId?: string | null;
};

// Email fields. The active one expands to show its Label field, a trash button and "+ Add email".
export function EmailGroup({ emails, onChange, activeId, onActivate, alwaysShowAdd, autoFocusId }: EmailGroupProps) {
  const patch = (id: string, change: Partial<LabeledValue>) =>
    onChange(emails.map((e) => (e.id === id ? { ...e, ...change } : e)));
  const active = emails.some((e) => e.id === activeId);

  return (
    <View>
      {emails.map((email, i) => {
        const expanded = email.id === activeId;
        return (
          <Fragment key={email.id}>
            <TextField
              label={expanded || !email.label ? 'Email' : `Email (${email.label})`}
              value={email.value}
              onChangeText={(value) => patch(email.id, { value })}
              onFocus={() => onActivate(email.id)}
              autoFocus={autoFocusId === email.id}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={i > 0 ? styles.gap : null}
            />
            {expanded ? (
              <>
                <TextField
                  label="Label"
                  value={email.label}
                  onChangeText={(label) => patch(email.id, { label })}
                  onFocus={() => onActivate(email.id)}
                  style={styles.labelField}
                />
                <View style={styles.trashRow}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Remove email"
                    hitSlop={10}
                    onPress={() => onChange(emails.filter((e) => e.id !== email.id))}>
                    <Icon name="trashFilled" size={21} color="#000000" />
                  </Pressable>
                </View>
              </>
            ) : null}
          </Fragment>
        );
      })}
      {alwaysShowAdd || active ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            const id = newContactValueId();
            onChange([...emails, { id, value: '', label: '' }]);
            onActivate(id);
          }}
          style={styles.addRow}>
          <Icon name="plus" size={19} color="#000000" />
          <Text style={styles.addText}>Add email</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

// Sticky bottom bar with the form's main button (greyed out until it can be used).
export function FormBottomBar({
  title,
  enabled,
  onPress,
  sparkle,
}: {
  title: string;
  enabled: boolean;
  onPress: () => void;
  sparkle?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const ink = enabled ? '#FFFFFF' : '#B0B0B0';
  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom + 15 }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !enabled }}
        disabled={!enabled}
        onPress={onPress}
        style={[styles.barButton, enabled && styles.barButtonOn]}>
        <Text style={[styles.barText, { color: ink }]}>{title}</Text>
        {sparkle ? <Icon name="sparkles" size={24} color={ink} /> : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  selectLabel: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15.6,
    lineHeight: 22,
    color: '#000000',
  },
  select: {
    height: 56.7,
    marginTop: 8,
    paddingLeft: 17.7,
    paddingRight: 10,
    borderRadius: 9.4,
    borderWidth: 1.2,
    borderColor: '#D8D8D8',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  cardDot: {
    width: 14.8,
    height: 14.8,
    marginRight: 14.8,
    borderRadius: 7.4,
  },
  selectText: {
    flex: 1,
    fontFamily: fonts.ui,
    fontSize: 15.9,
    color: '#000000',
    includeFontPadding: false,
  },
  selectPlaceholder: {
    fontSize: 15.4,
    color: '#8A8A8A',
  },
  selectHint: {
    marginTop: 7,
    fontFamily: fonts.ui,
    fontSize: 13.4,
    lineHeight: 19,
    color: '#4C4C4C',
  },
  chip: {
    height: 31.9,
    paddingLeft: 9.4,
    paddingRight: 12.4,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8E8E8',
  },
  chipText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 13.8,
    color: '#000000',
    includeFontPadding: false,
  },
  gap: {
    marginTop: FIELD_GAP,
  },
  labelField: {
    marginTop: 15,
  },
  trashRow: {
    height: 68.4,
    paddingRight: 13,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  addRow: {
    height: 44,
    marginTop: 3.4,
    paddingLeft: 19,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  addText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 13.8,
    color: '#000000',
    includeFontPadding: false,
  },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 23.6,
    paddingHorizontal: 15.9,
    borderTopLeftRadius: 18.9,
    borderTopRightRadius: 18.9,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
  },
  barButton: {
    height: 56,
    borderRadius: 9.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9.4,
    backgroundColor: '#F1F1F1',
  },
  barButtonOn: {
    backgroundColor: '#0E0403',
  },
  barText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 17.5,
    includeFontPadding: false,
  },
});
