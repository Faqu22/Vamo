import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ConversationListItem } from '@/components/ui/conversation-list-item';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useConversations } from '@/hooks/use-conversations';
import { useAuth } from '@/contexts/auth-context';

export default function MessagesScreen() {
  const iconColor = useThemeColor({}, 'icon');
  const secondaryTextColor = useThemeColor({}, 'icon');
  const primaryColor = useThemeColor({}, 'primary');

  const { authenticated, isLoading: isLoadingAuth } = useAuth();
  const { conversations, isLoading: isLoadingConversations, isError: isErrorConversations } = useConversations();

  const handleConversationPress = (conversationId: string) => {
    // TODO: Navigate to chat detail screen
    console.log('Navigate to conversation:', conversationId);
  };

  if (isLoadingAuth || isLoadingConversations) {
    return (
      <ThemedView style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={primaryColor} />
      </ThemedView>
    );
  }

  if (!authenticated) {
    return (
      <ThemedView style={styles.centeredContainer}>
        <ThemedText type="subtitle" style={{ marginBottom: 20 }}>
          Inicia sesión para ver tus mensajes
        </ThemedText>
        <ThemedText style={{ textAlign: 'center', marginBottom: 30, paddingHorizontal: 20 }}>
          Necesitas iniciar sesión para acceder a tus conversaciones.
        </ThemedText>
        {/* Optionally add a login button here */}
      </ThemedView>
    );
  }

  if (isErrorConversations) {
    return (
      <ThemedView style={styles.centeredContainer}>
        <ThemedText>Error al cargar las conversaciones.</ThemedText>
      </ThemedView>
    );
  }

  if (!conversations || conversations.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.content}>
          <IconSymbol name="message.fill" size={80} color={iconColor} style={styles.icon} />
          <ThemedText type="title" style={styles.title}>
            No tenés chats activos
          </ThemedText>
          <ThemedText style={[styles.description, { color: secondaryTextColor }]}>
            Cuando te unas a un plan o crees uno nuevo, tus conversaciones aparecerán acá
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationListItem conversation={item} onPress={handleConversationPress} />
        )}
        contentContainerStyle={styles.listContentContainer}
      />
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
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  listContentContainer: {
    paddingVertical: 10,
  },
});