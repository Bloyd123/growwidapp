import {
  Figtree_400Regular,
  Figtree_500Medium,
  Figtree_600SemiBold,
  Figtree_700Bold,
} from '@expo-google-fonts/figtree';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Oswald_700Bold } from '@expo-google-fonts/oswald';
import { SourceSerif4_600SemiBold } from '@expo-google-fonts/source-serif-4';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { OverlayProvider } from '@/components/overlay';
import { ContactsProvider } from '@/state/contacts';
import { NotesProvider } from '@/state/notes';
import { ProfileProvider } from '@/state/profile';
import { colors } from '@/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
    Oswald_700Bold,
    SourceSerif4_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ProfileProvider>
      <ContactsProvider>
        <NotesProvider>
          <OverlayProvider>
            <StatusBar style="dark" />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
              }}>
              {/* Welcome is the first screen, so the app always opens at the start of the journey. */}
              <Stack.Screen name="index" />
              {/* Send Your Card slides up from the Share button. */}
              <Stack.Screen name="share/index" options={{ animation: 'slide_from_bottom' }} />
              {/* Tabs switch without a slide. */}
              <Stack.Screen name="contacts/index" options={{ animation: 'none' }} />
              <Stack.Screen name="notes/index" options={{ animation: 'none' }} />
              <Stack.Screen name="notes/record" options={{ animation: 'none' }} />
              {/* Full-screen camera. */}
              <Stack.Screen name="scan" options={{ animation: 'fade' }} />
            </Stack>
          </OverlayProvider>
        </NotesProvider>
      </ContactsProvider>
    </ProfileProvider>
  );
}
