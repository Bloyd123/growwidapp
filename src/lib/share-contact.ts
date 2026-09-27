import { Share } from 'react-native';

import { contactName, type Contact } from '@/state/contacts';

// Hands one contact's details to the phone's share sheet ("Share contact" / "…with company").
export function shareContact(contact: Contact, withCompany: boolean) {
  const lines = [
    contactName(contact),
    withCompany ? [contact.jobTitle, contact.company].filter(Boolean).join(', ') : '',
    ...contact.phones.map((p) => p.value),
    ...contact.emails.map((e) => e.value),
  ].filter(Boolean);
  Share.share({ message: lines.join('\n') }).catch(() => {});
}
