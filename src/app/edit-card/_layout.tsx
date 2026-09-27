import { Stack } from 'expo-router';

import { CardDraftProvider } from '@/state/card-draft';
import { useProfile } from '@/state/profile';
import { colors } from '@/theme';

// Edit card and its "Add field" screens share one draft of the card.
export default function EditCardLayout() {
  const { card } = useProfile();
  return (
    <CardDraftProvider initial={card}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </CardDraftProvider>
  );
}
