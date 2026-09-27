import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

import type { CardFieldIcon } from '@/types';

export type IconName =
  | 'chevronLeft'
  | 'close'
  | 'search'
  | 'info'
  | 'wand'
  | 'photoLibrary'
  | 'camera'
  | 'trash'
  | 'menu'
  | 'bell'
  | 'edit'
  | 'send'
  | 'touch'
  | 'widgetsAdd'
  | 'tabCard'
  | 'tabScan'
  | 'tabMic'
  | 'tabContacts'
  | 'plus'
  | 'reorder'
  | 'externalLink'
  | 'crown'
  | 'photoStack'
  | 'pencil'
  | 'caretDown'
  | 'briefcase'
  | 'smartphone'
  | 'watch'
  | 'signature'
  | 'portrait'
  | 'sparkles'
  | 'leadForm'
  | 'plug'
  | 'person'
  | 'contactBook'
  | 'lifebuoy'
  | 'sadFace'
  | 'heart'
  | 'mail'
  | 'bellRinging'
  | 'fingerprint'
  | 'homeOutline'
  | 'wallet'
  | 'eye'
  | 'copy'
  | 'chat'
  | 'dots'
  | 'wifi'
  | 'wifiOff'
  | 'gear'
  | 'contacts'
  | 'arrowBack'
  | 'videocam'
  | 'message'
  | 'sendRight'
  | 'infoOutline'
  | 'walletClasp'
  | 'openInNew'
  | 'sortArrows'
  | 'shareNodes'
  | 'calendar'
  | 'download'
  | 'stickyNote'
  | 'plusCircle'
  | 'checkCircle'
  | 'chevronDown'
  | 'trashFilled'
  | 'qrCode'
  | 'chevronRight'
  | 'contactBadge'
  | 'paperCard'
  | 'image'
  | 'flashlight'
  | 'pause'
  | 'stop'
  | 'play'
  | 'moreVert'
  | 'chatLines'
  | 'check'
  | 'searchOutline';

// 8-tooth gear outline on the 24 grid (settings).
const GEAR_PATH = (() => {
  const point = (deg: number, r: number) => {
    const a = (deg * Math.PI) / 180;
    return `${(12 + r * Math.cos(a)).toFixed(2)} ${(12 + r * Math.sin(a)).toFixed(2)}`;
  };
  const parts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const c = i * 45;
    parts.push(point(c - 13, 7.6), point(c - 8, 10.3), point(c + 8, 10.3), point(c + 13, 7.6));
  }
  return `M${parts.join('L')}Z`;
})();

type IconProps = {
  name: IconName;
  size: number;
  color: string;
};

// UI glyphs on a 24×24 grid (Material-style shapes).
export function Icon({ name, size, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <UiGlyph name={name} color={color} />
    </Svg>
  );
}

