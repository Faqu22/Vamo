import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { InterestPill } from '@/components/ui/interest-pill';
import { updateUserProfile, userProfileData } from '../data/user';
import { useThemeColor } from '@/hooks/use-theme-color';
import { UserProfile } from '../types/user';

export default function EditProfileScreen() {
  const router = useRouter();
  const [editedUser, setEditedUser] = useState<UserProfile>({ ...userProfileData });

  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    const isNumeric = field === 'age';
    setEditedUser((prev: UserProfile) => ({
      ...prev,
      [field]: isNumeric ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    updateUserProfile(editedUser);
    router.back();
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <Stack.Screen
        options={{
          title: 'Editar Perfil',
          headerRight: () => (
            <Pressable onPress={handleSave}>
              <ThemedText style={{ color: primaryColor, fontWeight: 'bold' }}>Guardar</ThemedText>
            </Pressable>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Image source={{ uri: editedUser.profilePictureUrl }} style={styles.profilePicture} />
          <ThemedText style={{ color: primaryColor }}>Cambiar foto de perfil</ThemedText>
        </View>

        <View style={styles.form}>
          <ThemedText style={styles.label}>Nombre</ThemedText>
          <TextInput
            value={editedUser.name}
            onChangeText={(text) => handleInputChange('name', text)}
            style={[styles.input, { color: textColor, borderColor, backgroundColor: cardColor }]}
          />

          <ThemedText style={styles.label}>Apellido</ThemedText>
          <TextInput
            value={editedUser.lastName}
            onChangeText={(text) => handleInputChange('lastName', text)}
            style={[styles.input, { color: textColor, borderColor, backgroundColor: cardColor }]}
          />

          <ThemedText style={styles.label}>Edad</ThemedText>
          <TextInput
            value={String(editedUser.age)}
            onChangeText={(text) => handleInputChange('age', text)}
            keyboardType="numeric"
            style={[styles.input, { color: textColor, borderColor, backgroundColor: cardColor }]}
          />

          <ThemedText style={styles.label}>Biografía</ThemedText>
          <TextInput
            value={editedUser.bio}
            onChangeText={(text) => handleInputChange('bio', text)}
            multiline
            style={[
              styles.input,
              styles.textArea,
              { color: textColor, borderColor, backgroundColor: cardColor },
            ]}
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Intereses
          </ThemedText>
          <View style={styles.interestsContainer}>
            {editedUser.interests.map((interest: string) => (
              <InterestPill key={interest} label={interest} />
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
  },
});