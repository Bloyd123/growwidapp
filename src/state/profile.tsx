import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import type { EntryType } from '@/data/field-types';

// Company logo: a letter tile built locally from the website, or an image picked from the device.
export type LogoTile = { letter: string; color: string; source: string };
export type Logo = ({ kind: 'tile' } & LogoTile) | { kind: 'image'; uri: string };

// Answers collected during onboarding.
export type Profile = {
  firstName: string;
  lastName: string;
  workEmail: string;
  phone: string;
  company: string;
  jobTitle: string;
  website: string;
  linkedin: string;
  personalEmail: string;
  logo: Logo | null;
  photoUri: string | null;
  // Set once the user allows notifications; hides the bell on My Card.
  notificationsOn: boolean;
  // Set after the "Share your card with low internet" sheet was dismissed with Got it.
  shareIntroSeen: boolean;
};

export type Entry = { id: string; type: EntryType; value: string; title: string; ext?: string };
export type NameExtra = 'prefix' | 'suffix' | 'pronoun' | 'preferred' | 'maidenName';

// The digital card shown on My Card and changed on the Edit card screen.
export type Card = {
  name: string;
  color: string;
  logo: Logo | null;
  photoUri: string | null;
  coverUri: string | null;
  firstName: string;
  middleName: string;
  lastName: string;
  extras: Partial<Record<NameExtra, string>>;
  jobTitle: string;
  department: string;
  company: string;
  headline: string;
  accreditations: string[];
  entries: Entry[];
  qrLogo: boolean;
  whereWeMet: boolean;
  removeBranding: boolean;
};

export const DEFAULT_CARD_COLOR = '#F25C54';

const emptyProfile: Profile = {
  firstName: '',
  lastName: '',
  workEmail: '',
  phone: '',
  company: '',
  jobTitle: '',
  website: '',
  linkedin: '',
  personalEmail: '',
  logo: null,
  photoUri: null,
  notificationsOn: false,
  shareIntroSeen: false,
};

type ProfileContextValue = {
  profile: Profile;
  update: (patch: Partial<Profile>) => void;
  // Built from the onboarding answers until the user saves an edit.
  card: Card;
  saveCard: (card: Card) => void;
  // Sign out: forget everything so the journey starts again from Welcome.
  reset: () => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [savedCard, setSavedCard] = useState<Card | null>(null);
  const value = useMemo(
    () => ({
      profile,
      update: (patch: Partial<Profile>) => setProfile((p) => ({ ...p, ...patch })),
      card: savedCard ?? cardFromProfile(profile),
      saveCard: setSavedCard,
      reset: () => {
        setProfile(emptyProfile);
        setSavedCard(null);
      },
    }),
    [profile, savedCard],
  );
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside ProfileProvider');
  return ctx;
}

let nextId = 0;
export function newEntryId() {
  nextId += 1;
  return `e${Date.now().toString(36)}${nextId}`;
}

function cardFromProfile(p: Profile): Card {
  const entries: Entry[] = [];
  if (p.workEmail) entries.push({ id: 'email', type: 'email', value: p.workEmail, title: '' });
  if (p.phone) entries.push({ id: 'phone', type: 'phone', value: p.phone, title: '' });
  if (p.website) entries.push({ id: 'website', type: 'website', value: p.website, title: 'Visit our website' });
  if (p.linkedin) {
    const url = `https://www.linkedin.com/in/${p.linkedin}`;
    entries.push({ id: 'linkedin', type: 'linkedin', value: url, title: 'Connect with me on LinkedIn' });
  }
  return {
    name: 'Groowid',
    color: DEFAULT_CARD_COLOR,
    logo: p.logo,
    photoUri: p.photoUri,
    coverUri: null,
    firstName: p.firstName,
    middleName: '',
    lastName: p.lastName,
    extras: {},
    jobTitle: p.jobTitle,
    department: '',
    company: p.company,
    headline: '',
    accreditations: [],
    entries,
    qrLogo: false,
    whereWeMet: true,
    removeBranding: false,
  };
}

export function fullName(person: { firstName: string; lastName: string; middleName?: string }) {
  return [person.firstName, person.middleName, person.lastName].filter(Boolean).join(' ').trim();
}

// Public link encoded in the QR codes (demo only, nothing is hosted).
export function cardUrl(person: { firstName: string; lastName: string }) {
  const slug = fullName(person).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `https://groowid.app/${slug || 'me'}`;
}

const TILE_COLORS = ['#4285F4', '#EA4335', '#34A853', '#FBBC05', '#7B61FF', '#FF6B35', '#0F9D9A'];

// "https://www.google.com/" -> "google.com"
export function domainOf(website: string) {
  return website
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0];
}

export function makeLogoTile(website: string): Logo | null {
  const domain = domainOf(website);
  const letter = domain.match(/[a-z0-9]/)?.[0];
  if (!letter) return null;
  let hash = 0;
  for (const ch of domain) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return { kind: 'tile', letter: letter.toUpperCase(), color: TILE_COLORS[hash % TILE_COLORS.length], source: domain };
}
