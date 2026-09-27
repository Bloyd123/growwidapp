// Dummy data — the app has no backend, so every screen reads from here.
import type { Card, CardField, Contact, User } from '@/types';

// Demo card shown in the welcome screen illustration.
export const welcomeDemoCard: Pick<Card, 'fullName' | 'jobTitle' | 'company'> & {
  fields: CardField[];
} = {
  fullName: 'Steven Rice',
  jobTitle: 'Chief Operations Officer',
  company: 'Ninefold',
  fields: [
    { icon: 'mail', label: 'steven.rice@ninefold.com' },
    { icon: 'phone', label: '(446) 555-0281' },
    { icon: 'web', label: 'ninefold.com' },
    { icon: 'linkedin', label: 'Connect with me on LinkedIn' },
    { icon: 'instagram', label: 'Check us out on Instagram' },
  ],
};

export const currentUser: User = {
  id: 'u1',
  firstName: 'Aarav',
  lastName: 'Sharma',
  email: 'aarav@example.com',
  phone: '+91 98765 43210',
};

export const cards: Card[] = [
  {
    id: 'c1',
    label: 'Work',
    fullName: 'Aarav Sharma',
    jobTitle: 'Product Designer',
    company: 'Groowid',
    email: 'aarav@example.com',
    phone: '+91 98765 43210',
    website: 'example.com',
  },
];

export const contacts: Contact[] = [
  {
    id: 'p1',
    fullName: 'Priya Verma',
    jobTitle: 'Marketing Lead',
    company: 'Acme Corp',
    email: 'priya@example.com',
    metAt: '2026-09-20',
  },
  {
    id: 'p2',
    fullName: 'Rohan Mehta',
    jobTitle: 'Founder',
    company: 'Startup Labs',
    phone: '+91 91234 56789',
    metAt: '2026-09-18',
  },
];
