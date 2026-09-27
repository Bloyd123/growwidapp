import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GroowidMark } from '@/components/groowid-logo';
import { Icon } from '@/components/icons';
import { HomeScreenMock } from '@/components/widget/home-screen-mock';
import { cardUrl, useProfile } from '@/state/profile';
import { colors, fonts } from '@/theme';

export default function AddWidgetScreen() {
  const insets = useSafeAreaInsets();
  const { profile } = useProfile();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close"
          hitSlop={12}
          onPress={() => router.replace('/my-card')}
          style={styles.close}>
          <Icon name="close" size={21.2} color="#000000" />
        </Pressable>
        <Text style={styles.title}>Adding the widget</Text>
        <View style={styles.info}>
          <Icon name="info" size={20.1} color="#000000" />
        </View>
      </View>

      <View style={styles.panel}>
        <HomeScreenMock qrValue={cardUrl(profile)} />
      </View>

      <Step icon={<Icon name="touch" size={28.3} color="#000000" />} style={styles.firstStep}>
        Tap and hold the Groowid app on the {'‘'}All Apps{'’'} screen
      </Step>
      <Step icon={<Icon name="widgetsAdd" size={26} color="#000000" />} style={styles.secondStep}>
        Tap on {'‘'}Widgets{'’'}
      </Step>
      <Step icon={<AppIcon />} style={styles.thirdStep}>
        Position the Groowid widget in your home screen and adjust its size
      </Step>
    </View>
  );
}

function Step({ icon, children, style }: { icon: ReactNode; children: ReactNode; style?: object }) {
  return (
    <View style={[styles.step, style]}>
      <View style={styles.stepIcon}>{icon}</View>
      <Text style={styles.stepText}>{children}</Text>
    </View>
  );
}

// Outlined app tile with the Groowid mark.
function AppIcon() {
  return (
    <View style={styles.appIcon}>
      <GroowidMark size={15.3} color="#000000" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    height: 40.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    left: 18,
    top: 9.7,
  },
  title: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15.7,
    lineHeight: 23.6,
    color: '#000000',
  },
  info: {
    position: 'absolute',
    right: 17.7,
    top: 10.3,
  },
  panel: {
    marginHorizontal: 15.9,
    height: 691.5,
    borderRadius: 21.2,
    paddingTop: 63.7,
    alignItems: 'center',
    backgroundColor: colors.coralBright,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 13.6,
    paddingRight: 4.7,
  },
  firstStep: {
    marginTop: 15.9,
  },
  secondStep: {
    marginTop: 11.8,
  },
  thirdStep: {
    marginTop: 10,
  },
  // As tall as one text line so the 24dp glyph doesn't stretch the row.
  stepIcon: {
    width: 28.3,
    height: 24.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    flex: 1,
    marginLeft: 10.6,
    fontFamily: fonts.ui,
    fontSize: 15.3,
    lineHeight: 24.2,
    letterSpacing: -0.2,
    color: '#000000',
  },
  appIcon: {
    width: 24.2,
    height: 24.2,
    borderRadius: 5.9,
    borderWidth: 1.8,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
