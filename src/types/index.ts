export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
};

export type Card = {
  id: string;
  label: string;
  fullName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  website?: string;
};

export type CardFieldIcon =
  | 'mail'
  | 'phone'
  | 'web'
  | 'linkedin'
  | 'instagram'
  | 'link'
  | 'address'
  | 'calendly'
  | 'x'
  | 'facebook'
  | 'threads'
  | 'snapchat'
  | 'venmo';

export type CardField = {
  icon: CardFieldIcon;
  label: string;
};

export type Contact = {
  id: string;
  fullName: string;
  jobTitle?: string;
  company?: string;
  email?: string;
  phone?: string;
  metAt: string;
  note?: string;
};
