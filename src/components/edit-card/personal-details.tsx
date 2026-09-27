import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Chip } from '@/components/chip';
import { TextField } from '@/components/text-field';
import type { Card, NameExtra } from '@/state/profile';

import { Section } from './section';

const EXTRAS: { key: NameExtra; label: string }[] = [
  { key: 'prefix', label: 'Prefix' },
  { key: 'suffix', label: 'Suffix' },
  { key: 'pronoun', label: 'Pronoun' },
  { key: 'preferred', label: 'Preferred' },
  { key: 'maidenName', label: 'Maiden name' },
];

type PersonalDetailsProps = {
  card: Card;
  onChange: (patch: Partial<Card>) => void;
};

export function PersonalDetails({ card, onChange }: PersonalDetailsProps) {
  const [accreditation, setAccreditation] = useState('');
  const setExtra = (key: NameExtra, value: string | undefined) => {
    const extras = { ...card.extras };
    if (value === undefined) delete extras[key];
    else extras[key] = value;
    onChange({ extras });
  };
  const addAccreditation = () => {
    const value = accreditation.trim();
    if (!value) return;
    onChange({ accreditations: [...card.accreditations, value] });
    setAccreditation('');
  };

  return (
    <Section title="Personal details" style={styles.section}>
      <View style={styles.body}>
        <TextField
          label="First name"
          value={card.firstName}
          onChangeText={(firstName) => onChange({ firstName })}
          autoCapitalize="words"
          style={styles.first}
        />
        <TextField
          label="Middle name"
          value={card.middleName}
          onChangeText={(middleName) => onChange({ middleName })}
          onRemove={() => onChange({ middleName: '' })}
          autoCapitalize="words"
          style={styles.next}
        />
        <TextField
          label="Last name"
          value={card.lastName}
          onChangeText={(lastName) => onChange({ lastName })}
          autoCapitalize="words"
          style={styles.next}
        />
        {EXTRAS.filter((e) => card.extras[e.key] !== undefined).map((e) => (
          <TextField
            key={e.key}
            label={e.label}
            value={card.extras[e.key]}
            onChangeText={(value) => setExtra(e.key, value)}
            onRemove={() => setExtra(e.key, undefined)}
            style={styles.next}
          />
        ))}

        <View style={styles.chips}>
          {EXTRAS.filter((e) => card.extras[e.key] === undefined).map((e) => (
            <Chip
              key={e.key}
              plus
              label={e.label}
              height={38.4}
              labelStyle={styles.chipLabel}
              onPress={() => setExtra(e.key, '')}
            />
          ))}
        </View>

        <TextField
          label="Job title"
          value={card.jobTitle}
          onChangeText={(jobTitle) => onChange({ jobTitle })}
          autoCapitalize="words"
          style={styles.afterChips}
        />
        <TextField
          label="Department"
          value={card.department}
          onChangeText={(department) => onChange({ department })}
          autoCapitalize="words"
          style={styles.next}
        />
        <TextField
          label="Company"
          value={card.company}
          onChangeText={(company) => onChange({ company })}
          autoCapitalize="words"
          style={styles.next}
        />
        <TextField
          label="Headline"
          value={card.headline}
          onChangeText={(headline) => onChange({ headline })}
          multiline
          height={85}
          style={styles.next}
        />
        <View style={styles.accreditationRow}>
          <TextField
            label="Accreditation"
            value={accreditation}
            onChangeText={setAccreditation}
            style={styles.accreditation}
          />
          <Button title="Add" height={47.8} onPress={addAccreditation} style={styles.add} />
        </View>
        {card.accreditations.length ? (
          <View style={styles.accreditationList}>
            {card.accreditations.map((a, i) => (
              <Chip
                key={`${a}-${i}`}
                label={`${a}  ×`}
                height={35.4}
                onPress={() => onChange({ accreditations: card.accreditations.filter((_, j) => j !== i) })}
              />
            ))}
          </View>
        ) : null}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingBottom: 0,
  },
  body: {
    paddingHorizontal: 15.9,
  },
  first: {
    marginTop: 36,
  },
  next: {
    marginTop: 15.3,
  },
  chips: {
    marginTop: 7.7,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 8.3,
    rowGap: 7.7,
  },
  chipLabel: {
    fontSize: 16.4,
  },
  afterChips: {
    marginTop: 40.1,
  },
  accreditationRow: {
    marginTop: 15.3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.9,
  },
  accreditation: {
    flex: 1,
  },
  add: {
    width: 87.9,
    borderRadius: 7.1,
  },
  accreditationList: {
    marginTop: 11.8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7.1,
  },
});
