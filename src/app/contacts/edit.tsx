import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CardSelect, EmailGroup, FIELD_GAP, FormBottomBar } from '@/components/contacts/contact-form';
import { Icon } from '@/components/icons';
import { TextField } from '@/components/text-field';
import { goBack } from '@/lib/go-back';
import { newContactValueId, useContacts, type Contact, type LabeledValue } from '@/state/contacts';
import { useProfile } from '@/state/profile';
import { fonts } from '@/theme';

type Draft = Pick<Contact, 'firstName' | 'lastName' | 'company' | 'jobTitle' | 'link' | 'address' | 'cardName'> & {
  emails: LabeledValue[];
  phone: string;
};

function draftOf(c: Contact): Draft {
  return {
    firstName: c.firstName,
    lastName: c.lastName,
    company: c.company,
    jobTitle: c.jobTitle,
    link: c.link,
    address: c.address,
    cardName: c.cardName,
    emails: c.emails.length ? c.emails : [{ id: newContactValueId(), value: '', label: '' }],
    phone: c.phones[0]?.value ?? '',
  };
}

// ✏ on a contact: every field at once; "Save edits" turns on after a change.
export default function EditContactScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { contacts, updateContact } = useContacts();
  const { card } = useProfile();
  const contact = contacts.find((c) => c.id === id);
  const [initial] = useState(() => (contact ? JSON.stringify(draftOf(contact)) : ''));
  const [draft, setDraft] = useState<Draft | null>(() => (contact ? draftOf(contact) : null));
  const [activeEmail, setActiveEmail] = useState<string | null>(null);

  if (!contact || !draft) return null;
  const set = (patch: Partial<Draft>) => setDraft({ ...draft, ...patch });
  const other = () => setActiveEmail(null);
  const dirty = JSON.stringify(draft) !== initial;

  const save = () => {
    updateContact(contact.id, {
      firstName: draft.firstName.trim(),
      lastName: draft.lastName.trim(),
      company: draft.company.trim(),
      jobTitle: draft.jobTitle.trim(),
      link: draft.link.trim(),
      address: draft.address.trim(),
      cardName: draft.cardName,
      emails: draft.emails.filter((e) => e.value.trim()),
      phones: draft.phone.trim()
        ? [{ id: contact.phones[0]?.id ?? newContactValueId(), value: draft.phone.trim(), label: contact.phones[0]?.label ?? '' }]
        : [],
    });
    goBack('/contacts');
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close" hitSlop={12} onPress={() => goBack('/contacts')} style={styles.close}>
          <Icon name="close" size={24.2} color="#000000" />
        </Pressable>
        <Text style={styles.title}>Edit contact</Text>
      </View>

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}>
          <View style={styles.cover} />
          <View style={styles.enrich}>
            <Icon name="sparkles" size={23.6} color="#FFFFFF" />
            <Text style={styles.enrichText}>Add a company to enrich</Text>
            <Pressable accessibilityRole="button" style={styles.addCompany}>
              <Icon name="plus" size={18} color="#000000" />
              <Text style={styles.addCompanyText}>Add company</Text>
            </Pressable>
          </View>

          <View style={styles.form}>
            <CardSelect
              name={draft.cardName}
              color={card.color}
              onPress={() => set({ cardName: draft.cardName ? null : card.name })}
            />
            <TextField label="First name" value={draft.firstName} onChangeText={(firstName) => set({ firstName })} onFocus={other} style={styles.firstField} />
            <TextField label="Last name" value={draft.lastName} onChangeText={(lastName) => set({ lastName })} onFocus={other} style={styles.gap} />
            <TextField label="Company" value={draft.company} onChangeText={(company) => set({ company })} onFocus={other} style={styles.gap} />
            <TextField label="Job title" value={draft.jobTitle} onChangeText={(jobTitle) => set({ jobTitle })} onFocus={other} style={styles.gap} />
            <View style={styles.gap}>
              <EmailGroup
                emails={draft.emails}
                onChange={(emails) => set({ emails: emails.length ? emails : [{ id: newContactValueId(), value: '', label: '' }] })}
                activeId={activeEmail}
                onActivate={setActiveEmail}
                alwaysShowAdd
              />
            </View>
            <TextField label="Phone" value={draft.phone} onChangeText={(phone) => set({ phone })} onFocus={other} keyboardType="phone-pad" style={styles.afterEmail} />
            <TextField label="Link" value={draft.link} onChangeText={(link) => set({ link })} onFocus={other} autoCapitalize="none" style={styles.gap} />
            <TextField label="Address" value={draft.address} onChangeText={(address) => set({ address })} onFocus={other} style={styles.gap} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <FormBottomBar title="Save edits" enabled={dirty} onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flex: {
    flex: 1,
  },
  header: {
    height: 63.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    left: 16.3,
    top: 19.8,
  },
  title: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 20,
    color: '#000000',
    includeFontPadding: false,
  },
  cover: {
    height: 101.5,
    backgroundColor: '#000000',
  },
  enrich: {
    height: 64.9,
    paddingLeft: 16.5,
    paddingRight: 16.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#140706',
  },
  enrichText: {
    flex: 1,
    marginLeft: 9,
    fontFamily: fonts.uiSemiBold,
    fontSize: 13.6,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  addCompany: {
    height: 39.5,
    paddingLeft: 13,
    paddingRight: 19.5,
    borderRadius: 9.4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10.6,
    backgroundColor: '#FFFFFF',
  },
  addCompanyText: {
    fontFamily: fonts.uiMedium,
    fontSize: 13.6,
    color: '#000000',
    includeFontPadding: false,
  },
  form: {
    paddingTop: 31.6,
    paddingHorizontal: 15.9,
  },
  firstField: {
    marginTop: 25,
  },
  gap: {
    marginTop: FIELD_GAP,
  },
  afterEmail: {
    marginTop: 8,
  },
});
