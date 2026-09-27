import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type ContactSource = 'Exchanged' | 'Imported' | 'Manual' | 'Scanned' | 'Shared back';
export const CONTACT_SOURCES: ContactSource[] = ['Exchanged', 'Imported', 'Manual', 'Scanned', 'Shared back'];

export type LabeledValue = { id: string; value: string; label: string };
export type ContactNote = { id: string; text: string; createdAt: number };

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  emails: LabeledValue[];
  phones: LabeledValue[];
  link: string;
  address: string;
  tags: string[];
  notes: ContactNote[];
  source: ContactSource;
  // Name of the card the contact was saved against, if any.
  cardName: string | null;
  createdAt: number;
  // Set on every edit; the details screen shows "Contact Updated" when it changes.
  updatedAt?: number;
  // Shown instead of the date in the list (e.g. "11 months ago").
  dateLabel?: string;
  avatarColor: string;
  // Company logo instead of an initial (sample data only).
  logo?: boolean;
};

let nextId = 1;
export const newContactValueId = () => `v${Date.now().toString(36)}${nextId++}`;

// Initial-circle colours, as seen in the reference list.
export const AVATAR_COLORS = ['#9A89B5', '#5A8770', '#F18636', '#A6B12E'];

const day = (d: string) => new Date(d).getTime();
const labeled = (v: string, label = ''): LabeledValue => ({ id: newContactValueId(), value: v, label });

const base = {
  company: '',
  jobTitle: '',
  emails: [],
  phones: [],
  link: '',
  address: '',
  tags: [],
  notes: [],
  cardName: null,
};

// Sample contacts mirroring the reference screenshots.
const SEED: Contact[] = [
  { ...base, id: 'c1', firstName: 'mdmdmdmdmdmdmdmdmdmd', lastName: '', source: 'Manual', createdAt: day('2025-10-30'), dateLabel: '11 months ago', avatarColor: AVATAR_COLORS[0] },
  { ...base, id: 'c2', firstName: 'ajaknjkana', lastName: '', jobTitle: 'a ajnak.akn najknkaj', company: 'kjnjknjnjk', source: 'Exchanged', createdAt: day('2025-10-26'), avatarColor: AVATAR_COLORS[1] },
  { ...base, id: 'c3', firstName: 'sdfsdf', lastName: '', source: 'Scanned', createdAt: day('2025-10-03'), avatarColor: AVATAR_COLORS[2] },
  { ...base, id: 'c4', firstName: 'Hshs', lastName: 'Vx x', emails: [labeled('hshs@ehsh.com', 'email')], source: 'Manual', createdAt: day('2025-10-02T23:49:07'), avatarColor: AVATAR_COLORS[3] },
  { ...base, id: 'c5', firstName: 'xxxxx', lastName: '', source: 'Imported', createdAt: day('2025-10-02'), avatarColor: AVATAR_COLORS[0], logo: true },
  { ...base, id: 'c6', firstName: 'Rohan', lastName: 'MEHTA', source: 'Shared back', createdAt: day('2025-09-17'), avatarColor: AVATAR_COLORS[0] },
  { ...base, id: 'c7', firstName: 'xxxxx', lastName: '', source: 'Manual', createdAt: day('2025-09-16'), avatarColor: AVATAR_COLORS[1] },
];

type ContactsContextValue = {
  contacts: Contact[];
  // Every tag the user has created, whether or not a contact uses it.
  tags: string[];
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'avatarColor' | 'notes' | 'tags' | 'source'>) => string;
  updateContact: (id: string, patch: Partial<Contact>) => void;
  setTags: (tags: string[]) => void;
  // Back to the sample contacts (sign out).
  reset: () => void;
};

const ContactsContext = createContext<ContactsContextValue | null>(null);

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(SEED);
  const [tags, setTags] = useState<string[]>(['vb']);

  const value = useMemo<ContactsContextValue>(
    () => ({
      contacts,
      tags,
      addContact: (input) => {
        const id = `c${Date.now().toString(36)}`;
        setContacts((prev) => [
          {
            ...input,
            id,
            createdAt: Date.now(),
            avatarColor: AVATAR_COLORS[prev.length % AVATAR_COLORS.length],
            notes: [],
            tags: [],
            source: 'Manual',
          },
          ...prev,
        ]);
        return id;
      },
      updateContact: (id, patch) =>
        setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch, updatedAt: Date.now() } : c))),
      setTags,
      reset: () => {
        setContacts(SEED);
        setTags(['vb']);
      },
    }),
    [contacts, tags],
  );

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}

export function useContacts() {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error('useContacts must be used inside ContactsProvider');
  return ctx;
}

export function contactName(c: Pick<Contact, 'firstName' | 'lastName'>) {
  return [c.firstName, c.lastName].filter(Boolean).join(' ');
}

export function contactSubtitle(c: Contact) {
  return [c.jobTitle, c.company].filter(Boolean).join(', ');
}

const pad = (n: number) => String(n).padStart(2, '0');

// List date: "a few seconds ago" for new contacts, otherwise DD/MM/YYYY (or the sample's label).
export function contactDateLabel(c: Contact) {
  if (c.dateLabel) return c.dateLabel;
  const age = Date.now() - c.createdAt;
  if (age < 60_000) return 'a few seconds ago';
  if (age < 3_600_000) return `${Math.round(age / 60_000)} minutes ago`;
  const d = new Date(c.createdAt);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Detail date: "2 Oct 2025 11:49:07 pm".
export function contactConnectedAt(c: Contact) {
  const d = new Date(c.createdAt);
  const h = d.getHours();
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()} ${hour12}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ${h < 12 ? 'am' : 'pm'}`;
}
