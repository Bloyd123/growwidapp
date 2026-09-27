import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AddDetailChip, CardSelect, EmailGroup, FIELD_GAP, FormBottomBar } from '@/components/contacts/contact-form';
import { EnrichDialog } from '@/components/contacts/enrich-dialog';
import { Icon } from '@/components/icons';
import { TextField } from '@/components/text-field';
import { Toggle } from '@/components/toggle';
import { goBack } from '@/lib/go-back';
import { newContactValueId, useContacts, type LabeledValue } from '@/state/contacts';
import { useProfile } from '@/state/profile';
import { fonts } from '@/theme';

type Extra = 'phone' | 'email' | 'link' | 'address' | 'jobTitle';
// Chip order under "Add more details".
const EXTRAS: { key: Extra; label: string }[] = [
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'link', label: 'Link' },
  { key: 'address', label: 'Address' },
  { key: 'jobTitle', label: 'Job title' },
];

const HEADER_HEIGHT = 63.8;

// "+" on Contacts: name and company, optional extra fields, and preferences.
export default function NewContactScreen() {
  const insets = useSafeAreaInsets();
  const { card } = useProfile();
  const { addContact } = useContacts();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [emails, setEmails] = useState<LabeledValue[]>([]);
  const [phone, setPhone] = useState('');
  const [link, setLink] = useState('');
  const [address, setAddress] = useState('');
  const [shown, setShown] = useState<Extra[]>([]);
  const [focus, setFocus] = useState<Extra | null>(null);
  const [activeEmail, setActiveEmail] = useState<string | null>(null);
  const [cardName, setCardName] = useState<string | null>(card.name);
  const [emailMyCard, setEmailMyCard] = useState(true);
  const [enrich, setEnrich] = useState(true);
  const [enrichInfo, setEnrichInfo] = useState(false);

  const hasEmail = emails.some((e) => e.value.trim());
  const canCreate = Boolean(firstName.trim() || lastName.trim());

  const add = (key: Extra) => {
    setShown((prev) => [...prev, key]);
    setFocus(key);
    if (key === 'email') {
      const id = newContactValueId();
      setEmails([{ id, value: '', label: '' }]);
      setActiveEmail(id);
    } else {
      setActiveEmail(null);
    }
  };
  const onEmailsChange = (next: LabeledValue[]) => {
    setEmails(next);
    if (next.length === 0) {
      setShown((prev) => prev.filter((k) => k !== 'email'));
      setActiveEmail(null);
    }
  };
  const other = () => setActiveEmail(null);

  const create = () => {
    addContact({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      company: company.trim(),
      jobTitle: jobTitle.trim(),
      emails: emails.filter((e) => e.value.trim()),
      phones: phone.trim() ? [{ id: newContactValueId(), value: phone.trim(), label: '' }] : [],
      link: link.trim(),
      address: address.trim(),
      cardName,
    });
    goBack('/contacts');
  };

  const is = (key: Extra) => shown.includes(key);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close" hitSlop={12} onPress={() => goBack('/contacts')} style={styles.close}>
          <Icon name="close" size={24.2} color="#000000" />
        </Pressable>
        <Text style={styles.title}>New contact</Text>
        <Pressable accessibilityRole="button" style={styles.scan}>
          <Icon name="tabScan" size={19.7} color="#000000" />
          <Text style={styles.scanText}>Scan</Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}>
          <View style={styles.form}>
            <View style={styles.nameRow}>
              <TextField label="First name" value={firstName} onChangeText={setFirstName} onFocus={other} autoFocus style={styles.flex} />
              <TextField label="Last name" value={lastName} onChangeText={setLastName} onFocus={other} style={styles.flex} />
            </View>
            <TextField label="Company" value={company} onChangeText={setCompany} onFocus={other} style={styles.gap} />
            {is('jobTitle') ? (
              <TextField label="Job title" value={jobTitle} onChangeText={setJobTitle} onFocus={other} autoFocus={focus === 'jobTitle'} style={styles.gap} />
            ) : null}
            {is('email') ? (
              <View style={styles.gap}>
                <EmailGroup
                  emails={emails}
                  onChange={onEmailsChange}
                  activeId={activeEmail}
                  onActivate={setActiveEmail}
                  autoFocusId={focus === 'email' ? activeEmail : null}
                />
              </View>
            ) : null}
            {is('phone') ? (
              <TextField label="Phone" value={phone} onChangeText={setPhone} onFocus={other} keyboardType="phone-pad" autoFocus={focus === 'phone'} style={styles.gap} />
            ) : null}
            {is('link') ? (
              <TextField label="Link" value={link} onChangeText={setLink} onFocus={other} autoCapitalize="none" autoFocus={focus === 'link'} style={styles.gap} />
            ) : null}
            {is('address') ? (
              <TextField label="Address" value={address} onChangeText={setAddress} onFocus={other} autoFocus={focus === 'address'} style={styles.gap} />
            ) : null}

            {shown.length < EXTRAS.length ? (
              <>
                <Text style={styles.more}>Add more details</Text>
                <View style={styles.chips}>
                  {EXTRAS.filter((e) => !is(e.key)).map((e) => (
                    <AddDetailChip key={e.key} label={e.label} onPress={() => add(e.key)} />
                  ))}
                </View>
              </>
            ) : null}
          </View>

          <View style={styles.prefs}>
            <Text style={styles.prefsTitle}>Preferences</Text>
            <View style={styles.prefsCard}>
              <CardSelect name={cardName} color={card.color} onPress={() => setCardName((n) => (n ? null : card.name))} />
            </View>
            <View style={[styles.prefRow, styles.prefRowFirst]}>
              <Text style={styles.prefText}>Email my card</Text>
              <Toggle variant="magenta" value={emailMyCard} disabled={!hasEmail} onValueChange={setEmailMyCard} accessibilityLabel="Email my card" />
            </View>
            <View style={styles.prefRow}>
              <Text style={styles.prefText}>Enrich this contact?</Text>
              <Pressable accessibilityRole="button" accessibilityLabel="About enrichment" hitSlop={10} onPress={() => setEnrichInfo(true)} style={styles.info}>
                <Icon name="info" size={20} color="#000000" />
              </Pressable>
              <View style={styles.flex} />
              <Toggle variant="magenta" value={enrich} onValueChange={setEnrich} accessibilityLabel="Enrich this contact" />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <FormBottomBar title={enrich ? 'Create & enrich' : 'Create'} enabled={canCreate} onPress={create} sparkle={enrich} />
      <EnrichDialog visible={enrichInfo} onClose={() => setEnrichInfo(false)} />
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
    height: HEADER_HEIGHT,
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
    fontSize: 19.5,
    color: '#000000',
    includeFontPadding: false,
  },
  scan: {
    position: 'absolute',
    right: 16.5,
    top: 11.8,
    height: 39.6,
    paddingLeft: 11.8,
    paddingRight: 19.5,
    borderRadius: 19.8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7.1,
    backgroundColor: '#DEDEDE',
  },
  scanText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 13.4,
    color: '#000000',
    includeFontPadding: false,
  },
  form: {
    paddingTop: 8.2,
    paddingHorizontal: 15.9,
    paddingBottom: 40.7,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 16,
  },
  gap: {
    marginTop: FIELD_GAP,
  },
  more: {
    marginTop: 40,
    marginLeft: 0.6,
    fontFamily: fonts.uiSemiBold,
    fontSize: 13.8,
    color: '#909090',
  },
  chips: {
    marginTop: 17,
    marginLeft: 0.6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16.5,
    rowGap: 15.9,
  },
  prefs: {
    minHeight: 520,
    paddingTop: 23.5,
    paddingHorizontal: 16.5,
    backgroundColor: '#F4F4F4',
  },
  prefsTitle: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 17.6,
    lineHeight: 24,
    color: '#8F8F8F',
  },
  prefsCard: {
    marginTop: 16,
    marginHorizontal: -0.6,
  },
  prefRow: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4.5,
  },
  prefRowFirst: {
    marginTop: 19.5,
  },
  prefText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15.5,
    color: '#000000',
    includeFontPadding: false,
  },
  info: {
    marginLeft: 13,
  },
});