function UiGlyph({ name, color }: { name: IconName; color: string }) {
  const stroke = { fill: 'none', stroke: color, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  switch (name) {
    case 'chevronLeft':
      return <Path d="M15.5 3.5 7 12l8.5 8.5" {...stroke} strokeWidth={2.4} />;
    case 'close':
      return (
        <Path
          fill={color}
          d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      );
    case 'search':
      return (
        <Path
          fill={color}
          d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
      );
    case 'info':
      return (
        <Path
          fill={color}
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
        />
      );
    case 'wand':
      // Diagonal wand with a split tip and three small "×" sparkles.
      return (
        <G>
          <Path d="M3.6 20.4 13 11" {...stroke} strokeWidth={3.4} />
          <Path d="m15.1 8.9 1.8-1.8" {...stroke} strokeWidth={3.4} />
          <Path
            d="M5.4 2.4 8 5m0-2.6L5.4 5M17.6 1.6l2.2 2.2m0-2.2-2.2 2.2M18.8 11.4l2.2 2.2m0-2.2-2.2 2.2"
            {...stroke}
            strokeWidth={1.4}
          />
        </G>
      );
    case 'photoLibrary':
      return (
        <G {...stroke} strokeWidth={1.9}>
          <Path d="M13 19H5.5A2.5 2.5 0 0 1 3 16.5v-11A2.5 2.5 0 0 1 5.5 3h11A2.5 2.5 0 0 1 19 5.5V12" />
          <Circle cx={8} cy={8} r={1.6} />
          <Path d="m3.4 15.6 4.1-3.8 3.4 3 2.6-2.3" />
          <Path d="M18 21.5v-6.5M15.2 17.6 18 14.8l2.8 2.8" />
        </G>
      );
    case 'camera':
      return (
        <G {...stroke} strokeWidth={1.9}>
          <Path d="M8.6 5.6 9.9 3.8h4.2l1.3 1.8H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.6a2 2 0 0 1 2-2z" />
          <Circle cx={12} cy={12.6} r={3.6} />
        </G>
      );
    case 'trash':
      return (
        <Path
          fill={color}
          d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
        />
      );
    case 'menu':
      return <Path fill={color} d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />;
    case 'bell':
      return (
        <Path
          fill={color}
          d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
        />
      );
    case 'edit':
      return (
        <Path
          fill={color}
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        />
      );
    case 'send':
      // Paper plane pointing up-right.
      return <Path fill={color} d="M21.5 2.5 2.5 10.2l7.2 2.9L18.4 5.6l-7.6 8.6 2.8 7.3z" />;
    case 'touch':
      return (
        <Path
          fill={color}
          d="M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"
        />
      );
    case 'widgetsAdd':
      return <Path fill={color} d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm15 0h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />;
    case 'tabCard':
      return (
        <G>
          <Rect x={2} y={4} width={20} height={16} rx={2.5} fill={color} />
          <Circle cx={8} cy={10.2} r={2.3} fill="#FFFFFF" />
          <Path d="M4.4 16.6c0-2.1 1.7-3.3 3.6-3.3s3.6 1.2 3.6 3.3z" fill="#FFFFFF" />
          <Rect x={13.5} y={8.6} width={6.5} height={1.7} rx={0.85} fill="#FFFFFF" />
          <Rect x={13.5} y={12.2} width={6.5} height={1.7} rx={0.85} fill="#FFFFFF" />
        </G>
      );
    case 'tabScan':
      return (
        <Path
          d="M3 8.5V5.5A2.5 2.5 0 0 1 5.5 3h3M15.5 3h3A2.5 2.5 0 0 1 21 5.5v3M21 15.5v3a2.5 2.5 0 0 1-2.5 2.5h-3M8.5 21h-3A2.5 2.5 0 0 1 3 18.5v-3M7 12h10"
          {...stroke}
          strokeWidth={2}
        />
      );
    case 'tabMic':
      return (
        <Path
          fill={color}
          d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
        />
      );
    case 'tabContacts':
      return (
        <Path
          fill={color}
          d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
        />
      );
    case 'plus':
      return <Path d="M12 4.5v15M4.5 12h15" {...stroke} strokeWidth={2.2} />;
    case 'reorder':
      return (
        <G fill={color}>
          <Path d="M7.5 3 3.5 7.5h2.9V15h2.2V7.5h2.9z" />
          <Path d="M16.5 21l4-4.5h-2.9V9h-2.2v7.5h-2.9z" />
        </G>
      );
    case 'externalLink':
      return (
        <G {...stroke} strokeWidth={2}>
          <Path d="M19 13.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4.5" />
          <Path d="M14 4h6v6M20 4l-9 9" />
        </G>
      );
    case 'crown':
      return (
        <G fill={color}>
          <Path d="M3 7.5 7.6 11 12 4.5l4.4 6.5L21 7.5 19.2 17H4.8z" />
          <Rect x={4.8} y={18.5} width={14.4} height={2} rx={1} />
        </G>
      );
    case 'photoStack':
      return (
        <G {...stroke} strokeWidth={2}>
          <Rect x={5} y={8.5} width={14} height={12.5} rx={3} />
          <Path d="M8 4.5h8" />
        </G>
      );
    case 'pencil':
      return (
        <G {...stroke} strokeWidth={1.9}>
          <Path d="M4.5 19.5h3.8L18.6 9.2a2.7 2.7 0 0 0-3.8-3.8L4.5 15.7z" />
          <Path d="m13.4 6.8 3.8 3.8" />
        </G>
      );
    case 'caretDown':
      return <Path fill={color} d="M7 10l5 5 5-5z" />;
    case 'briefcase':
      return (
        <G fill={color}>
          <Path d="M9 3.5h6a1 1 0 0 1 1 1V6h-1.6V5.1H9.6V6H8V4.5a1 1 0 0 1 1-1z" />
          <Rect x={3} y={7} width={4} height={13} rx={1.6} />
          <Rect x={8.4} y={7} width={7.2} height={13} rx={0.8} />
          <Rect x={17} y={7} width={4} height={13} rx={1.6} />
        </G>
      );
    case 'smartphone':
      return (
        <G>
          <Rect x={6} y={1.5} width={12} height={21} rx={2.2} fill={color} />
          <Circle cx={12} cy={19} r={1} fill="#000000" />
        </G>
      );
    case 'watch':
      return (
        <G>
          <Path fill={color} d="M8.6 2h6.8l.8 3.2A7.5 7.5 0 0 1 16.2 18.8l-.8 3.2H8.6l-.8-3.2A7.5 7.5 0 0 1 7.8 5.2z" />
          <Circle cx={12} cy={12} r={5.2} fill="#000000" />
          <Path d="M12 9.2V12l2 1.4" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        </G>
      );
    case 'signature':
      return (
        <G {...stroke} strokeWidth={1.7}>
          <Path d="M3 16c1.6-3.4 3.4-8.4 5-8.4 1.3 0-.9 7.6.9 7.6 1.3 0 2-3.8 3.4-3.8 1.1 0-.3 3.6 1.2 3.6 1 0 1.6-1.6 2.5-1.6s.9 1.6 2.4 1.6H21" />
          <Path d="M3 20h18" />
        </G>
      );
    case 'portrait':
      return (
        <Path
          fill={color}
          d="M12 12.25c1.24 0 2.25-1.01 2.25-2.25S13.24 7.75 12 7.75 9.75 8.76 9.75 10s1.01 2.25 2.25 2.25zm4.5 4c0-1.5-3-2.25-4.5-2.25s-4.5.75-4.5 2.25V17h9v-.75zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
        />
      );
    case 'sparkles':
      return (
        <Path
          fill={color}
          d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"
        />
      );
    case 'leadForm':
      return (
        <G>
          <Path fill={color} d="M6.5 2h8L19 6.5V20a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
          <G fill="#000000">
            <Rect x={7.5} y={10.5} width={2.4} height={2.4} rx={0.4} />
            <Rect x={10.8} y={10.5} width={2.4} height={2.4} rx={0.4} />
            <Rect x={14.1} y={10.5} width={2.4} height={2.4} rx={0.4} />
            <Rect x={7.5} y={14} width={2.4} height={2.4} rx={0.4} />
            <Rect x={10.8} y={14} width={2.4} height={2.4} rx={0.4} />
            <Rect x={14.1} y={14} width={2.4} height={2.4} rx={0.4} />
            <Rect x={7.5} y={17.5} width={9} height={1.6} rx={0.4} />
          </G>
        </G>
      );
    case 'plug':
      return (
        <Path
          fill={color}
          d="M16.01 7 16 3h-2v4h-4V3H8v4h-.01C7 6.99 6 7.99 6 8.99v5.49L9.5 18v3h5v-3l3.5-3.51v-5.5c0-1-1-2-1.99-1.99z"
        />
      );
    case 'person':
      return (
        <Path
          fill={color}
          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
        />
      );
    case 'contactBook':
      return (
        <G>
          <Rect x={3.5} y={2.5} width={14.5} height={19} rx={2} fill={color} />
          <Circle cx={10.75} cy={9.6} r={2.6} fill="#000000" />
          <Path d="M6.2 17.2c0-2.3 2.1-3.5 4.55-3.5s4.55 1.2 4.55 3.5z" fill="#000000" />
          <Rect x={19.4} y={4.5} width={1.8} height={3.4} rx={0.6} fill={color} />
          <Rect x={19.4} y={10.3} width={1.8} height={3.4} rx={0.6} fill={color} />
          <Rect x={19.4} y={16.1} width={1.8} height={3.4} rx={0.6} fill={color} />
        </G>
      );
    case 'lifebuoy':
      return (
        <Path
          fill={color}
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.46 7.12-2.78 1.15a4.98 4.98 0 0 0-2.95-2.94l1.15-2.78c2.1.8 3.77 2.47 4.58 4.57zM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zM9.13 4.54l1.17 2.78a5 5 0 0 0-2.98 2.97L4.54 9.13a7.98 7.98 0 0 1 4.59-4.59zM4.54 14.87l2.78-1.15a4.97 4.97 0 0 0 2.97 2.96l-1.17 2.78a8 8 0 0 1-4.58-4.59zm10.34 4.59-1.15-2.78a4.98 4.98 0 0 0 2.95-2.97l2.78 1.17a8.01 8.01 0 0 1-4.58 4.58z"
        />
      );
    case 'sadFace':
      return (
        <Path
          fill={color}
          d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm3.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm3.5 5.5c2.33 0 4.31 1.46 5.11 3.5H6.89c.8-2.04 2.78-3.5 5.11-3.5z"
        />
      );
    case 'heart':
      return (
        <Path
          fill={color}
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      );
    case 'mail':
      return (
        <Path
          fill={color}
          d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
        />
      );
    case 'bellRinging':
      return (
        <G>
          <Path
            fill={color}
            d="M18 16v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-6 6c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"
          />
          <Path d="M5.6 3.4C3.8 4.9 2.6 7.1 2.4 9.6M18.4 3.4c1.8 1.5 3 3.7 3.2 6.2" {...stroke} strokeWidth={1.9} />
        </G>
      );
    case 'fingerprint':
      return (
        <G {...stroke} strokeWidth={1.35}>
          <Path d="M7.2 3.6C8.7 2.9 10.3 2.5 12 2.5s3.3.4 4.8 1.1" />
          <Path d="M4 8.9C5.8 6.4 8.7 4.8 12 4.8s6.2 1.6 8 4.1" />
          <Path d="M7.4 20.2c-1.1-1.5-1.8-3.6-1.8-5.8 0-3.4 2.9-6.2 6.4-6.2s6.4 2.8 6.4 6.2" />
          <Path d="M10.2 21.4c-1.3-1.5-2.1-3.4-2.1-5.6 0-2.1 1.7-3.9 3.9-3.9s3.9 1.8 3.9 3.9c0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8" />
          <Path d="M12 14.8c0 2.8 1.4 5.2 3.7 6.6" />
          <Path d="M3.2 14.6c-.1-.7-.1-1.3-.1-2" />
          <Path d="M17.6 19.7c-1.8 0-3.3-1.4-3.3-3.2" />
        </G>
      );
    case 'homeOutline':
      return (
        <G {...stroke} strokeWidth={1.8}>
          <Path d="M3.5 10.6 12 3.8l8.5 6.8V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z" />
          <Path d="M8.5 20.5v-5.2L12 12.6l3.5 2.7v5.2" />
        </G>
      );
    case 'wallet':
      return (
        <G>
          <Rect x={2.5} y={5} width={19} height={14} rx={3.2} fill={color} />
          <Rect x={2.5} y={8.6} width={19} height={2.6} fill="rgba(0,0,0,0.35)" />
        </G>
      );
    case 'eye':
      return (
        <Path
          fill={color}
          d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
        />
      );
    case 'copy':
      return (
        <Path
          fill={color}
          d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
        />
      );
    case 'chat':
      return (
        <Path
          fill={color}
          d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"
        />
      );
    case 'dots':
      return (
        <G fill={color}>
          <Circle cx={5} cy={12} r={1.9} />
          <Circle cx={12} cy={12} r={1.9} />
          <Circle cx={19} cy={12} r={1.9} />
        </G>
      );
    case 'wifi':
      return (
        <Path
          fill={color}
          d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"
        />
      );
    case 'wifiOff':
      return (
        <G {...stroke} strokeWidth={2.3}>
          <Path d="M2.2 8.6c2.6-2.4 5.3-3.6 8.2-3.8M14.6 5.1c2.7.6 5 1.8 7.2 3.8" />
          <Path d="M5.6 12.1c1.2-1.1 2.5-1.8 3.8-2.3M15.4 10.4c1.1.5 2.1 1.1 3 1.9" />
          <Path d="M9.1 15.5c1.9-1.5 4.1-1.6 6-.2" />
          <Path d="M3.6 3.4l16.8 17.2" />
          <Circle cx={12} cy={19.4} r={1.1} fill={color} />
        </G>
      );
    case 'gear':
      return (
        <G {...stroke} strokeWidth={1.7}>
          <Path d={GEAR_PATH} />
          <Circle cx={12} cy={12} r={3.3} />
        </G>
      );
    case 'contacts':
      return (
        <Path
          fill={color}
          d="M20 0H4v2h16V0zM4 24h16v-2H4v2zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2.75c1.24 0 2.25 1.01 2.25 2.25s-1.01 2.25-2.25 2.25S9.75 10.24 9.75 9 10.76 6.75 12 6.75zM17 17H7v-1.5c0-1.67 3.33-2.5 5-2.5s5 .83 5 2.5V17z"
        />
      );
    case 'infoOutline':
      return (
        <Path
          fill={color}
          d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        />
      );
    case 'walletClasp':
      return (
        <Path
          fill={color}
          fillRule="evenodd"
          d="M5 4h13.5A2.5 2.5 0 0 1 21 6.5V8h-7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h7v1.5a2.5 2.5 0 0 1-2.5 2.5H5a2.5 2.5 0 0 1-2.5-2.5v-11A2.5 2.5 0 0 1 5 4zm9 5.5h8v5h-8a1.5 1.5 0 0 1-1.5-1.5v-2A1.5 1.5 0 0 1 14 9.5zm1.6 2.5a1.1 1.1 0 1 0 2.2 0 1.1 1.1 0 0 0-2.2 0z"
        />
      );
    case 'openInNew':
      return (
        <Path
          fill={color}
          d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
        />
      );
    case 'sortArrows':
      return <Path fill={color} d="M12 3.5l5.2 6H6.8zM12 20.5l-5.2-6h10.4z" />;
    case 'shareNodes':
      return (
        <Path
          fill={color}
          d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
        />
      );
    case 'calendar':
      return (
        <Path
          fill={color}
          d="M3 9.5h18V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM5 4h1V2h2v2h8V2h2v2h1a2 2 0 0 1 2 2v2H3V6a2 2 0 0 1 2-2z"
        />
      );
    case 'download':
      return <Path fill={color} d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />;
    case 'stickyNote':
      return (
        <G>
          <Path fill={color} d="M5 3h14a2 2 0 0 1 2 2v9.6L14.6 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
          <Path fill="#FFFFFF" d="M14.6 21v-4.4a2 2 0 0 1 2-2H21z" />
          <Circle cx={7} cy={8} r={1} fill="#FFFFFF" />
          <Circle cx={7} cy={12} r={1} fill="#FFFFFF" />
          <Circle cx={7} cy={16} r={1} fill="#FFFFFF" />
        </G>
      );
    case 'plusCircle':
      return (
        <G {...stroke} strokeWidth={1.4}>
          <Circle cx={12} cy={12} r={9} />
          <Path d="M12 7.8v8.4M7.8 12h8.4" />
        </G>
      );
    case 'checkCircle':
      return (
        <G>
          <Circle cx={12} cy={12} r={10} fill={color} />
          <Path d="M7.6 12.3l3 3 5.8-6.2" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
    case 'chevronDown':
      return <Path d="M4.5 8.5l7.5 7.5 7.5-7.5" {...stroke} strokeWidth={2.4} />;
    case 'contactBadge':
      return (
        <G>
          <Rect x={5.5} y={2.5} width={13} height={19} rx={2.2} fill={color} />
          <Circle cx={12} cy={9.4} r={2.3} fill="#000000" />
          <Path fill="#000000" d="M8 16.6c0-2 1.8-3.4 4-3.4s4 1.4 4 3.4v.6H8z" />
          <Rect x={10} y={4.2} width={4} height={1.2} rx={0.6} fill="#000000" />
        </G>
      );
    case 'paperCard':
      return (
        <G>
          <Rect x={2} y={5} width={20} height={14} rx={2.2} fill={color} />
          <Circle cx={7.6} cy={10.3} r={1.9} fill="#000000" />
          <Path fill="#000000" d="M4.6 15.8c0-1.7 1.3-2.8 3-2.8s3 1.1 3 2.8v.4h-6z" />
          <Rect x={12.4} y={9.2} width={7} height={1.6} rx={0.8} fill="#000000" />
          <Rect x={12.4} y={12.6} width={7} height={1.6} rx={0.8} fill="#000000" />
        </G>
      );
    case 'image':
      return (
        <Path
          fill={color}
          d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
        />
      );
    case 'searchOutline':
      return (
        <G {...stroke}>
          <Circle cx={10} cy={10} r={6.8} strokeWidth={1.7} />
          <Path d="M15 15l5.5 5.5" strokeWidth={1.9} />
        </G>
      );
    case 'check':
      return <Path d="M4.5 12.5 9.5 17.5 19.5 6.5" {...stroke} strokeWidth={3} />;
    case 'pause':
      return <Path fill={color} d="M6 5h4v14H6zM14 5h4v14h-4z" />;
    case 'stop':
      return <Rect x={5} y={5} width={14} height={14} rx={2} fill={color} />;
    case 'play':
      return <Path fill={color} d="M7 4.5v15a1 1 0 0 0 1.52.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5z" />;
    case 'moreVert':
      return (
        <G fill={color}>
          <Circle cx={12} cy={6} r={2} />
          <Circle cx={12} cy={12} r={2} />
          <Circle cx={12} cy={18} r={2} />
        </G>
      );
    case 'chatLines':
      // Round speech bubble with two text lines (Transcript tab).
      return (
        <G>
          <Path fill={color} d="M12 3c5 0 9 3.6 9 8s-4 8-9 8c-1.2 0-2.4-.2-3.5-.6L4 20l1.3-3.6C3.9 15 3 13.1 3 11c0-4.4 4-8 9-8z" />
          <Path d="M8 9.3h8M8 12.8h5.5" fill="none" stroke="#FFFFFF" strokeWidth={1.9} strokeLinecap="round" />
        </G>
      );
    case 'flashlight':
      return (
        <Path
          fill={color}
          d="M6 2h12v3H6zM6 7v1l2 3v11h8V11l2-3V7H6zm6 8.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
        />
      );
    case 'chevronRight':
      return <Path d="M8.5 3.5 17 12l-8.5 8.5" {...stroke} strokeWidth={2.6} />;
    case 'qrCode':
      return (
        <Path
          fill={color}
          d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 19h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z"
        />
      );
    case 'trashFilled':
      return <Path fill={color} d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />;
    case 'sendRight':
      return <Path fill={color} d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />;
    case 'arrowBack':
      return <Path fill={color} d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />;
    case 'videocam':
      return (
        <Path
          fill={color}
          d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"
        />
      );
    case 'message':
      return (
        <Path
          fill={color}
          d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
        />
      );
  }
}

// Filled "image" placeholder: rounded tile with a sun and a wave cut out.
export function ImagePlaceholder({ size, color, cutout }: { size: number; color: string; cutout: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={0} y={0} width={24} height={24} rx={5.6} fill={color} />
      <Circle cx={7.8} cy={7.5} r={2.5} fill={cutout} />
      <Path
        d="M-1 16.6C1 15.2 3.3 13.6 5 14.3c1.5.7 2.6 2.3 4.2 1.2 1.2-.9 2.1-2.7 3.4-2.8 2-.1 4.9 2.5 12.4 6.8"
        fill="none"
        stroke={cutout}
        strokeWidth={2.2}
      />
    </Svg>
  );
}

// Filled person placeholder: round head over a domed body.
export function PersonPlaceholder({ width, color }: { width: number; color: string }) {
  return (
    <Svg width={width} height={(width * 54.4) / 45} viewBox="0 0 45 54.4">
      <Circle cx={22.5} cy={13.7} r={13.7} fill={color} />
      <Path d="M4 54.4h37a4 4 0 0 0 4-4V47c0-9-10-15.3-22.5-15.3S0 38 0 47v3.4a4 4 0 0 0 4 4z" fill={color} />
    </Svg>
  );
}

type FieldIconProps = {
  name: CardFieldIcon;
  size: number;
  color: string;
};

export function FieldIcon({ name, size, color }: FieldIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Glyph name={name} color={color} />
    </Svg>
  );
}

function Glyph({ name, color }: { name: CardFieldIcon; color: string }) {
  switch (name) {
    case 'mail':
      return (
        <Path
          fill={color}
          d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
        />
      );
    case 'phone':
      return (
        <Path
          fill={color}
          d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        />
      );
    case 'web':
      return (
        <Path
          fill={color}
          d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6a2 2 0 0 0-2-2zm0 14H5V8h14v10z"
        />
      );
    case 'linkedin':
      return (
        <G fill={color}>
          <Rect x={4.5} y={9.5} width={3.2} height={10} />
          <Circle cx={6.1} cy={5.9} r={1.9} />
          <Path d="M10.2 9.5h3.1v1.4c.5-.9 1.6-1.7 3.2-1.7 2.6 0 3.5 1.7 3.5 4.3v6h-3.2v-5.3c0-1.3-.3-2.2-1.5-2.2-1.3 0-1.9.9-1.9 2.3v5.2h-3.2z" />
        </G>
      );
    case 'instagram':
      return (
        <G>
          <Rect x={3.5} y={3.5} width={17} height={17} rx={5} fill="none" stroke={color} strokeWidth={2.2} />
          <Circle cx={12} cy={12} r={3.9} fill="none" stroke={color} strokeWidth={2.2} />
          <Circle cx={17.2} cy={6.8} r={1.3} fill={color} />
        </G>
      );
    case 'link':
      return (
        <G fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round">
          <Path d="M10.4 13.6a3.6 3.6 0 0 0 5.1 0l3.1-3.1a3.6 3.6 0 0 0-5.1-5.1l-1.4 1.4" />
          <Path d="M13.6 10.4a3.6 3.6 0 0 0-5.1 0l-3.1 3.1a3.6 3.6 0 0 0 5.1 5.1l1.4-1.4" />
        </G>
      );
    case 'address':
      return (
        <Path
          fill={color}
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
        />
      );
    case 'calendly':
      return (
        <G fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round">
          <Rect x={4} y={5.5} width={16} height={14.5} rx={2} />
          <Path d="M8.5 3.5v3.5M15.5 3.5v3.5" />
          <Path d="M14.2 11.3a2.9 2.9 0 1 0 0 4.2" strokeWidth={1.6} />
        </G>
      );
    case 'x':
      return (
        <Path
          fill={color}
          d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2z"
        />
      );
    case 'facebook':
      return (
        <Path
          fill={color}
          d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.1H7.7v3.5h2.7V21h3.6v-9h2.8l.4-3.5H14z"
        />
      );
    case 'threads':
      return (
        <G fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
          <Path d="M16.6 11.4c-.4-2.3-2-3.5-4.3-3.5-2.5 0-4.2 1.6-4.2 4 0 2.6 1.9 4.2 4.3 4.2 2.8 0 4.5-2 4.5-5.1 0-4.1-2.3-6.9-5.4-6.9-4.4 0-7 3.4-7 7.9s2.6 8 7 8c2.6 0 4.5-1 5.7-2.8" />
          <Path d="M15.9 11.9c-1.2-.4-2.6-.6-3.9-.5-1.7.1-2.6.9-2.5 1.9.1 1 1.1 1.6 2.4 1.5 1.9-.1 3.2-1.4 3.4-3.6" />
        </G>
      );
    case 'snapchat':
      return (
        <Path
          fill={color}
          d="M12 3c2.9 0 5 2.1 5 5v2.4l1.5-.5c.5-.2 1 .4.6.8-.5.5-1.4.9-2.1 1.2.4 1.5 1.7 3 3.4 3.5.4.1.4.6 0 .8-.7.3-1.5.4-2.2.5-.2.5-.2 1.2-.7 1.2-.6 0-1.3-.3-2.1-.1-.9.2-1.6 1.4-3.4 1.4s-2.5-1.2-3.4-1.4c-.8-.2-1.5.1-2.1.1-.5 0-.5-.7-.7-1.2-.7-.1-1.5-.2-2.2-.5-.4-.2-.4-.7 0-.8 1.7-.5 3-2 3.4-3.5-.7-.3-1.6-.7-2.1-1.2-.4-.4.1-1 .6-.8l1.5.5V8c0-2.9 2.1-5 5-5z"
        />
      );
    case 'venmo':
      return (
        <Path
          fill={color}
          d="M18.6 3.2c.7 1.1 1 2.3 1 3.8 0 4.7-4 10.8-7.3 15H5.2L2.4 4.8l6.3-.6 1.5 12.2c1.4-2.3 3.2-5.9 3.2-8.4 0-1.3-.2-2.2-.6-3z"
        />
      );
  }
}
