import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { ColorPicker } from '@/components/edit-card/color-picker';
import { EditCardHeader } from '@/components/edit-card/edit-header';
import { EntryList } from '@/components/edit-card/entry-list';
import { ImagesSection } from '@/components/edit-card/images-section';
import { PersonalDetails } from '@/components/edit-card/personal-details';
import { QrSettings } from '@/components/edit-card/qr-settings';
import { Section, SectionGap } from '@/components/edit-card/section';
import { goBack } from '@/lib/go-back';
import { useCardDraft } from '@/state/card-draft';
import { cardUrl, useProfile, type Card, type Entry } from '@/state/profile';
import { colors, fonts } from '@/theme';

export default function EditCardScreen() {
  const insets = useSafeAreaInsets();
  const { saveCard } = useProfile();
  const { draft, dirty, change } = useCardDraft();
  const [confirmDiscard, setConfirmDiscard] = useState(false);

  const patch = (p: Partial<Card>) => change((card) => ({ ...card, ...p }));
  const patchEntry = (id: string, p: Partial<Entry>) =>
    change((card) => ({ ...card, entries: card.entries.map((e) => (e.id === id ? { ...e, ...p } : e)) }));
  const removeEntry = (id: string) =>
    change((card) => ({ ...card, entries: card.entries.filter((e) => e.id !== id) }));

  const save = () => {
    saveCard(draft);
    goBack('/my-card');
  };
  const cancel = () => (dirty ? setConfirmDiscard(true) : goBack('/my-card'));

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <EditCardHeader name={draft.name} onRename={(name) => patch({ name })} onCancel={cancel} onSave={save} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={styles.flex} keyboardShouldPersistTaps="handled">
          <Section title="Card color" style={styles.colorSection}>
            <View style={styles.colors}>
              <ColorPicker value={draft.color} onChange={(color) => patch({ color })} />
            </View>
          </Section>
          <SectionGap />
          <ImagesSection card={draft} onChange={patch} />
          <SectionGap />
          <PersonalDetails card={draft} onChange={patch} />
          <View style={styles.entries}>
            <EntryList
              entries={draft.entries}
              color={draft.color}
              onChange={patchEntry}
              onRemove={removeEntry}
              onAdd={(type) => router.push({ pathname: '/edit-card/add-field', params: { type } })}
            />
          </View>
          <QrSettings card={draft} qrValue={cardUrl(draft)} onChange={patch} />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20.7 }]}>
        <Button title="Preview card" height={58.4} style={styles.preview} labelStyle={styles.previewLabel} />
      </View>

      <ConfirmDialog
        visible={confirmDiscard}
        title="Unsaved Changes"
        message="Are you sure you want to discard changes?"
        onCancel={() => setConfirmDiscard(false)}
        onConfirm={() => {
          setConfirmDiscard(false);
          goBack('/my-card');
        }}
      />
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
  colorSection: {
    paddingTop: 13,
  },
  colors: {
    marginTop: 20.7,
  },
  entries: {
    backgroundColor: colors.background,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 16.5,
    paddingHorizontal: 20.1,
    borderTopLeftRadius: 18.9,
    borderTopRightRadius: 18.9,
    backgroundColor: colors.background,
    boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
  },
  preview: {
    backgroundColor: '#000000',
  },
  previewLabel: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 17.9,
  },
});
