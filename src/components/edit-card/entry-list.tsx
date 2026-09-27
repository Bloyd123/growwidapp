import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FieldIcon, Icon } from '@/components/icons';
import { UnderlineInput } from '@/components/underline-input';
import { FIELD_TYPES, fieldType, type EntryType } from '@/data/field-types';
import type { Entry } from '@/state/profile';
import { fonts } from '@/theme';

type EntryListProps = {
  entries: Entry[];
  color: string;
  onChange: (id: string, patch: Partial<Entry>) => void;
  onRemove: (id: string) => void;
  onAdd: (type: EntryType) => void;
};

// Editable contact/social fields followed by the grid of field types that can be added.
export function EntryList({ entries, color, onChange, onRemove, onAdd }: EntryListProps) {
  return (
    <View>
      <View style={[styles.pill, styles.reorderPill]}>
        <Text style={styles.pillText}>Hold each field below to re-order it</Text>
        <Icon name="reorder" size={21.2} color="#000000" />
      </View>

      {entries.map((entry, i) => (
        <EntryRow
          key={entry.id}
          entry={entry}
          color={color}
          first={i === 0}
          onChange={(patch) => onChange(entry.id, patch)}
          onRemove={() => onRemove(entry.id)}
        />
      ))}

      <View style={[styles.pill, styles.addPill]}>
        <Text style={styles.pillText}>Tap a field below to add it</Text>
        <Icon name="plus" size={21.2} color="#000000" />
      </View>

      <View style={styles.grid}>
        {FIELD_TYPES.map((f) => (
          <Pressable
            key={f.type}
            accessibilityRole="button"
            accessibilityLabel={`Add ${f.label}`}
            onPress={() => onAdd(f.type)}
            style={styles.cell}>
            <View style={[styles.cellDot, { backgroundColor: color }]}>
              <FieldIcon name={f.icon} size={28.3} color="#FFFFFF" />
            </View>
            <Text style={styles.cellLabel}>{f.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

type EntryRowProps = {
  entry: Entry;
  color: string;
  first: boolean;
  onChange: (patch: Partial<Entry>) => void;
  onRemove: () => void;
};

function EntryRow({ entry, color, first, onChange, onRemove }: EntryRowProps) {
  const config = fieldType(entry.type);
  const isPhone = entry.type === 'phone';
  return (
    <View style={[styles.row, first && styles.firstRow]}>
      <View style={[styles.rowDot, { backgroundColor: color }]}>
        <FieldIcon name={config.icon} size={18.9} color="#FFFFFF" />
      </View>
      <View style={styles.inputs}>
        <View style={styles.valueLine}>
          <UnderlineInput
            value={entry.value}
            onChangeText={(value) => onChange({ value })}
            keyboardType={config.keyboardType}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.flex}
          />
          {isPhone ? (
            <UnderlineInput
              value={entry.ext ?? ''}
              onChangeText={(ext) => onChange({ ext })}
              placeholder="Ext."
              keyboardType="phone-pad"
              style={styles.ext}
            />
          ) : null}
        </View>
        <UnderlineInput
          value={entry.title}
          onChangeText={(title) => onChange({ title })}
          placeholder={config.titleField === 'label' ? 'Enter a label (optional)' : 'Enter a title (optional)'}
          style={styles.titleLine}
        />
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remove ${config.label}`}
        hitSlop={10}
        onPress={onRemove}
        style={styles.remove}>
        <Icon name="close" size={24.8} color="#000000" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'center',
    height: 38.9,
    paddingHorizontal: 16.5,
    borderRadius: 7.1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9.4,
    backgroundColor: '#F2F2F2',
  },
  reorderPill: {
    marginTop: 31.9,
  },
  addPill: {
    marginTop: 40.1,
    height: 37.8,
  },
  pillText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 16,
    color: '#000000',
  },
  row: {
    marginTop: 31.3,
    flexDirection: 'row',
    paddingLeft: 15.9,
  },
  firstRow: {
    marginTop: 27.1,
  },
  rowDot: {
    width: 37.8,
    height: 37.8,
    borderRadius: 18.9,
    marginTop: 31.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    flex: 1,
    marginLeft: 12.4,
    marginRight: 52.1,
  },
  valueLine: {
    flexDirection: 'row',
    gap: 8.9,
  },
  flex: {
    flex: 1,
  },
  ext: {
    width: 72,
  },
  titleLine: {
    marginTop: 22.4,
  },
  remove: {
    position: 'absolute',
    right: 16.1,
    top: -3.5,
  },
  grid: {
    marginTop: 17.1,
    paddingTop: 9.4,
    paddingBottom: 21.2,
    borderTopLeftRadius: 18.9,
    borderTopRightRadius: 18.9,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F4E0DF',
  },
  cell: {
    width: '33.333%',
    height: 94.4,
    alignItems: 'center',
  },
  cellDot: {
    width: 47.2,
    height: 47.2,
    borderRadius: 23.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellLabel: {
    marginTop: 9.4,
    fontFamily: fonts.ui,
    fontSize: 14.2,
    lineHeight: 18.9,
    color: '#000000',
  },
});
