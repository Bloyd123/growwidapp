import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

// Returns the chosen image's local uri, or null if the user cancels.
export async function pickFromLibrary(): Promise<string | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    quality: 0.8,
  });
  return result.canceled ? null : (result.assets[0]?.uri ?? null);
}

export async function takePhoto(): Promise<string | null> {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    Alert.alert('Camera access needed', 'Allow camera access in Settings to take a photo.');
    return null;
  }
  const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.8 });
  return result.canceled ? null : (result.assets[0]?.uri ?? null);
}
