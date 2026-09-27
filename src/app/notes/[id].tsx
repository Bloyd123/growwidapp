import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CardDialog } from '@/components/card-dialog';
import { NoteSheet } from '@/components/contacts/note-sheet';
import { Toast } from '@/components/contacts/toast';
import { Icon, type IconName } from '@/components/icons';
import { LinkContactsPill, NoteTabs, type NoteTab } from '@/components/notes/note-parts';
import { NoteMenu } from '@/components/notes/note-menu';
import { goBack } from '@/lib/go-back';
import { useNotes, type TranscriptLine } from '@/state/notes';
import { fonts } from '@/theme';

const transcriptText = (lines: TranscriptLine[]) => lines.map((l) => `${l.speaker}: ${l.text}`).join('\n');

// One AI note: Summary / Transcript, copy, share (after a consent dialog) and ⋮ edits.
export default function NoteScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { notes, updateNote } = useNotes();
  const note = notes.find((n) => n.id === id);
  const [tab, setTab] = useState<NoteTab>('summary');
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState<'title' | 'summary' | null>(null);
  const [sharing, setSharing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!note) return null;

  const copy = () => {
    Clipboard.setStringAsync(tab === 'summary' ? note.summary : transcriptText(note.transcript)).catch(() => {});
    setToast('Copied to clipboard');
  };
  const share = () => {
    setSharing(false);
    Share.share({ title: note.title, message: `${note.title}\n\n${note.summary}` }).catch(() => {});
  };
  const edit = (field: 'title' | 'summary') => {
    setMenuOpen(false);
    setEditing(field);
  };
  const saveEdit = (text: string) => {
    if (editing) updateNote(note.id, { [editing]: text });
    setEditing(null);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <HeaderButton icon="chevronLeft" size={25} label="Back" onPress={() => goBack('/notes')} style={{ left: 10.4 }} />
        {tab === 'transcript' ? <HeaderButton icon="search" size={24.3} label="Search transcript" style={{ right: 155.7 }} /> : null}
        <HeaderButton icon="copy" size={25} label="Copy" onPress={copy} style={{ right: 107.4 }} />
        <HeaderButton icon="shareNodes" size={22.6} label="Share" onPress={() => setSharing(true)} style={{ right: 60.5 }} />
        <HeaderButton icon="moreVert" size={23.6} label="More" onPress={() => setMenuOpen(true)} style={{ right: 11.7 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + (tab === 'transcript' ? 120 : 40) }}>
        <Text style={styles.title}>{note.title}</Text>
        <LinkContactsPill style={styles.link} />
        <View style={styles.tabs}>
          <NoteTabs tab={tab} onChange={setTab} />
        </View>

        <View style={styles.content}>
          {tab === 'summary'
            ? note.summary.split('\n\n').map((block, i) => (
                <View key={i} style={i > 0 && styles.block}>
                  {block.split('\n').map((line, j) =>
                    line.startsWith('• ') ? (
                      <View key={j} style={styles.bullet}>
                        <Text style={[styles.body, styles.dot]}>•</Text>
                        <Text style={[styles.body, styles.bulletText]}>{line.slice(2)}</Text>
                      </View>
                    ) : (
                      <Text key={j} style={styles.body}>
                        {line}
                      </Text>
                    ),
                  )}
                </View>
              ))
            : note.transcript.map((line, i) => (
                <Text key={i} style={[styles.body, i > 0 && styles.block]}>
                  <Text style={styles.speaker}>{line.speaker}:</Text> {line.text}
                </Text>
              ))}
        </View>
      </ScrollView>

      {tab === 'transcript' ? (
        <Pressable accessibilityRole="button" style={[styles.play, { bottom: insets.bottom + 32.4 }]}>
          <View style={styles.playCircle}>
            <Icon name="play" size={19} color="#BDBDBD" />
          </View>
          <Icon name="crown" size={20} color="#000000" />
          <Text style={styles.playText}>Play audio</Text>
        </Pressable>
      ) : null}

      <Toast message={toast} top={insets.top + 10} />

      <NoteMenu visible={menuOpen} onEditTitle={() => edit('title')} onEditSummary={() => edit('summary')} onClose={() => setMenuOpen(false)} />
      <NoteSheet
        visible={editing !== null}
        heading={editing === 'title' ? 'Edit title' : 'Edit summary'}
        initialText={editing === 'title' ? note.title : note.summary}
        label={editing === 'title' ? 'Title' : 'Summary'}
        hint="Only you can see your notes"
        onSave={saveEdit}
        onClose={() => setEditing(null)}
      />
      <CardDialog
        visible={sharing}
        title="Before you share"
        body={
          'Anyone with this link can view this note. By sharing it, you confirm everyone in the conversation has agreed to it being shared.\n\nTo remove access for everyone, delete the note.'
        }
        actionGap={33.7}
        actions={[
          { label: 'Cancel', onPress: () => setSharing(false) },
          { label: 'Continue and share', onPress: share, bold: true },
        ]}
        onRequestClose={() => setSharing(false)}
      />
    </View>
  );
}

function HeaderButton({
  icon,
  size,
  label,
  onPress,
  style,
}: {
  icon: IconName;
  size: number;
  label: string;
  onPress?: () => void;
  style: { left?: number; right?: number };
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={10}
      onPress={onPress}
      style={[styles.headerButton, { top: 32.4 - size / 2 }, style]}>
      <Icon name={icon} size={size} color="#000000" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 64.4,
  },
  headerButton: {
    position: 'absolute',
  },
  title: {
    marginHorizontal: 16.5,
    fontFamily: fonts.uiSemiBold,
    fontSize: 27.9,
    color: '#000000',
  },
  link: {
    marginTop: 19.3,
  },
  tabs: {
    marginTop: 12.3,
  },
  content: {
    marginTop: 31,
    marginHorizontal: 16.5,
  },
  block: {
    marginTop: 18.9,
  },
  body: {
    fontFamily: fonts.ui,
    fontSize: 17.5,
    lineHeight: 28.3,
    color: '#000000',
  },
  bullet: {
    flexDirection: 'row',
  },
  dot: {
    width: 11.2,
    marginLeft: 1.2,
  },
  bulletText: {
    flex: 1,
  },
  speaker: {
    fontFamily: fonts.uiMedium,
  },
  play: {
    position: 'absolute',
    alignSelf: 'center',
    height: 62,
    paddingLeft: 5.5,
    paddingRight: 15.8,
    borderRadius: 31,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
  },
  playCircle: {
    width: 50,
    height: 50,
    marginRight: 18.2,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
  },
  playText: {
    marginLeft: 2.6,
    fontFamily: fonts.uiMedium,
    fontSize: 15.9,
    color: '#000000',
    includeFontPadding: false,
  },
});
