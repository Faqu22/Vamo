import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MessageItem } from '@/components/messages/message-item';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useConversationDetails } from '@/hooks/use-conversation-details';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function ConversationDetailScreen() {
  const { id } = useLocalSearchParams();
  const conversationId = typeof id === 'string' ? id : '';
  const router = useRouter();

  const { conversation, isLoading, isError } = useConversationDetails(conversationId);
  const [messageInput, setMessageInput] = useState('');

  const primaryColor = useThemeColor({}, 'primary');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'icon');

  if (isLoading) {
    return (
      <ThemedView style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={primaryColor} />
      </ThemedView>
    );
  }

  if (isError || !conversation) {
    return (
      <ThemedView style={styles.centeredContainer}>
        <ThemedText>Error al cargar la conversación.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: conversation.name,
          headerBackTitleVisible: false,
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Adjust offset for header
      >
        <FlatList
          data={conversation.messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageItem message={item} />}
          contentContainerStyle={styles.messageList}
          inverted // To show latest messages at the bottom
        />

        <View style={[styles.inputContainer, { backgroundColor: cardColor, borderColor }]}>
          <TextInput
            style={[styles.messageInput, { color: textColor }]}
            placeholder="Escribe un mensaje..."
            placeholderTextColor={iconColor}
            value={messageInput}
            onChangeText={setMessageInput}
            multiline
          />
          <IconSymbol name="arrow.up.circle.fill" size={30} color={primaryColor} />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  messageList: {
    paddingVertical: 10,
    flexGrow: 1,
    justifyContent: 'flex-end', // Align content to the bottom
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  messageInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: 'transparent', // Let parent control background
  },
});