import * as Haptics from 'expo-haptics';
import { Link, type LinkProps } from 'expo-router';
import { Pressable } from 'react-native';

export function HapticTab<T>({ href, ...rest }: LinkProps<T>) {
  return (
    <Link href={href} asChild>
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        {...rest}
      />
    </Link>
  );
}