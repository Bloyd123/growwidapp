import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionSheet } from '@/components/contacts/action-sheet';
import { NoteSheet } from '@/components/contacts/note-sheet';
import { TagSheet } from '@/components/contacts/tag-sheet';
import { Toast } from '@/components/contacts/toast';
import { FieldIcon, Icon } from '@/components/icons';
import { goBack } from '@/lib/go-back';
import { shareContact } from '@/lib/share-contact';
import { contactConnectedAt, contactName, contactSubtitle, newContactValueId, useContacts } from '@/state/contacts';
import { fonts } from '@/theme';

const COVER_HEIGHT = 202.7;
const ACTIONS_HEIGHT = 44.1;

// Tapping a contact: cover, name and tags, connection date, details, notes and actions.
export default function ContactDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { contacts, tags, updateContact, setTags } = useContacts();
  const contact = contacts.find((c) => c.id === id);
  const [sheet, setSheet] = useState<'none' | 'more' | 'tag' | 'note'>('none');
  const [toastAt, setToastAt] = useState<number | null>(null);
  const [seenUpdate, setSeenUpdate] = useState(contact?.updatedAt);

  // Any change to this contact (here or on Edit contact) shows "Contact Updated".
  if (contact && contact.updatedAt !== seenUpdate) {
    setSeenUpdate(contact.updatedAt);
    setToastAt(contact.updatedAt ?? null);
  }
  useEffect(() => {
    if (toastAt === null) return;
    const timer = setTimeout(() => setToastAt(null), 2200);
    return () => clearTimeout(timer);
  }, [toastAt]);

  if (!contact) return null;
  const close = () => setSheet('none');
  const email = contact.emails[0]?.value;

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + ACTIONS_HEIGHT + 40 }]}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.cover, { height: insets.top + COVER_HEIGHT }]} />

        <View style={styles.top}>
          <Text style={styles.name}>{contactName(contact)}</Text>
          {contactSubtitle(contact) ? <Text style={styles.subtitle}>{contactSubtitle(contact)}</Text> : null}
          <View style={styles.tags}>
            {contact.tags.length === 0 ? (
              <Pressable accessibilityRole="button" onPress={() => setSheet('tag')} style={styles.addTagPill}>
                <Icon name="plus" size={17} color="#FFFFFF" />
                <Text style={styles.addTagPillText}>Add tag</Text>
              </Pressable>
            ) : (
              <>
                {contact.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
                <Pressable accessibilityRole="button" accessibilityLabel="Add tag" hitSlop={8} onPress={() => setSheet('tag')} style={styles.tagAdd}>
                  <Icon name="plus" size={17} color="#FFFFFF" />
                </Pressable>
              </>
            )}
          </View>
          <Text style={styles.connection}>Connection details</Text>
          <View style={styles.dateRow}>
            <Icon name="calendar" size={18.9} color="#4C4C4C" />
            <Text style={styles.date}>{contactConnectedAt(contact)}</Text>
          </View>
        </View>

        <View style={styles.lower}>
          {contact.emails.map((e) => (
            <InfoCard key={e.id} icon="mail" value={e.value} label={e.label || 'email'} />
          ))}
          {contact.phones.map((p) => (
            <InfoCard key={p.id} icon="phone" value={p.value} label={p.label || 'mobile'} />
          ))}

          <View style={styles.notes}>
            <Text style={styles.notesTitle}>Notes</Text>
            {contact.notes.length === 0 ? (
              <>
                <View style={styles.noteTile}>
                  <Icon name="stickyNote" size={25} color="#EF7C79" />
                </View>
                <Text style={styles.notesEmpty}>Write down a memorable reminder about your contact</Text>
              </>
            ) : (
              contact.notes.map((n) => (
                <View key={n.id} style={styles.note}>
                  <Text style={styles.noteText}>{n.text}</Text>
                </View>
              ))
            )}
            <Pressable accessibilityRole="button" onPress={() => setSheet('note')} style={styles.addNote}>
              <Icon name="plus" size={20} color="#000000" />
              <Text style={styles.addNoteText}>Add note</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Pressable accessibilityRole="button" accessibilityLabel="Back" hitSlop={8} onPress={() => goBack('/contacts')} style={[styles.round, styles.back, { top: insets.top + 16.6 }]}>
        <Icon name="arrowBack" size={22} color="#FFFFFF" />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Edit contact"
        hitSlop={8}
        onPress={() => router.push({ pathname: '/contacts/edit', params: { id: contact.id } })}
        style={[styles.round, styles.edit, { top: insets.top + 16.6 }]}>
        <Icon name="edit" size={20} color="#FFFFFF" />
      </Pressable>

      <View style={[styles.actions, { bottom: insets.bottom + 15.3 }]}>
        <Pressable accessibilityRole="button" onPress={() => setSheet('more')} style={[styles.action, styles.actionOutline]}>
          <Text style={styles.actionOutlineText}>More...</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => setSheet('tag')} style={[styles.action, styles.actionDark]}>
          <Text style={styles.actionDarkText}>Add tag</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => setSheet('note')} style={[styles.action, styles.actionDark]}>
          <Text style={styles.actionDarkText}>Add note</Text>
        </Pressable>
      </View>

      <Toast message={toastAt !== null ? 'Contact Updated' : null} top={insets.top + 2} />

      <ActionSheet
        visible={sheet === 'more'}
        onClose={close}
        rowHeight={52}
        paddingTop={7}
        actions={[
          { key: 'download', icon: <Icon name="download" size={30} color="#000000" />, label: 'Download contact to phone', onPress: () => {} },
          { key: 'share', icon: <Icon name="shareNodes" size={25} color="#000000" />, label: 'Share contact', onPress: () => shareContact(contact, false) },
          { key: 'company', icon: <Icon name="shareNodes" size={25} color="#000000" />, label: 'Share contact with company', onPress: () => shareContact(contact, true) },
          {
            key: 'email',
            icon: <Icon name="mail" size={22.7} color="#000000" />,
            label: 'Follow-up via email',
            onPress: () => {
              Linking.openURL(`mailto:${email ?? ''}`).catch(() => {});
            },
          },
        ]}
      />
      <TagSheet
        visible={sheet === 'tag'}
        allTags={Array.from(new Set([...tags, ...contact.tags]))}
        selected={contact.tags}
        onClose={close}
        onSave={(all, picked) => {
          setTags(all);
          updateContact(contact.id, { tags: picked.filter((t) => all.includes(t)) });
          close();
        }}
      />
      <NoteSheet
        visible={sheet === 'note'}
        onClose={close}
        onSave={(text) => {
          updateContact(contact.id, { notes: [...contact.notes, { id: newContactValueId(), text, createdAt: Date.now() }] });
          close();
        }}
      />
    </View>
  );
}

