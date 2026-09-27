import { StyleSheet, Text, View } from 'react-native';

import { fonts } from '@/theme';

export function PremiumBadge() {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>Premium</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    height: 23.6,
    paddingHorizontal: 10.6,
    borderRadius: 11.8,
    justifyContent: 'center',
    backgroundColor: '#E1E4FF',
  },
  text: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 13,
    color: '#3C4FD4',
    includeFontPadding: false,
  },
});
