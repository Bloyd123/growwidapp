import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ContactAvatar } from '@/components/contacts/contact-avatar';
import { Icon } from '@/components/icons';
import { contactDateLabel, contactName, contactSubtitle, type Contact } from '@/state/contacts';
import { fonts } from '@/theme';

export const CONTACT_ROW_HEIGHT = 89.7;

type ContactRowProps = {
  contact: Contact;
  onPress: () => void;
  onShare: () => void;
};

// One line of the Contacts list: avatar, name and subtitle, date, and a share button.
export function ContactRow({ contact, onPress, onShare }: ContactRowProps) {
  const subtitle = contactSubtitle(contact);
  return (
    // No button role on the row itself: it holds the share button, and buttons can't nest on web.
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <ContactAvatar contact={contact} size={64.3} />
      <View style={styles.text}>
        <Text style={styles.name} numberOfLines={1}>
          {contactName(contact)}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <Text style={styles.date}>{contactDateLabel(contact)}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel="Share contact" hitSlop={10} onPress={onShare} style={styles.share}>
        <Icon name="shareNodes" size={22} color="#000000" />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    height: CONTACT_ROW_HEIGHT,
    paddingLeft: 15.9,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
  },
  pressed: {
    backgroundColor: '#F7F7F7',
  },
  text: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 19.5,
    marginLeft: 17.2,
    marginRight: 86,
  },
  name: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 17.6,
    lineHeight: 24,
    color: '#000000',
  },
  subtitle: {
    fontFamily: fonts.ui,
    fontSize: 17.8,
    lineHeight: 24,
    color: '#1A1A1A',
  },
  date: {
    position: 'absolute',
    top: 13.2,
    right: 7.7,
    fontFamily: fonts.ui,
    fontSize: 12.1,
    color: '#1A1A1A',
  },
  share: {
    position: 'absolute',
    top: 34.5,
    right: 15.9,
  },
});
