import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type TranscriptLine = { speaker: string; text: string };

export type Note = {
  id: string;
  title: string;
  // Paragraphs separated by blank lines; lines starting with "• " are bullets.
  summary: string;
  transcript: TranscriptLine[];
  createdAt: number;
  status: 'summarizing' | 'done';
};

// Frontend only: every recording is "summarized" into this sample result from the reference.
const SAMPLE_TITLE = 'No clear insights found';
const SAMPLE_SUMMARY = [
  "It looks like there wasn't enough clear conversation to create a meaningful summary.",
  'This can happen when:',
  [
    '• The recording is very short or contains only setup chatter',
    '• The mic did not pick up any usable speech',
    '• The discussion ended before a full exchange took place',
    '• Background noise was captured instead of voices',
  ].join('\n'),
  'For better results, try recording a longer session with clearer audio. A longer or more structured conversation helps me extract:',
  ['• Key discussion points', '• Decisions or next steps', '• Topics covered', '• People mentioned and their context'].join('\n'),
  "Feel free to try again when you're ready.",
].join('\n\n');
const SAMPLE_TRANSCRIPT: TranscriptLine[] = [{ speaker: 'Speaker A', text: 'Hello, hi, hi.' }];
const SUMMARIZE_MS = 3000;

type NotesContextValue = {
  notes: Note[];
  // Accepted the "Welcome to AI Notetaker!" terms.
  consented: boolean;
  setConsented: (value: boolean) => void;
  // Saves a finished recording as "New note" and fills in the summary a moment later.
  // A title typed while recording is kept.
  addRecording: (title?: string) => string;
  updateNote: (id: string, patch: Partial<Note>) => void;
  // Back to no notes (sign out).
  reset: () => void;
};

const NotesContext = createContext<NotesContextValue | null>(null);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [consented, setConsented] = useState(false);

  const value = useMemo<NotesContextValue>(() => {
    const updateNote = (id: string, patch: Partial<Note>) =>
      setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...patch } : n)));
    return {
      notes,
      consented,
      setConsented,
      addRecording: (title) => {
        const id = `n${Date.now().toString(36)}`;
        setNotes((prev) => [
          { id, title: title || 'New note', summary: '', transcript: [], createdAt: Date.now(), status: 'summarizing' },
          ...prev,
        ]);
        setTimeout(
          () =>
            updateNote(id, {
              title: title || SAMPLE_TITLE,
              summary: SAMPLE_SUMMARY,
              transcript: SAMPLE_TRANSCRIPT,
              status: 'done',
            }),
          SUMMARIZE_MS,
        );
        return id;
      },
      updateNote,
      reset: () => {
        setNotes([]);
        setConsented(false);
      },
    };
  }, [notes, consented]);

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes() {
  const value = useContext(NotesContext);
  if (!value) throw new Error('useNotes must be used inside NotesProvider');
  return value;
}

// "10:11 pm"
export function noteTime(createdAt: number) {
  const d = new Date(createdAt);
  const h = d.getHours() % 12 || 12;
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m} ${d.getHours() < 12 ? 'am' : 'pm'}`;
}

// List section: notes still being summarized sit under "Just now", the rest by day.
export function noteSection(note: Note) {
  if (note.status === 'summarizing') return 'Just now';
  const now = Date.now();
  const day = (t: number) => new Date(t).toDateString();
  if (day(note.createdAt) === day(now)) return 'Today';
  if (day(note.createdAt) === day(now - 86400000)) return 'Yesterday';
  return new Date(note.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
}
