import { AudioModule } from 'expo-audio';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View, type TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/icons';
import { ConsentSheet } from '@/components/notes/consent-sheet';
import { InfoSheet } from '@/components/notes/info-sheet';
import { NoteRow } from '@/components/notes/note-row';
import { HeroCopy, HeroStage } from '@/components/notes/notes-mocks';
import { RECORD_FOOTER_HEIGHT, RecordFooter } from '@/components/notes/record-footer';
import { SideMenu } from '@/components/side-menu';
import { TAB_BAR_HEIGHT, TabBar } from '@/components/tab-bar';
import { noteSection, useNotes, type Note } from '@/state/notes';
import { fonts } from '@/theme';

const webNoFocusRing = Platform.OS === 'web' ? ({ outlineStyle: 'none' } as unknown as TextStyle) : null;

// AI Notetaker tab: an intro before the first note, then the searchable Notes list.
export default function NotesScreen() {
  const insets = useSafeAreaInsets();
  const { notes, consented, setConsented } = useNotes();
  const [query, setQuery] = useState('');
  const [consentOpen, setConsentOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Mic permission (system dialog), then the recording screen.
  const beginRecording = async () => {
    const permission = await AudioModule.requestRecordingPermissionsAsync().catch(() => null);
    if (permission?.granted) router.push('/notes/record');
  };
  const start = () => {
    if (consented) beginRecording();
    else setConsentOpen(true);
  };
  const accept = () => {
    setConsentOpen(false);
    setConsented(true);
    beginRecording();
  };

  const sheets = (
    <>
      <ConsentSheet visible={consentOpen} onAccept={accept} onClose={() => setConsentOpen(false)} />
      <InfoSheet visible={infoOpen} onClose={() => setInfoOpen(false)} />
      <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );

  if (notes.length === 0) {
    return (
      <View style={styles.screen}>
        <HeroStage height={insets.top + 462.4} topInset={insets.top} />
        <HeroCopy style={styles.heroCopy} />
        <RecordFooter onStart={start} />
        <TabBar active="notetaker" />
        {sheets}
      </View>
    );
  }

  const q = query.trim().toLowerCase();
  const sections: { title: string; notes: Note[] }[] = [];
  for (const note of notes) {
    if (q && !note.title.toLowerCase().includes(q)) continue;
    const title = noteSection(note);
    const last = sections[sections.length - 1];
    if (last?.title === title) last.notes.push(note);
    else sections.push({ title, notes: [note] });
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel="Open menu" hitSlop={10} onPress={() => setMenuOpen(true)} style={styles.menu}>
          <View style={styles.menuBar} />
          <View style={styles.menuBar} />
          <View style={styles.menuBar} />
        </Pressable>
        <Text style={styles.title}>Notes</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="About AI Notetaker" hitSlop={8} onPress={() => setInfoOpen(true)} style={styles.info}>
          <Icon name="info" size={24.2} color="#000000" />
        </Pressable>
      </View>
      <View style={styles.search}>
        <Icon name="searchOutline" size={27} color="#3A3D45" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search"
          placeholderTextColor="#6B6E77"
          autoCorrect={false}
          cursorColor="#000000"
          selectionColor="#000000"
          style={[styles.searchInput, webNoFocusRing]}
        />
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={{ paddingBottom: RECORD_FOOTER_HEIGHT + TAB_BAR_HEIGHT + insets.bottom + 16 }}
        keyboardShouldPersistTaps="handled">
        {sections.map((section) => (
          <View key={section.title}>
            <Text style={styles.section}>{section.title}</Text>
            <View style={styles.cards}>
              {section.notes.map((note) => (
                <NoteRow
                  key={note.id}
                  note={note}
                  onPress={() => note.status === 'done' && router.push({ pathname: '/notes/[id]', params: { id: note.id } })}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <LinearGradient
        colors={['rgba(255,255,255,0)', '#FFFFFF']}
        style={[styles.fade, { bottom: TAB_BAR_HEIGHT + insets.bottom }]}
      />
      <RecordFooter onStart={start} lightPill />
      <TabBar active="notetaker" />
      {sheets}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroCopy: {
    marginTop: 36.9,
  },
  header: {
    height: 64.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    position: 'absolute',
    left: 18.9,
    top: 26,
    width: 18.3,
    gap: 3.2,
  },
  menuBar: {
    height: 2.9,
    borderRadius: 1.2,
    backgroundColor: '#000000',
  },
  title: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 19.6,
    color: '#000000',
    includeFontPadding: false,
  },
  info: {
    position: 'absolute',
    right: 15.5,
    top: 20.2,
  },
  search: {
    height: 56,
    marginHorizontal: 15.9,
    marginBottom: 13,
    paddingLeft: 11.5,
    borderRadius: 9.4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F1F5',
  },
  searchInput: {
    flex: 1,
    height: 56,
    marginLeft: 15.7,
    paddingVertical: 0,
    fontFamily: fonts.ui,
    fontSize: 15.2,
    color: '#000000',
  },
  list: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  section: {
    marginTop: 7.3,
    marginLeft: 15.9,
    fontFamily: fonts.ui,
    fontSize: 16,
    color: '#939393',
  },
  cards: {
    marginTop: 9.6,
    marginBottom: 11.8,
    gap: 12.4,
  },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 172,
    pointerEvents: 'none',
  },
});
