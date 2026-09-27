import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Linking, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View, type TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IndiaFlag } from '@/components/brand-icons';
import { Icon } from '@/components/icons';
import { Toggle } from '@/components/toggle';
import { goBack } from '@/lib/go-back';
import { cardUrl, useProfile } from '@/state/profile';
import { fonts } from '@/theme';

type Kind = 'text' | 'email' | 'whatsapp';

const KINDS: Record<
  Kind,
  { title: string; to: string; cta: string; phone: boolean; message: (firstName: string) => string }
> = {
  text: {
    title: 'Text Your Card',
    to: 'Text your Groowid card to...',
    cta: 'SEND TEXT',
    phone: true,
    message: (firstName) => `Hey this is ${firstName}! This is my Groowid card, tap the link to save my info.`,
  },
  email: {
    title: 'Email Your Card',
    to: 'Email your Groowid card to...',
    cta: 'SEND EMAIL',
    phone: false,
    message: () => 'Hi, tap this link to get my business card:',
  },
  whatsapp: {
    title: 'Send via Whatsapp',
    to: 'Whatsapp your Groowid card to...',
    cta: 'SEND MESSAGE',
    phone: true,
    message: () => 'Hi, tap this link to get my business card:',
  },
};

// Message box layout per screen, measured from the reference (label top, input top/height).
const MESSAGE_BOX: Record<Kind, { height: number; labelTop: number; inputTop: number; inputHeight: number; rule: number }> = {
  text: { height: 144, labelTop: 9.3, inputTop: 43.6, inputHeight: 83.9, rule: 1.2 },
  email: { height: 108, labelTop: 27.6, inputTop: 62.5, inputHeight: 28.4, rule: 1.8 },
  whatsapp: { height: 89.7, labelTop: 9.3, inputTop: 44.2, inputHeight: 29, rule: 1.2 },
};

const webNoFocusRing = Platform.OS === 'web' ? ({ outlineStyle: 'none' } as unknown as TextStyle) : null;

