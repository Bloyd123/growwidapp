import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Chip } from '@/components/chip';
import { AddFieldHeader } from '@/components/edit-card/edit-header';
import { FieldIcon, Icon } from '@/components/icons';
import { Toggle } from '@/components/toggle';
import { UnderlineInput } from '@/components/underline-input';
import { fieldType, type EntryType } from '@/data/field-types';
import { goBack } from '@/lib/go-back';
import { useCardDraft } from '@/state/card-draft';
import { newEntryId } from '@/state/profile';
import { colors, fonts } from '@/theme';

// "Add Phone / Add Company Website / Add Venmo…": type a value, pick a title, Save into the draft.
export default function AddFieldScreen() {
  const insets = useSafeAreaInsets();
  const { type } = useLocalSearchParams<{ type: EntryType }>();
  const config = fieldType(type);
  const { draft, change } = useCardDraft();
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [ext, setExt] = useState('');
  const [international, setInternational] = useState(true);
  const isPhone = config.type === 'phone';
  const canSave = value.trim().length > 0;

  const save = () => {
    const entry = { id: newEntryId(), type: config.type, value: value.trim(), title: title.trim(), ext: ext.trim() };
    change((card) => ({ ...card, entries: [...card.entries, entry] }));
    goBack('/edit-card');
  };

  const previewText = isPhone ? `+91${value ? ` ${value}` : ''}` : title || 'Title';
  const previewIsPlaceholder = !isPhone && !title;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <AddFieldHeader title={config.addTitle} canSave={canSave} onBack={() => goBack('/edit-card')} onSave={save} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.preview}>
          <View style={[styles.previewDot, { backgroundColor: draft.color }]}>
            <FieldIcon name={config.icon} size={24.8} color="#FFFFFF" />
          </View>
          <Text style={[styles.previewText, previewIsPlaceholder && styles.placeholder]}>{previewText}</Text>
        </View>

        <View style={styles.form}>
          {isPhone ? (
            <>
              <View style={styles.phoneRow}>
                <View style={styles.country}>
                  <Text style={styles.flag}>{'\u{1F1EE}\u{1F1F3}'}</Text>
                  <Text style={styles.code}>+91</Text>
                  <Icon name="caretDown" size={18.9} color="#555555" />
                </View>
                <UnderlineInput
                  label={config.inputLabel}
                  value={value}
                  onChangeText={setValue}
                  keyboardType="phone-pad"
                  style={styles.flex}
                />
                <UnderlineInput value={ext} onChangeText={setExt} placeholder="Ext." keyboardType="phone-pad" style={styles.ext} />
              </View>
              <View style={styles.international}>
                <Toggle variant="coral" value={international} onValueChange={setInternational} />
                <Text style={styles.internationalText}>Use international number</Text>
              </View>
            </>
          ) : (
            <UnderlineInput
              label={config.inputLabel}
              value={value}
              onChangeText={setValue}
              keyboardType={config.keyboardType}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.mainField}
            />
          )}

          <UnderlineInput
            value={title}
            onChangeText={setTitle}
            placeholder={config.titleField === 'label' ? 'Label (optional)' : 'Title'}
            style={isPhone ? styles.phoneTitle : styles.title}
          />
          <Text style={styles.suggestHint}>Here are some suggestions for your {config.titleField}:</Text>
          <View style={styles.suggestions}>
            {config.suggestions.map((s) => (
              <Chip key={s} label={s} height={37.2} onPress={() => setTitle(s)} style={styles.suggestion} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  preview: {
    marginTop: 17.1,
    height: 79.1,
    borderTopWidth: 7,
    borderBottomWidth: 6.5,
    borderColor: '#F7E9E8',
    paddingLeft: 17.7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewDot: {
    width: 47.2,
    height: 47.2,
    borderRadius: 23.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: {
    marginLeft: 21.2,
    fontFamily: fonts.uiMedium,
    fontSize: 15.3,
    color: '#000000',
  },
  placeholder: {
    color: '#8A8A8A',
  },
  form: {
    paddingHorizontal: 21.2,
  },
  phoneRow: {
    marginTop: 53.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8.3,
  },
  country: {
    height: 37.2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7.1,
    marginRight: 2.4,
  },
  flag: {
    fontSize: 20.1,
  },
  code: {
    fontFamily: fonts.ui,
    fontSize: 14.8,
    color: '#000000',
  },
  ext: {
    width: 73.2,
  },
  international: {
    marginTop: 17.1,
    marginLeft: 7.1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15.9,
  },
  internationalText: {
    fontFamily: fonts.ui,
    fontSize: 14.3,
    color: '#585858',
  },
  mainField: {
    marginTop: 53.1,
  },
  title: {
    marginTop: 66.7,
  },
  phoneTitle: {
    marginTop: 33.6,
  },
  suggestHint: {
    marginTop: 25.4,
    fontFamily: fonts.ui,
    fontStyle: 'italic',
    fontSize: 16,
    color: '#000000',
  },
  suggestions: {
    marginTop: 12.4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7.1,
  },
  suggestion: {
    borderColor: '#555555',
  },
});
