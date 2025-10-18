import { useHeaderHeight } from '@react-navigation/elements';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { InterestPill } from '@/components/ui/interest-pill';
import { useProfile } from '@/hooks/use-profile';
import { useThemeColor } from '@/hooks/use-theme-color';
import { fetcherPatch, fetcherPost } from '@/lib/axios';
import { UserProfile } from '../types/user';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, isLoading, isError, mutate } = useProfile();
  const [editedUser, setEditedUser] = useState<UserProfile | null>(null);
  const [newInterest, setNewInterest] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');

  const headerHeight = useHeaderHeight();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? headerHeight : 0;

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
    }
  }, [user]);

  const handleInputChange = (field: keyof UserProfile, value: string | number | string[]) => {
    if (!editedUser) return;
    setEditedUser((prev) => ({
      ...(prev as UserProfile),
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!editedUser) return;
    try {
      // Actualización optimista: actualiza la UI localmente primero
      mutate(editedUser, false);
      await fetcherPatch('/profile/me', editedUser);
      // Vuelve a validar los datos con el servidor
      mutate();
      router.back();
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil.');
      // Revierte la actualización optimista en caso de error
      mutate(user, false);
    }
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Necesitamos acceso a tus fotos para continuar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      const uri = result.assets[0].uri;
      const formData = new FormData();
      const fileName = uri.split('/').pop() || 'photo.jpg';
      const fileType = `image/${fileName.split('.').pop()}`;

      formData.append('avatar', {
        uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
        name: fileName,
        type: fileType,
      } as any);

      try {
        const response = await fetcherPost('/profile/me/avatar', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.profilePictureUrl) {
          handleInputChange('profilePictureUrl', response.profilePictureUrl);
          if (user) {
            mutate({ ...user, profilePictureUrl: response.profilePictureUrl }, false);
          }
        }
      } catch (error) {
        console.error('Failed to upload image:', error);
        Alert.alert('Error', 'No se pudo subir la imagen.');
      }
    }
  };

  const handleAddInterest = () => {
    if (!editedUser) return;
    const trimmedInterest = newInterest.trim();
    if (trimmedInterest && !editedUser.interests.includes(trimmedInterest)) {
      handleInputChange('interests', [...editedUser.interests, trimmedInterest]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    if (!editedUser) return;
    const updatedInterests = editedUser.interests.filter(
      (interest) => interest !== interestToRemove
    );
    handleInputChange('interests', updatedInterests);
  };

  if (isLoading || !editedUser) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={primaryColor} />
      </ThemedView>
    );
  }

  if (isError) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ThemedText>Error al cargar el perfil.</ThemedText>
      </ThemedView>
    );
  }

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable style={styles.header} onPress={handlePickImage}>
            <Image source={{ uri: editedUser.profilePictureUrl }} style={styles.profilePicture} />
            <ThemedText style={{ color: primaryColor }}>Cambiar foto de perfil</ThemedText>
          </Pressable>

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
              onChangeText={(text) => handleInputChange('age', Number(text))}
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
                <InterestPill
                  key={interest}
                  label={interest}
                  onRemove={() => handleRemoveInterest(interest)}
                />
              ))}
            </View>
            <View style={styles.addInterestContainer}>
              <TextInput
                placeholder="Añadir interés"
                value={newInterest}
                onChangeText={setNewInterest}
                style={[
                  styles.input,
                  styles.addInterestInput,
                  { color: textColor, borderColor, backgroundColor: cardColor },
                ]}
                onSubmitEditing={handleAddInterest}
                onFocus={() => {
                  setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                  }, 100);
                }}
              />
              <Pressable
                onPress={handleAddInterest}
                style={[styles.addButton, { backgroundColor: primaryColor }]}
              >
                <ThemedText style={styles.addButtonText}>Añadir</ThemedText>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 150,
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
    marginBottom: 10,
  },
  addInterestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addInterestInput: {
    flex: 1,
    marginRight: 10,
    marginBottom: 0,
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});