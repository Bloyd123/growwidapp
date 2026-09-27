import type { KeyboardTypeOptions } from 'react-native';

import type { CardFieldIcon } from '@/types';

export type EntryType =
  | 'phone'
  | 'email'
  | 'link'
  | 'address'
  | 'website'
  | 'linkedin'
  | 'instagram'
  | 'calendly'
  | 'x'
  | 'facebook'
  | 'threads'
  | 'snapchat'
  | 'venmo';

export type FieldTypeConfig = {
  type: EntryType;
  // Name in the "Tap a field below to add it" grid.
  label: string;
  icon: CardFieldIcon;
  addTitle: string;
  inputLabel: string;
  // Second input: a free label (phone/email/address) or the text shown on the card.
  titleField: 'label' | 'title';
  suggestions: string[];
  keyboardType?: KeyboardTypeOptions;
};

// Order matches the add-field grid on the Edit card screen.
export const FIELD_TYPES: FieldTypeConfig[] = [
  { type: 'phone', label: 'Phone', icon: 'phone', addTitle: 'Add Phone', inputLabel: 'Phone number', titleField: 'label', suggestions: ['Cell', 'Mobile', 'Work', 'Home'], keyboardType: 'phone-pad' },
  { type: 'email', label: 'Email', icon: 'mail', addTitle: 'Add Email', inputLabel: 'Email', titleField: 'label', suggestions: ['Work', 'Personal'], keyboardType: 'email-address' },
  { type: 'link', label: 'Link', icon: 'link', addTitle: 'Add Link', inputLabel: 'Link', titleField: 'title', suggestions: ['Check out my website'], keyboardType: 'url' },
  { type: 'address', label: 'Address', icon: 'address', addTitle: 'Add Address', inputLabel: 'Address', titleField: 'label', suggestions: ['Work', 'Home'] },
  { type: 'website', label: 'Company Website', icon: 'web', addTitle: 'Add Company Website', inputLabel: 'Company website', titleField: 'title', suggestions: ['Visit our website'], keyboardType: 'url' },
  { type: 'linkedin', label: 'LinkedIn', icon: 'linkedin', addTitle: 'Add LinkedIn', inputLabel: 'Username/URL', titleField: 'title', suggestions: ['Connect with me on LinkedIn'] },
  { type: 'instagram', label: 'Instagram', icon: 'instagram', addTitle: 'Add Instagram', inputLabel: 'Username/URL', titleField: 'title', suggestions: ['Follow me on Instagram'] },
  { type: 'calendly', label: 'Calendly', icon: 'calendly', addTitle: 'Add Calendly', inputLabel: 'Username/URL', titleField: 'title', suggestions: ['Book a meeting with me'] },
  { type: 'x', label: 'X', icon: 'x', addTitle: 'Add X', inputLabel: 'Username/URL', titleField: 'title', suggestions: ['Follow me on X'] },
  { type: 'facebook', label: 'Facebook', icon: 'facebook', addTitle: 'Add Facebook', inputLabel: 'Username/URL', titleField: 'title', suggestions: ['Connect with me on Facebook'] },
  { type: 'threads', label: 'Threads', icon: 'threads', addTitle: 'Add Threads', inputLabel: 'Username/URL', titleField: 'title', suggestions: ['Follow me on Threads'] },
  { type: 'snapchat', label: 'Snapchat', icon: 'snapchat', addTitle: 'Add Snapchat', inputLabel: 'Username/URL', titleField: 'title', suggestions: ['Add me on Snapchat'] },
  { type: 'venmo', label: 'Venmo', icon: 'venmo', addTitle: 'Add Venmo', inputLabel: 'Username/URL', titleField: 'title', suggestions: ['Pay via Venmo'] },
];

export function fieldType(type: EntryType): FieldTypeConfig {
  return FIELD_TYPES.find((f) => f.type === type) ?? FIELD_TYPES[0];
}
