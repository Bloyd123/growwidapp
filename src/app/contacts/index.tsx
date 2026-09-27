import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, TextInput, View, type TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionSheet } from '@/components/contacts/action-sheet';
import { ContactRow } from '@/components/contacts/contact-row';
import { CrmSheet } from '@/components/contacts/crm-sheet';
import { FilterSheet, type FilterOption } from '@/components/contacts/filter-sheet';
import { Icon } from '@/components/icons';
import { SideMenu } from '@/components/side-menu';
import { TAB_BAR_HEIGHT, TabBar } from '@/components/tab-bar';
import { shareContact } from '@/lib/share-contact';
import { CONTACT_SOURCES, contactName, useContacts, type Contact } from '@/state/contacts';
import { useProfile } from '@/state/profile';
import { fonts } from '@/theme';

type FilterKind = 'source' | 'tags' | 'cards';
const webNoFocusRing = Platform.OS === 'web' ? ({ outlineStyle: 'none' } as unknown as TextStyle) : null;

// Contacts tab: search, Source / Tags / Cards filters and the list of saved contacts.
export default function ContactsScreen() {
  const insets = useSafeAreaInsets();
  const { contacts, tags } = useContacts();
  const { card } = useProfile();
  const [query, setQuery] = useState('');
  const [newestFirst, setNewestFirst] = useState(true);
  const [filters, setFilters] = useState<Record<FilterKind, string[]>>({ source: [], tags: [], cards: [] });
  const [openFilter, setOpenFilter] = useState<FilterKind | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [crmOpen, setCrmOpen] = useState(false);
  const [sharing, setSharing] = useState<Contact | null>(null);

  const filterOptions: Record<FilterKind, { title: string; options: FilterOption[] }> = {
    source: { title: 'Source', options: CONTACT_SOURCES.map((s) => ({ key: s, label: s })) },
    tags: { title: 'Tags', options: tags.map((t) => ({ key: t, label: t })) },
    cards: { title: 'Cards', options: [{ key: card.name, label: card.name, dot: card.color }] },
  };

  const q = query.trim().toLowerCase();
  const visible = contacts
    .filter((c) => {
      if (q) {
        const haystack = [contactName(c), c.company, c.jobTitle, ...c.emails.map((e) => e.value)].join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.source.length && !filters.source.includes(c.source)) return false;
      if (filters.tags.length && !c.tags.some((t) => filters.tags.includes(t))) return false;
      if (filters.cards.length && !(c.cardName && filters.cards.includes(c.cardName))) return false;
      return true;
    })
    .slice();
  if (!newestFirst) visible.reverse();

  const current = openFilter ? filterOptions[openFilter] : null;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel="Open menu" hitSlop={10} onPress={() => setMenuOpen(true)} style={styles.menu}>
          <View style={styles.menuBar} />
          <View style={styles.menuBar} />
          <View style={styles.menuBar} />
        </Pressable>
        <Text style={styles.title}>Contacts</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Export contacts" hitSlop={8} onPress={() => setCrmOpen(true)} style={styles.export}>
          <Icon name="openInNew" size={24.4} color="#000000" />
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="New contact" hitSlop={8} onPress={() => router.push('/contacts/new')} style={styles.add}>
          <Icon name="plus" size={24.5} color="#000000" />
        </Pressable>
      </View>

      <View style={styles.search}>
        <Icon name="search" size={26} color="#3A3D45" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search"
          placeholderTextColor="#6B6E77"
          autoCorrect={false}
          cursorColor="#000000"
          selectionColor="#000000"
          style={[styles.searchInput, webNoFocusRing]}
        />
      </View>
      <View style={styles.rule} />

      <View style={styles.chips}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Sort"
          onPress={() => setNewestFirst((v) => !v)}
          style={styles.sort}>
          <Icon name="sortArrows" size={20} color="#000000" />
        </Pressable>
        {(['source', 'tags', 'cards'] as FilterKind[]).map((kind) => {
          const count = filters[kind].length;
          return (
            <Pressable
              key={kind}
              accessibilityRole="button"
              onPress={() => setOpenFilter(kind)}
              style={[styles.chip, count > 0 && styles.chipOn]}>
              <Text style={[styles.chipText, count > 0 && styles.chipTextOn]}>{filterOptions[kind].title}</Text>
              <Icon name="chevronDown" size={20} color={count > 0 ? '#FFFFFF' : '#000000'} />
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={visible}
        keyExtractor={(c) => c.id}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT + insets.bottom }}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <ContactRow
            contact={item}
            onPress={() => router.push({ pathname: '/contacts/[id]', params: { id: item.id } })}
            onShare={() => setSharing(item)}
          />
        )}
      />

      <TabBar active="contacts" />

      <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
      <CrmSheet visible={crmOpen} onClose={() => setCrmOpen(false)} />
      <FilterSheet
        visible={openFilter !== null}
        title={current?.title ?? ''}
        options={current?.options ?? []}
        selected={openFilter ? filters[openFilter] : []}
        onApply={(picked) => openFilter && setFilters((prev) => ({ ...prev, [openFilter]: picked }))}
        onClose={() => setOpenFilter(null)}
      />
      <ActionSheet
        visible={sharing !== null}
        dim={0.6}
        onClose={() => setSharing(null)}
        actions={[
          {
            key: 'share',
            icon: <Icon name="sendRight" size={25.8} color="#000000" />,
            label: 'Share contact',
            onPress: () => sharing && shareContact(sharing, false),
          },
          {
            key: 'company',
            icon: <Icon name="sendRight" size={25.8} color="#000000" />,
            label: 'Share contact with company',
            onPress: () => sharing && shareContact(sharing, true),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 64.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    position: 'absolute',
    left: 18.9,
    top: 26,
    width: 18.3,
    gap: 3.2,
  },
  menuBar: {
    height: 2.9,
    borderRadius: 1.2,
    backgroundColor: '#000000',
  },
  title: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 19.6,
    color: '#000000',
    includeFontPadding: false,
  },
  export: {
    position: 'absolute',
    right: 63.6,
    top: 20.2,
  },
  add: {
    position: 'absolute',
    right: 15.5,
    top: 20.2,
  },
  search: {
    height: 56,
    marginHorizontal: 15.9,
    paddingLeft: 11.5,
    borderRadius: 9.4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEEF2',
  },
  searchInput: {
    flex: 1,
    height: 56,
    marginLeft: 15.7,
    paddingVertical: 0,
    fontFamily: fonts.ui,
    fontSize: 15.2,
    color: '#000000',
  },
  rule: {
    height: 0.8,
    marginTop: 12.4,
    backgroundColor: '#EAEAEA',
  },
  chips: {
    height: 32.5,
    marginTop: 12.4,
    paddingLeft: 15.9,
    flexDirection: 'row',
    gap: 8.3,
  },
  sort: {
    width: 31.9,
    height: 31.9,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#CFCFCF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    height: 32.5,
    paddingLeft: 12.4,
    paddingRight: 8.3,
    borderRadius: 16.3,
    borderWidth: 1.2,
    borderColor: '#CFCFCF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chipOn: {
    borderColor: '#000000',
    backgroundColor: '#000000',
  },
  chipText: {
    fontFamily: fonts.uiMedium,
    fontSize: 13.5,
    color: '#000000',
    includeFontPadding: false,
  },
  chipTextOn: {
    color: '#FFFFFF',
  },
  list: {
    flex: 1,
    marginTop: 11.2,
  },
});
