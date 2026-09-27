import { createContext, useContext, useEffect, useId, useLayoutEffect, useState, type ReactNode } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';

type Layer = { id: string; node: ReactNode };
type OverlayApi = {
  show: (id: string, node: ReactNode) => void;
  hide: (id: string) => void;
};

const OverlayContext = createContext<OverlayApi | null>(null);

// Draws overlays (menu, sheets, dialogs) above every screen, inside the app's own root view.
// A native Modal on Android is sized without the status and navigation bars, which left a strip
// of the screen underneath showing at the bottom.
export function OverlayProvider({ children }: { children: ReactNode }) {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [api] = useState<OverlayApi>(() => ({
    show: (id, node) =>
      setLayers((prev) => {
        const index = prev.findIndex((layer) => layer.id === id);
        if (index === -1) return [...prev, { id, node }];
        const next = prev.slice();
        next[index] = { id, node };
        return next;
      }),
    hide: (id) => setLayers((prev) => (prev.some((layer) => layer.id === id) ? prev.filter((layer) => layer.id !== id) : prev)),
  }));

  return (
    <OverlayContext.Provider value={api}>
      {children}
      {layers.map((layer) => (
        <View key={layer.id} style={styles.layer}>
          {layer.node}
        </View>
      ))}
    </OverlayContext.Provider>
  );
}

type OverlayProps = {
  visible: boolean;
  // Android back button.
  onRequestClose: () => void;
  children: ReactNode;
};

// Full-screen layer shown while `visible`; a drop-in for <Modal transparent>.
export function Overlay({ visible, onRequestClose, children }: OverlayProps) {
  const api = useContext(OverlayContext);
  const id = useId();

  // Layout effect so the layer re-renders in the same commit as its owner: text typed into an
  // input inside the overlay must reach it without a frame of lag, or fast typing drops keys.
  useLayoutEffect(() => {
    if (!api) return;
    if (visible) api.show(id, children);
    else api.hide(id);
  }, [api, id, visible, children]);

  useEffect(() => () => api?.hide(id), [api, id]);

  useEffect(() => {
    if (!visible) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onRequestClose();
      return true;
    });
    return () => sub.remove();
  }, [visible, onRequestClose]);

  return null;
}

const styles = StyleSheet.create({
  layer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,
    elevation: 1000,
  },
});
