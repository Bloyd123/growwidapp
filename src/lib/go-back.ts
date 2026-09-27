import { router, type Href } from 'expo-router';

// Goes back when there is a screen to return to. If this screen is the only one in the stack
// (e.g. the app was reopened straight onto it), opens `fallback` instead of doing nothing.
export function goBack(fallback: Href) {
  if (router.canGoBack()) router.back();
  else router.replace(fallback);
}
