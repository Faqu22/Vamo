import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useProfile } from '@/hooks/use-profile'; // To determine if the message is from the current user
import { useThemeColor } from '@/hooks/use-theme-color';
import { Message } from '@/types/message';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryTextColor = useThemeColor({}, 'icon');
  const { user: currentUser } = useProfile(); // Get current user profile

  const isMyMessage = currentUser?.name === message.sender.name; // Simple check for now

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={[styles.container, isMyMessage ? styles.myMessageContainer : styles.otherMessageContainer]}>
      {!isMyMessage && (
        <Image
          source={{ uri: message.sender.profilePictureUrl || 'https://i.pravatar.cc/100?u=default' }}
          style={styles.avatar}
        />
      )}
      <ThemedView style={[styles.bubble, { backgroundColor: isMyMessage ? primaryColor : cardColor }]}>
        {!isMyMessage && (
          <ThemedText type="defaultSemiBold" style={[styles.senderName, { color: isMyMessage ? '#fff' : primaryColor }]}>
            {message.sender.name}
          </ThemedText>
        )}
        <ThemedText style={{ color: isMyMessage ? '#fff' : undefined }}>{message.content}</ThemedText>
        <ThemedText style={[styles.timestamp, { color: isMyMessage ? 'rgba(255,255,255,0.7)' : secondaryTextColor }]}>
          {formatTimestamp(message.timestamp)}
        </ThemedText>
      </ThemedView>
      {isMyMessage && (
        <Image
          source={{ uri: message.sender.profilePictureUrl || 'https://i.pravatar.cc/100?u=default' }}
          style={styles.avatar}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 8,
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 0, // Establecido a 0 para un aspecto 100% rectangular
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  senderName: {
    fontSize: 12,
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
});