import type { TextStyle } from 'react-native';

// Family names match the keys loaded with useFonts in src/app/_layout.tsx.
export const fonts = {
  serifSemiBold: 'SourceSerif4_600SemiBold',
  sans: 'Inter_400Regular',
  sansSemiBold: 'Inter_600SemiBold',
  logo: 'Oswald_700Bold',
  ui: 'Figtree_400Regular',
  uiMedium: 'Figtree_500Medium',
  uiSemiBold: 'Figtree_600SemiBold',
  uiBold: 'Figtree_700Bold',
} as const;

export const typography = {
  display: { fontFamily: fonts.serifSemiBold, fontSize: 29.5, lineHeight: 31.9, letterSpacing: -0.4 },

  // Onboarding flow (Figtree). Sizes are fitted to text widths measured on a 360dp-wide device.
  heading: { fontFamily: fonts.uiSemiBold, fontSize: 24.2, lineHeight: 32.4, letterSpacing: -0.1 },
  subtitle: { fontFamily: fonts.ui, fontSize: 16.2, lineHeight: 20.7 },
  field: { fontFamily: fonts.ui, fontSize: 15.9 },
  fieldLabel: { fontFamily: fonts.uiSemiBold, fontSize: 12.4, lineHeight: 15.3 },
  cta: { fontFamily: fonts.uiSemiBold, fontSize: 17.7, lineHeight: 22.4 },
  action: { fontFamily: fonts.uiSemiBold, fontSize: 17.9, lineHeight: 23.6 },
  sheetTitle: { fontFamily: fonts.uiMedium, fontSize: 20.7, lineHeight: 26 },
  fine: { fontFamily: fonts.ui, fontSize: 11.7, lineHeight: 15.3 },
} satisfies Record<string, TextStyle>;
