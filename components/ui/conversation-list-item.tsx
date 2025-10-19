import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ConversationPreview } from '@/types/message';
import { IconSymbol } from './icon-symbol';

interface ConversationListItemProps {
  conversation: ConversationPreview;
  onPress: (conversationId: string) => void;
}

export function ConversationListItem({ conversation, onPress }: ConversationListItemProps) {
  const cardColor = useThemeColor({}, 'card');
  const secondaryTextColor = useThemeColor({}, 'icon');
  const primaryColor = useThemeColor({}, 'primary');
  const unreadBubbleColor = useThemeColor({}, 'primary'); // Use primary color for unread count bubble

  // Placeholder for conversation image (e.g., first participant's image or a default icon)
  // In a real app, you'd fetch this dynamically based on conversation.type or participants
<<<<<<< HEAD
  const conversationImage = conversation.type === 'PLAN'
=======
  const conversationImage = conversation.type === 'plan'
>>>>>>> faa00f36c436d6e0d4f2865aecae423ec57b8a3d
    ? 'https://via.placeholder.com/50' // Placeholder for plan image
    : 'https://via.placeholder.com/50'; // Placeholder for direct chat image

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString();
    }
  };

<<<<<<< HEAD
  const lastMessageText = conversation.last_message?.text || 'No hay mensajes aún'; // Handle null last_message
  const lastMessageTimestamp = conversation.last_message?.timestamp ? formatTimestamp(conversation.last_message.timestamp) : '';

=======
>>>>>>> faa00f36c436d6e0d4f2865aecae423ec57b8a3d
  return (
    <Pressable onPress={() => onPress(conversation.id)}>
      <ThemedView style={[styles.container, { backgroundColor: cardColor }]}>
        {/* Placeholder for conversation image/icon */}
        <View style={styles.imageContainer}>
          {/* For now, a generic icon or placeholder image */}
          <IconSymbol name="message.fill" size={30} color={secondaryTextColor} />
          {/* In a real app, you'd use Image with a dynamic source */}
          {/* <Image source={{ uri: conversationImage }} style={styles.image} /> */}
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <ThemedText type="defaultSemiBold" numberOfLines={1} style={styles.name}>
              {conversation.name}
            </ThemedText>
<<<<<<< HEAD
            {lastMessageTimestamp ? (
              <ThemedText style={[styles.timestamp, { color: secondaryTextColor }]}>
                {lastMessageTimestamp}
              </ThemedText>
            ) : null}
          </View>
          <View style={styles.footer}>
            <ThemedText numberOfLines={1} style={[styles.lastMessage, { color: secondaryTextColor }]}>
              {lastMessageText}
            </ThemedText>
            {conversation.unreadCount && conversation.unreadCount > 0 && (
=======
            <ThemedText style={[styles.timestamp, { color: secondaryTextColor }]}>
              {formatTimestamp(conversation.lastMessage.timestamp)}
            </ThemedText>
          </View>
          <View style={styles.footer}>
            <ThemedText numberOfLines={1} style={[styles.lastMessage, { color: secondaryTextColor }]}>
              {conversation.lastMessage.text}
            </ThemedText>
            {conversation.unreadCount > 0 && (
>>>>>>> faa00f36c436d6e0d4f2865aecae423ec57b8a3d
              <View style={[styles.unreadBubble, { backgroundColor: unreadBubbleColor }]}>
                <ThemedText style={styles.unreadText}>{conversation.unreadCount}</ThemedText>
              </View>
            )}
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0', // Placeholder background
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    flex: 1,
    marginRight: 10,
  },
  timestamp: {
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
  },
  unreadBubble: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginLeft: 10,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});