// Text / Email / WhatsApp your card: recipient, editable message, and SEND, which opens the
// phone's SMS, mail or WhatsApp app with the message filled in.
export default function ShareMessageScreen() {
  const insets = useSafeAreaInsets();
  const { kind: kindParam } = useLocalSearchParams<{ kind?: string }>();
  const kind: Kind = kindParam === 'email' || kindParam === 'whatsapp' ? kindParam : 'text';
  const config = KINDS[kind];
  const box = MESSAGE_BOX[kind];
  const { card } = useProfile();
  const [to, setTo] = useState('');
  const [message, setMessage] = useState(() => config.message(card.firstName));
  const [toFocused, setToFocused] = useState(true);
  const [sendFromGroowid, setSendFromGroowid] = useState(false);

  const send = () => {
    const body = `${message} ${cardUrl(card)}`;
    const digits = to.replace(/[^0-9]/g, '');
    const target =
      kind === 'email'
        ? `mailto:${to.trim()}?subject=${encodeURIComponent('My Groowid card')}&body=${encodeURIComponent(body)}`
        : kind === 'whatsapp'
          ? `https://wa.me/${digits ? `91${digits}` : ''}?text=${encodeURIComponent(body)}`
          : `sms:${digits ? `+91${digits}` : ''}${Platform.OS === 'ios' ? '&' : '?'}body=${encodeURIComponent(body)}`;
    Linking.openURL(target).catch(() => {});
  };

  return (
    <View style={[styles.screen, { backgroundColor: card.color, paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel="Back" hitSlop={12} onPress={() => goBack('/share')} style={styles.back}>
          <Icon name="chevronLeft" size={26} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.title}>{config.title}</Text>
        <Pressable accessibilityRole="button" hitSlop={10} onPress={send} style={styles.headerSend}>
          <Text style={styles.headerSendText}>SEND</Text>
        </Pressable>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        <View style={styles.toBox}>
          <Text style={styles.boxLabel}>{config.to}</Text>
          <View style={[styles.toRow, config.phone ? styles.toRowPhone : styles.toRowEmail]}>
            {config.phone ? (
              <View style={styles.prefix}>
                <IndiaFlag width={21.8} />
                <Text style={styles.prefixText}>+91</Text>
                <Icon name="caretDown" size={18.5} color="#FFFFFF" />
              </View>
            ) : null}
            <View style={[styles.toInputWrap, config.phone ? styles.toInputPhone : styles.toInputEmail]}>
              <TextInput
                value={to}
                onChangeText={setTo}
                autoFocus
                keyboardType={config.phone ? 'phone-pad' : 'email-address'}
                autoCapitalize="none"
                autoCorrect={false}
                cursorColor="#FFFFFF"
                selectionColor="rgba(255,255,255,0.6)"
                onFocus={() => setToFocused(true)}
                onBlur={() => setToFocused(false)}
                style={[styles.toInput, webNoFocusRing]}
              />
              <View style={[styles.rule, toFocused ? styles.ruleFocused : null]} />
            </View>
          </View>
          <View style={styles.contacts}>
            <Icon name="contacts" size={25} color={card.color} />
            <Text style={[styles.contactsText, { color: card.color }]}>Contacts</Text>
          </View>
        </View>

        <View style={[styles.messageBox, { height: box.height }]}>
          <Text style={[styles.boxLabel, { marginTop: box.labelTop }]}>Edit your message...</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            multiline={kind === 'text'}
            cursorColor="#FFFFFF"
            selectionColor="rgba(255,255,255,0.6)"
            style={[styles.messageInput, { top: box.inputTop, height: box.inputHeight }, webNoFocusRing]}
          />
          <View style={[styles.messageRule, { top: box.inputTop + box.inputHeight, height: box.rule }]} />
        </View>

        {kind === 'email' ? (
          <View style={styles.sendFrom}>
            <Text style={styles.sendFromText}>Send from Groowid</Text>
            <Icon name="infoOutline" size={23} color="#FFFFFF" />
            <View style={styles.flex} />
            <Toggle variant="onCoral" value={sendFromGroowid} onValueChange={setSendFromGroowid} accessibilityLabel="Send from Groowid" />
          </View>
        ) : null}

        <Pressable
          accessibilityRole="button"
          onPress={send}
          style={({ pressed }) => [styles.pill, kind === 'email' && styles.pillEmail, pressed && styles.pressed]}>
          <Icon name="sendRight" size={25} color={card.color} />
          <Text style={[styles.pillText, { color: card.color }]}>{config.cta}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    height: 63.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 15.5,
    top: 18.9,
  },
  title: {
    fontFamily: fonts.ui,
    fontSize: 20.2,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  headerSend: {
    position: 'absolute',
    right: 21.8,
    top: 21.5,
  },
  headerSendText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 16.6,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  toBox: {
    height: 105.7,
    marginTop: 32.4,
    marginHorizontal: 18.3,
    borderRadius: 9.4,
    backgroundColor: 'rgba(0,0,0,0.235)',
  },
  boxLabel: {
    marginTop: 17,
    marginLeft: 17.6,
    fontFamily: fonts.uiSemiBold,
    fontSize: 18.4,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  toRow: {
    position: 'absolute',
    top: 58.6,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  toRowPhone: {
    left: 17.7,
  },
  toRowEmail: {
    left: 21.8,
  },
  prefix: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefixText: {
    marginLeft: 4.8,
    fontFamily: fonts.uiMedium,
    fontSize: 15.8,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  toInputWrap: {
    height: 32.4,
    justifyContent: 'flex-end',
  },
  toInputPhone: {
    marginLeft: 8.7,
    width: 205.4,
  },
  toInputEmail: {
    width: 270.4,
  },
  toInput: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    fontFamily: fonts.uiMedium,
    fontSize: 18.1,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  rule: {
    height: 1.2,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  ruleFocused: {
    height: 2.4,
    backgroundColor: '#FFFFFF',
  },
  contacts: {
    position: 'absolute',
    right: 17.1,
    top: 20.7,
    width: 59.6,
    height: 63.2,
    borderRadius: 4.7,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
  },
  contactsText: {
    fontFamily: fonts.uiMedium,
    fontSize: 11,
    includeFontPadding: false,
  },
  messageBox: {
    marginTop: 23.6,
    marginHorizontal: 18.3,
    borderRadius: 9.4,
    backgroundColor: 'rgba(0,0,0,0.235)',
  },
  messageInput: {
    position: 'absolute',
    left: 22,
    right: 21.8,
    paddingVertical: 0,
    paddingHorizontal: 0,
    fontFamily: fonts.uiMedium,
    fontSize: 18.1,
    lineHeight: 27.1,
    color: '#FFFFFF',
    textAlignVertical: 'top',
    includeFontPadding: false,
  },
  messageRule: {
    position: 'absolute',
    left: 21.8,
    right: 21.8,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  sendFrom: {
    height: 24,
    marginTop: 32.3,
    marginLeft: 18.9,
    marginRight: 29.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11.8,
  },
  sendFromText: {
    fontFamily: fonts.ui,
    fontSize: 20.1,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  flex: {
    flex: 1,
  },
  pill: {
    alignSelf: 'center',
    height: 54.9,
    marginTop: 20.1,
    paddingHorizontal: 32,
    borderRadius: 27.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7.6,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 3px 8px rgba(0,0,0,0.18)',
  },
  pillEmail: {
    marginTop: 27.3,
  },
  pressed: {
    opacity: 0.85,
  },
  pillText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15.6,
    includeFontPadding: false,
  },
});
