import { useHeaderHeight } from '@react-navigation/elements';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Importar useSafeAreaInsets
import { useSWRConfig } from 'swr';

import { MessageItem } from '@/components/messages/message-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useConversationDetails } from '@/hooks/use-conversation-details';
import { useThemeColor } from '@/hooks/use-theme-color';
import { fetcherPost } from '@/lib/axios';

export default function ConversationDetailScreen() {
  const { id } = useLocalSearchParams();
  const conversationId = typeof id === 'string' ? id : '';
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { conversation, isLoading, isError } = useConversationDetails(conversationId);
  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const primaryColor = useThemeColor({}, 'primary');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'icon');

  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets(); // Obtener los insets de área segura
  const keyboardVerticalOffset = Platform.OS === 'ios' ? headerHeight : 0;

  const sortedMessages = useMemo(() => {
    if (!conversation?.messages) return [];
    // Create a shallow copy before sorting to avoid mutating the original array from SWR cache
    return [...conversation.messages].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [conversation?.messages]);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || isSending) return;

    setIsSending(true);
    try {
      await fetcherPost(`/messaging/${conversationId}/messages`, { content: messageInput });
      setMessageInput('');
      mutate(`/messaging/${conversationId}`);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

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
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <FlatList
          data={sortedMessages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageItem message={item} />}
          contentContainerStyle={styles.messageList}
          inverted
        />

        <View
          style={[
            styles.inputContainer,
            { backgroundColor: cardColor, borderColor, paddingBottom: insets.bottom },
          ]}
        >
          <TextInput
            style={[styles.messageInput, { color: textColor }]}
            placeholder="Escribe un mensaje..."
            placeholderTextColor={iconColor}
            value={messageInput}
            onChangeText={setMessageInput}
            multiline
          />
          <Pressable onPress={handleSendMessage} disabled={isSending || !messageInput.trim()}>
            {isSending ? (
              <ActivityIndicator size="small" color={primaryColor} />
            ) : (
              <IconSymbol name="arrow.up.circle.fill" size={30} color={primaryColor} />
            )}
          </Pressable>
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
    justifyContent: 'flex-end',
    paddingBottom: 80,
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
    backgroundColor: 'transparent',
  },
});