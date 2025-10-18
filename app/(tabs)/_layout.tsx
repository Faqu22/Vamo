import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { VamoLogo } from '@/components/ui/vamo-logo';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: () => <VamoLogo />,
          tabBarIcon: ({ color, focused }) => <IconSymbol name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Mensajes',
          tabBarIcon: ({ color, focused }) => <IconSymbol name="message.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => <IconSymbol name="person.fill" color={color} />,
          headerRight: () => (
            <Pressable
              style={{ marginRight: 15 }}
              onPress={() => router.push('/edit-profile')}
            >
              <IconSymbol name="square.and.pencil" color={Colors[colorScheme].primary} />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}