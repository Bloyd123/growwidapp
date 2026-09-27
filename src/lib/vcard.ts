import { displayName } from '@/components/profile-card';
import { cardUrl, type Card } from '@/state/profile';

// Basic contact info for the offline QR: scanning it saves the contact without internet.
export function cardVCard(card: Card) {
  const phone = card.entries.find((e) => e.type === 'phone')?.value;
  const email = card.entries.find((e) => e.type === 'email')?.value;
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${card.lastName};${card.firstName};${card.middleName};;`,
    `FN:${displayName(card)}`,
    card.company ? `ORG:${card.company}` : null,
    card.jobTitle ? `TITLE:${card.jobTitle}` : null,
    phone ? `TEL;TYPE=CELL:${phone}` : null,
    email ? `EMAIL:${email}` : null,
    `URL:${cardUrl(card)}`,
    'END:VCARD',
  ];
  return lines.filter(Boolean).join('\n');
}
