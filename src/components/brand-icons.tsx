import { useId } from 'react';
import Svg, { Circle, Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

// Sign-in provider marks used on the create-account screen.
export function GoogleMark({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <Path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <Path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <Path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </Svg>
  );
}

export function MicrosoftMark({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 21">
      <Rect x={0} y={0} width={10} height={10} fill="#F25022" />
      <Rect x={11} y={0} width={10} height={10} fill="#7FBA00" />
      <Rect x={0} y={11} width={10} height={10} fill="#00A4EF" />
      <Rect x={11} y={11} width={10} height={10} fill="#FFB900" />
    </Svg>
  );
}

export function AppleMark({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill="#000000"
        d="M16.37 12.67c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.4-.89-1.75.03-3.36 1.02-4.26 2.58-1.82 3.15-.47 7.82 1.3 10.38.87 1.25 1.9 2.66 3.26 2.61 1.31-.05 1.8-.84 3.38-.84 1.58 0 2.02.84 3.4.82 1.41-.03 2.3-1.28 3.16-2.54.99-1.45 1.4-2.86 1.43-2.93-.03-.01-2.74-1.05-2.77-4.18zM13.78 5.03c.72-.88 1.21-2.09 1.08-3.3-1.04.04-2.3.69-3.05 1.57-.67.77-1.26 2.01-1.1 3.19 1.16.09 2.35-.59 3.07-1.46z"
      />
    </Svg>
  );
}

// Purple-to-pink "AI" sparkle shown next to the LinkedIn label.
export function SparkleMark({ size }: { size: number }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Defs>
        <LinearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#7B5CF0" />
          <Stop offset="1" stopColor="#F0508F" />
        </LinearGradient>
      </Defs>
      <G fill={`url(#${id}g)`}>
        <Path d="M6.5 3c.55 3.1 2.05 4.6 5.1 5.1-3.05.5-4.55 2-5.1 5.1-.55-3.1-2.05-4.6-5.1-5.1 3.05-.5 4.55-2 5.1-5.1z" />
        <Path d="M12.6.6c.23 1.3.86 1.93 2.15 2.15-1.29.22-1.92.85-2.15 2.15-.23-1.3-.86-1.93-2.15-2.15C11.74 2.53 12.37 1.9 12.6.6z" />
        <Path d="M13 10.4c.2 1.05.7 1.55 1.75 1.75-1.05.2-1.55.7-1.75 1.75-.2-1.05-.7-1.55-1.75-1.75 1.05-.2 1.55-.7 1.75-1.75z" />
      </G>
    </Svg>
  );
}

// Share list marks (Send Your Card). Simplified app glyphs at 24×24.
const HANDSET =
  'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z';

export function WhatsAppMark({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path fill="#25D366" d="M12 1.6A10.4 10.4 0 0 0 3.1 17.4L1.7 22.4l5.1-1.3A10.4 10.4 0 1 0 12 1.6z" />
      <Path
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={1.3}
        d="M12 3.5a8.5 8.5 0 0 0-7.2 13l-.9 3.4 3.5-.9A8.5 8.5 0 1 0 12 3.5z"
      />
      <G transform="translate(7.1 7.1) scale(0.41)">
        <Path fill="#FFFFFF" d={HANDSET} />
      </G>
    </Svg>
  );
}

export function LinkedInTile({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={0} y={0} width={24} height={24} rx={4.4} fill="#0A66C2" />
      <Rect x={4.9} y={9.4} width={3.1} height={9.6} fill="#FFFFFF" />
      <Circle cx={6.45} cy={6.3} r={1.85} fill="#FFFFFF" />
      <Path
        fill="#FFFFFF"
        d="M10.3 9.4h3v1.35c.5-.95 1.7-1.6 3.1-1.6 2.5 0 3.6 1.55 3.6 4.25V19h-3.1v-4.9c0-1.35-.45-2.2-1.65-2.2-1.25 0-1.85.95-1.85 2.3V19h-3.1z"
      />
    </Svg>
  );
}

export function XTile({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={0} y={0} width={24} height={24} rx={4.4} fill="#000000" />
      <Path fill="none" stroke="#FFFFFF" strokeWidth={1.2} strokeLinejoin="round" d="M5.3 5.6h3.9l9.5 12.8h-3.9z" />
      <Path stroke="#FFFFFF" strokeWidth={1.4} strokeLinecap="round" d="M18.2 5.6l-5.1 5.6M10.9 13.6l-5.1 4.8" />
    </Svg>
  );
}

// Four-colour pinwheel for "Save QR code to photos".
export function PhotosMark({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path fill="#EA4335" d="M1.5 12a5.25 5.25 0 0 1 10.5 0z" />
      <Path fill="#FBBC04" d="M12 1.5a5.25 5.25 0 0 1 0 10.5z" />
      <Path fill="#4285F4" d="M22.5 12a5.25 5.25 0 0 1-10.5 0z" />
      <Path fill="#34A853" d="M12 22.5a5.25 5.25 0 0 1 0-10.5z" />
    </Svg>
  );
}

