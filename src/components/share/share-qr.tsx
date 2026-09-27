import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Icon } from '@/components/icons';

const BOX_SIZE = 299.8;
const QR_SIZE = 255;

// Big white QR tile on Send Your Card. Offline, it carries the contact itself and shows the
// wifi-off badge in the middle (high error correction keeps it scannable).
export function ShareQr({ value, offline }: { value: string; offline: boolean }) {
  return (
    <View style={styles.box}>
      <QRCode value={value} size={QR_SIZE} ecl={offline ? 'Q' : 'M'} color="#000000" backgroundColor="#FFFFFF" quietZone={0} />
      {offline ? (
        <View style={styles.badge}>
          <Icon name="wifiOff" size={50} color="#000000" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignSelf: 'center',
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 35.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  badge: {
    position: 'absolute',
    width: 66,
    height: 66,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
});
