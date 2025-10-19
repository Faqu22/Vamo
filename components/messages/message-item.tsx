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
          style={[styles.avatar, { marginLeft: 10, marginRight: 8 }]}
        />
      )}
      <ThemedView
        style={[
          styles.bubble,
          { backgroundColor: isMyMessage ? primaryColor : cardColor },
          isMyMessage ? styles.myMessageBubble : styles.otherMessageBubble,
        ]}
      >
        {!isMyMessage && (
          <ThemedText type="defaultSemiBold" style={[styles.senderName, { color: primaryColor }]}>
            {message.sender.name}
          </ThemedText>
        )}
        <ThemedText style={{ color: isMyMessage ? '#fff' : undefined }}>{message.content}</ThemedText>
        <ThemedText
          style={[
            styles.timestamp,
            { color: isMyMessage ? 'rgba(255,255,255,0.7)' : secondaryTextColor },
          ]}
        >
          {formatTimestamp(message.timestamp)}
        </ThemedText>
      </ThemedView>
      {isMyMessage && (
        <Image
          source={{ uri: message.sender.profilePictureUrl || 'https://i.pravatar.cc/100?u=default' }}
          style={[styles.avatar, { marginRight: 10, marginLeft: 8 }]}
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
    paddingHorizontal: 0,
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
  },
  bubble: {
    maxWidth: '80%', // Ajustado para dejar un poco más de espacio en los bordes
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, // Sombra más sutil
    shadowRadius: 1,
    elevation: 1,
    flexDirection: 'row', // Para alinear el texto y la hora
    flexWrap: 'wrap', // Permitir que el texto se envuelva
    alignItems: 'flex-end', // Alinear la hora en la parte inferior
  },
  myMessageBubble: {
    marginRight: 8,
    marginLeft: 'auto',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 2, // Esquina inferior derecha menos redondeada
  },
  otherMessageBubble: {
    marginLeft: 8,
    marginRight: 'auto',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 2, // Esquina inferior izquierda menos redondeada
    borderBottomRightRadius: 10,
  },
  senderName: {
    fontSize: 12,
    marginBottom: 2,
    width: '100%', // Asegura que el nombre ocupe su propia línea
  },
  timestamp: {
    fontSize: 10,
    marginLeft: 8, // Espacio entre el texto del mensaje y la hora
    marginTop: 2, // Pequeño margen superior para separar del texto
  },
});