export function IndiaFlag({ width }: { width: number }) {
  return (
    <Svg width={width} height={(width * 2) / 3} viewBox="0 0 24 16">
      <Rect x={0} y={0} width={24} height={5.34} fill="#FF9933" />
      <Rect x={0} y={5.33} width={24} height={5.34} fill="#FFFFFF" />
      <Rect x={0} y={10.66} width={24} height={5.34} fill="#138808" />
      <Circle cx={12} cy={8} r={2} fill="none" stroke="#000080" strokeWidth={0.6} />
      <Circle cx={12} cy={8} r={0.5} fill="#000080" />
    </Svg>
  );
}

// Stacked coloured cards used as the wallet app mark on the "Add pass" screen.
export function WalletStackMark({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={1.5} y={3.5} width={21} height={7} rx={2.2} fill="#34A853" />
      <Rect x={1.5} y={6.5} width={21} height={7} rx={2.2} fill="#FBBC04" />
      <Rect x={1.5} y={9.5} width={21} height={7} rx={2.2} fill="#EA4335" />
      <Rect x={1.5} y={12.5} width={21} height={8.5} rx={2.6} fill="#4285F4" />
    </Svg>
  );
}

// Simplified CRM app marks for the "Sync contacts into your CRM" illustration.
export function HubSpotMark({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G stroke="#FF7A59" strokeWidth={2.4} strokeLinecap="round" fill="none">
        <Circle cx={14.5} cy={14.5} r={4.2} />
        <Path d="M14.5 10.3V5.8M11.4 11.6 5.6 6.4M11.6 17.6l-3 3" />
      </G>
      <Circle cx={14.5} cy={4.6} r={1.9} fill="#FF7A59" />
      <Circle cx={4.8} cy={5.6} r={2.2} fill="#FF7A59" />
    </Svg>
  );
}

export function SalesforceMark({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G fill="#00A1E0">
        <Circle cx={7.5} cy={12.5} r={4.3} />
        <Circle cx={11.6} cy={9.6} r={4.6} />
        <Circle cx={16.6} cy={11.2} r={4.6} />
        <Circle cx={13} cy={15} r={3.6} />
      </G>
    </Svg>
  );
}

export function ZapierMark({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G stroke="#FF4F00" strokeWidth={3.6} strokeLinecap="round">
        <Path d="M12 2.8v18.4M2.8 12h18.4M5.5 5.5l13 13M18.5 5.5l-13 13" />
      </G>
      <Circle cx={12} cy={12} r={2.4} fill="#FFFFFF" />
    </Svg>
  );
}

// Two-triangle company logo used for one of the sample contacts.
export function SampleLogoMark({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path fill="#F5B400" d="M8.5 3.5l8 5-8 3.6z" />
      <Path fill="#E0432B" d="M15.5 12.4v8.1l-8-4.6z" />
    </Svg>
  );
}

// Rounded-square app tiles for the "Invite friends" sheet.
export function WhatsAppTile({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={0} y={0} width={24} height={24} rx={5} fill="#25D366" />
      <Path
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={1.5}
        d="M12 4.6a7.4 7.4 0 0 0-6.3 11.3l-.9 3.3 3.4-.9A7.4 7.4 0 1 0 12 4.6z"
      />
      <G transform="translate(8.1 8.1) scale(0.33)">
        <Path fill="#FFFFFF" d={HANDSET} />
      </G>
    </Svg>
  );
}

export function MessagesTile({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={0} y={0} width={24} height={24} rx={5} fill="#FFFFFF" />
      <Path fill="#1A73E8" d="M6.5 7.5h11a2.5 2.5 0 0 1 2.5 2.5v2.4a2.5 2.5 0 0 1-2.5 2.5h-5l-3.6 2.7v-2.7H6.5A2.5 2.5 0 0 1 4 12.4V10a2.5 2.5 0 0 1 2.5-2.5z" />
      <Path fill="#8AB4F8" d="M8.9 14.9h3.6l-3.6 2.7z" />
    </Svg>
  );
}

export function GmailTile({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={0} y={0} width={24} height={24} rx={5} fill="#FFFFFF" />
      <Path fill="#4285F4" d="M4.2 17.8h2.6v-6.3L3.2 8.8v7.9c0 .6.4 1.1 1 1.1z" />
      <Path fill="#34A853" d="M17.2 17.8h2.6c.6 0 1-.5 1-1.1V8.8l-3.6 2.7z" />
      <Path fill="#FBBC04" d="M17.2 7v4.5l3.6-2.7V7.4c0-1.4-1.6-2.2-2.7-1.4z" />
      <Path fill="#EA4335" d="M6.8 11.5V7L12 10.9 17.2 7v4.5L12 15.4z" />
      <Path fill="#C5221F" d="M3.2 7.4v1.4l3.6 2.7V7l-.9-.7c-1.1-.8-2.7 0-2.7 1.1z" />
    </Svg>
  );
}
