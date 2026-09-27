import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icons';
import { goBack } from '@/lib/go-back';
import { colors } from '@/theme';

export const HEADER_HEIGHT = 66.1;
const STEP_COUNT = 5;

type OnboardingHeaderProps = {
  // 1-based step for the progress bar; omit to show only the back button.
  step?: number;
};

export function OnboardingHeader({ step }: OnboardingHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Back"
        hitSlop={12}
        onPress={() => goBack('/')}
        style={styles.back}>
        <Icon name="chevronLeft" size={28.3} color={colors.inkDeep} />
      </Pressable>
      {step ? <StepProgress step={step} /> : null}
    </View>
  );
}

// Finished steps are short dark dashes, the current one is long, the rest are light.
function StepProgress({ step }: { step: number }) {
  return (
    <View style={styles.progress} accessibilityLabel={`Step ${step} of ${STEP_COUNT}`}>
      {Array.from({ length: STEP_COUNT }, (_, i) => (
        <View
          key={i}
          style={[styles.segment, i + 1 === step && styles.current, i + 1 > step && styles.todo]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 13.6,
    top: (HEADER_HEIGHT - 28.3) / 2,
  },
  progress: {
    flexDirection: 'row',
    gap: 2.4,
  },
  segment: {
    width: 12.4,
    height: 3.5,
    borderRadius: 1.8,
    backgroundColor: '#000000',
  },
  current: {
    width: 31.9,
  },
  todo: {
    backgroundColor: '#ECECEC',
  },
});
