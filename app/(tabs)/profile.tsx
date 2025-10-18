import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FriendItem } from '@/components/ui/friend-item';
import { FrequentPlaceItem } from '@/components/ui/frequent-place-item';
import { InterestPill } from '@/components/ui/interest-pill';
import { useFriends } from '@/hooks/use-friends';
import { useFrequentPlaces } from '@/hooks/use-frequent-places';
import { useProfile } from '@/hooks/use-profile';
import { useThemeColor } from '@/hooks/use-theme-color';

type ActiveTab = 'places' | 'friends';

export default function ProfileScreen() {
  const { user, isLoading, isError } = useProfile();
  const { places, isLoading: isLoadingPlaces } = useFrequentPlaces();
  const { friends, isLoading: isLoadingFriends } = useFriends();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<ActiveTab>('places');
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryTextColor = useThemeColor({}, 'icon');

  const renderContent = () => {
    if (activeTab === 'places') {
      if (isLoadingPlaces)
        return <ActivityIndicator color={primaryColor} style={styles.listLoader} />;
      return (
        <FlatList
          key="places"
          data={places}
          renderItem={({ item }) => <FrequentPlaceItem item={item} />}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      );
    }
    if (isLoadingFriends)
      return <ActivityIndicator color={primaryColor} style={styles.listLoader} />;
    return (
      <FlatList
        key="friends"
        data={friends}
        renderItem={({ item }) => <FriendItem item={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

  if (isLoading) {
    return (
      <ThemedView style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={primaryColor} />
      </ThemedView>
    );
  }

  if (isError || !user) {
    return (
      <ThemedView style={styles.centeredContainer}>
        <ThemedText type="subtitle" style={{ marginBottom: 20 }}>
          Únete a Vamo
        </ThemedText>
        <ThemedText style={{ textAlign: 'center', marginBottom: 30, paddingHorizontal: 20 }}>
          Inicia sesión o crea una cuenta para ver tu perfil y empezar a crear planes.
        </ThemedText>
        <Pressable
          style={[styles.button, { backgroundColor: primaryColor }]}
          onPress={() => router.push('/login')}
        >
          <ThemedText style={styles.buttonText}>Iniciar Sesión</ThemedText>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: cardColor, borderWidth: 1, borderColor: primaryColor },
          ]}
          onPress={() => router.push('/register')}
        >
          <ThemedText style={[styles.buttonText, { color: primaryColor }]}>Registrarse</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

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
            {user.interests.map((interest: string) => (
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
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  listLoader: {
    marginTop: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});