import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/icons';
import { shareRowColors } from '@/components/share/share-list';
import { Toggle } from '@/components/toggle';
import { fonts } from '@/theme';

type OfflineCardProps = {
  offline: boolean;
  onChange: (offline: boolean) => void;
};

// "Share card offline" switch; when on, it also explains what is shared and offers a preview.
export function OfflineCard({ offline, onChange }: OfflineCardProps) {
  const { background, ink } = shareRowColors(offline);
  return (
    <View style={{ backgroundColor: background }}>
      <View style={styles.head}>
        <View style={styles.icon}>
          <Icon name="wifiOff" size={29} color={ink} />
        </View>
        <Text style={[styles.title, { color: ink }]}>Share card offline</Text>
        <View style={styles.toggle}>
          <Toggle variant="m3" value={offline} onValueChange={onChange} accessibilityLabel="Share card offline" />
        </View>
      </View>
      {offline ? (
        <>
          <Text style={styles.body}>Share without internet. Only basic contact info will be shared.</Text>
          <Pressable accessibilityRole="button" style={styles.preview}>
            <Icon name="eye" size={15.5} color="#000000" />
            <Text style={styles.previewText}>Preview what’s shared</Text>
          </Pressable>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    height: 62.6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 14.5,
  },
  title: {
    flex: 1,
    marginLeft: 19.7,
    fontFamily: fonts.ui,
    fontSize: 20,
    includeFontPadding: false,
  },
  toggle: {
    marginRight: 21.8,
  },
  body: {
    marginTop: -10.4,
    paddingHorizontal: 16.5,
    fontFamily: fonts.ui,
    fontSize: 13.5,
    lineHeight: 19.5,
    color: '#1A1A1A',
  },
  preview: {
    alignSelf: 'flex-start',
    height: 31.6,
    marginTop: 22,
    marginLeft: 16.5,
    marginBottom: 24,
    paddingLeft: 8,
    paddingRight: 11.8,
    borderRadius: 15.8,
    borderWidth: 1.2,
    borderColor: '#DCDCDC',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5.6,
    backgroundColor: '#FFFFFF',
  },
  previewText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 13.9,
    color: '#000000',
    includeFontPadding: false,
  },
});