function InfoCard({ icon, value, label }: { icon: 'mail' | 'phone'; value: string; label: string }) {
  return (
    <View style={styles.info}>
      <View style={styles.infoIcon}>
        <FieldIcon name={icon} size={17} color="#FFFFFF" />
      </View>
      <View style={styles.infoText}>
        <Text style={styles.infoValue} numberOfLines={1}>
          {value}
        </Text>
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  content: {
    flexGrow: 1,
  },
  cover: {
    backgroundColor: '#000000',
  },
  top: {
    paddingHorizontal: 16.1,
    paddingTop: 11.4,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  name: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 27,
    lineHeight: 34,
    color: '#110705',
  },
  subtitle: {
    marginTop: 2,
    fontFamily: fonts.ui,
    fontSize: 15.5,
    color: '#4C4C4C',
  },
  tags: {
    marginTop: 22.4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10.6,
  },
  addTagPill: {
    height: 32.3,
    paddingLeft: 10.6,
    paddingRight: 13,
    borderRadius: 16.2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#110705',
  },
  addTagPillText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 13.7,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  tag: {
    height: 32.1,
    paddingHorizontal: 12.4,
    borderRadius: 16,
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
  },
  tagText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 13.6,
    color: '#110705',
    includeFontPadding: false,
  },
  tagAdd: {
    width: 23.6,
    height: 23.6,
    borderRadius: 11.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#110705',
  },
  connection: {
    marginTop: 19.5,
    fontFamily: fonts.ui,
    fontSize: 13.5,
    color: '#A2A2A2',
  },
  dateRow: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  date: {
    fontFamily: fonts.uiMedium,
    fontSize: 14.4,
    color: '#333333',
    includeFontPadding: false,
  },
  lower: {
    flex: 1,
    paddingHorizontal: 16.1,
    paddingTop: 16.2,
    gap: 17,
  },
  info: {
    height: 63.4,
    paddingLeft: 16,
    borderRadius: 9.4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  infoIcon: {
    width: 32.1,
    height: 32.1,
    borderRadius: 16.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#110705',
  },
  infoText: {
    flex: 1,
    marginLeft: 17,
  },
  infoValue: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15.3,
    color: '#000000',
  },
  infoLabel: {
    marginTop: 1,
    fontFamily: fonts.ui,
    fontSize: 13.6,
    color: '#4C4C4C',
  },
  notes: {
    paddingTop: 22.9,
    paddingHorizontal: 32.5,
    paddingBottom: 32.5,
    borderRadius: 9.4,
    backgroundColor: '#FFFFFF',
  },
  notesTitle: {
    marginLeft: 1.4,
    fontFamily: fonts.uiSemiBold,
    fontSize: 15,
    color: '#000000',
  },
  noteTile: {
    alignSelf: 'center',
    width: 47.2,
    height: 47.2,
    marginTop: 21.2,
    borderRadius: 9.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDECEC',
  },
  notesEmpty: {
    marginTop: 15.7,
    paddingHorizontal: 28,
    textAlign: 'center',
    fontFamily: fonts.ui,
    fontSize: 15.7,
    lineHeight: 24.4,
    color: '#A2A2A2',
  },
  note: {
    marginTop: 14,
    padding: 12.4,
    borderRadius: 9.4,
    backgroundColor: '#F7F7F7',
  },
  noteText: {
    fontFamily: fonts.ui,
    fontSize: 15.7,
    lineHeight: 22,
    color: '#1A1A1A',
  },
  addNote: {
    height: 44.1,
    marginTop: 17.7,
    borderRadius: 9.4,
    borderWidth: 1.2,
    borderColor: '#CFCFCF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9.4,
  },
  addNoteText: {
    fontFamily: fonts.uiMedium,
    fontSize: 15.8,
    color: '#000000',
    includeFontPadding: false,
  },
  round: {
    position: 'absolute',
    width: 32.3,
    height: 32.3,
    borderRadius: 16.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1C',
  },
  back: {
    left: 19.7,
  },
  edit: {
    right: 19.7,
  },
  actions: {
    position: 'absolute',
    left: 16.1,
    right: 16.1,
    height: ACTIONS_HEIGHT,
    flexDirection: 'row',
    gap: 7.9,
  },
  action: {
    flex: 1,
    borderRadius: 9.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionOutline: {
    borderWidth: 1.2,
    borderColor: '#CFCFCF',
    backgroundColor: '#FFFFFF',
  },
  actionOutlineText: {
    fontFamily: fonts.uiMedium,
    fontSize: 16.6,
    color: '#000000',
  },
  actionDark: {
    backgroundColor: '#110705',
  },
  actionDarkText: {
    fontFamily: fonts.uiMedium,
    fontSize: 15.8,
    color: '#FFFFFF',
  },
});
