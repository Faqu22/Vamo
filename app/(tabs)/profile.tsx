import { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FriendItem } from '@/components/ui/friend-item';
import { FrequentPlaceItem } from '@/components/ui/frequent-place-item';
import { InterestPill } from '@/components/ui/interest-pill';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MOCK_FRIENDS } from '@/mocksdata/friends';
import { MOCK_FREQUENT_PLACES } from '@/mocksdata/places';
import { MOCK_USER } from '@/mocksdata/user';

type ActiveTab = 'places' | 'friends';

export default function ProfileScreen() {
  const user = MOCK_USER;
  const [activeTab, setActiveTab] = useState<ActiveTab>('places');
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryTextColor = useThemeColor({}, 'icon');
  const borderColor = useThemeColor({}, 'border');

  const renderContent = () => {
    if (activeTab === 'places') {
      return (
        <FlatList
          data={MOCK_FREQUENT_PLACES}
          renderItem={({ item }) => <FrequentPlaceItem item={item} />}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      );
    }
    return (
      <FlatList
        data={MOCK_FRIENDS}
        renderItem={({ item }) => <FriendItem item={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <ThemedView style={[styles.card, { backgroundColor: cardColor }]}>
        <View style={styles.header}>
          <Image source={{ uri: user.profilePictureUrl }} style={styles.profilePicture} />
          <ThemedText type="title" style={styles.name}>
            {user.name} {user.lastName}
          </ThemedText>
          <ThemedText style={[styles.age, { color: secondaryTextColor }]}>
            {user.age} años
          </ThemedText>
          <ThemedText style={styles.bio}>{user.bio}</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Intereses
          </ThemedText>
          <View style={styles.interestsContainer}>
            {user.interests.map((interest) => (
              <InterestPill key={interest} label={interest} />
            ))}
          </View>
        </View>
      </ThemedView>

      <ThemedView style={[styles.card, { backgroundColor: cardColor, marginTop: 10 }]}>
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => setActiveTab('places')}
            style={[styles.tab, activeTab === 'places' && { borderBottomColor: primaryColor }]}
          >
            <ThemedText
              type="defaultSemiBold"
              style={{ color: activeTab === 'places' ? primaryColor : secondaryTextColor }}
            >
              Lugares Frecuentes
            </ThemedText>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('friends')}
            style={[styles.tab, activeTab === 'friends' && { borderBottomColor: primaryColor }]}
          >
            <ThemedText
              type="defaultSemiBold"
              style={{ color: activeTab === 'friends' ? primaryColor : secondaryTextColor }}
            >
              Amigos
            </ThemedText>
          </Pressable>
        </View>
        {renderContent()}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
    borderRadius: 20,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    marginBottom: 5,
  },
  age: {
    fontSize: 18,
    marginBottom: 15,
  },
  bio: {
    textAlign: 'center',
    fontSize: 16,
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    paddingVertical: 15,
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  listContainer: {
    paddingTop: 20,
  },
});