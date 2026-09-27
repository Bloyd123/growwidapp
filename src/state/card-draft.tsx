import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import type { Card } from '@/state/profile';

type CardDraftValue = {
  draft: Card;
  // Tracks whether anything changed, so Cancel can ask before discarding.
  dirty: boolean;
  change: (update: (card: Card) => Card) => void;
};

const CardDraftContext = createContext<CardDraftValue | null>(null);

// Working copy of the card while the Edit card screens are open; saved back on "Save".
export function CardDraftProvider({ initial, children }: { initial: Card; children: ReactNode }) {
  const [draft, setDraft] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const value = useMemo(
    () => ({
      draft,
      dirty,
      change: (update: (card: Card) => Card) => {
        setDraft(update);
        setDirty(true);
      },
    }),
    [draft, dirty],
  );
  return <CardDraftContext.Provider value={value}>{children}</CardDraftContext.Provider>;
}

export function useCardDraft() {
  const ctx = useContext(CardDraftContext);
  if (!ctx) throw new Error('useCardDraft must be used inside CardDraftProvider');
  return ctx;
}
