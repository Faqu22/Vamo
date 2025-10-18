import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Platform, Pressable, type StyleProp, type TextStyle } from 'react-native';

export function ExternalLink({
  href,
  style,
  ...rest
}: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string; style?: StyleProp<TextStyle> }) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (e) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          e.preventDefault();
          // Open the link in an in-app browser.
          await WebBrowser.openBrowserAsync(href);
        }
      }}
    />
  );
}