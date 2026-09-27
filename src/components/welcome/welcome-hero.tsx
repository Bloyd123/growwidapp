import { useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';

import { BackPhone } from './back-phone';
import { FrontPhone } from './front-phone';

// Design canvas in reference-screenshot px; its bottom edge sits on the bottom panel.
const CANVAS_W = 227.5;
const CANVAS_H = 304;
// Space the reference keeps between the title and the canvas; on short screens the canvas shrinks to keep it.
const TOP_GAP = 14;

type Size = { width: number; height: number };

export function WelcomeHero() {
  const [size, setSize] = useState<Size | null>(null);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  };

  const s = size ? Math.min(size.width / CANVAS_W, size.height / (CANVAS_H + TOP_GAP)) : 0;

  return (
    <View style={styles.container} onLayout={onLayout}>
      {s > 0 && size && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: (size.width - CANVAS_W * s) / 2,
            width: CANVAS_W * s,
            height: CANVAS_H * s,
          }}>
          <BackPhone s={s} />
          <FrontPhone s={s} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});
