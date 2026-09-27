import { useId } from 'react';
import Svg, { Circle, ClipPath, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';

type AvatarProps = {
  size: number;
  ringWidth?: number;
};

// Placeholder portrait: head-and-shoulders silhouette on a peach backdrop.
export function Avatar({ size, ringWidth = 0 }: AvatarProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const ring = (ringWidth / size) * 100;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id={`${id}bg`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#F6CBBE" />
          <Stop offset="1" stopColor="#DE8C77" />
        </LinearGradient>
        <ClipPath id={`${id}clip`}>
          <Circle cx={50} cy={50} r={50} />
        </ClipPath>
      </Defs>
      <G clipPath={`url(#${id}clip)`}>
        <Circle cx={50} cy={50} r={50} fill={`url(#${id}bg)`} />
        <Path d="M14 104c2-24 17-37 36-37s34 13 36 37z" fill="#1E1513" />
        <Circle cx={50} cy={42} r={17} fill="#3A2521" />
      </G>
      {ring > 0 && (
        <Circle cx={50} cy={50} r={50 - ring / 2} fill="none" stroke="#FFFFFF" strokeWidth={ring} />
      )}
    </Svg>
  );
}
