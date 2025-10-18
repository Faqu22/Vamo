import * as Haptics from 'expo-haptics';
import { Link, type LinkProps } from 'expo-router';
import { Pressable } from 'react-native';

// We omit props that Link might pass that conflict with Pressable's native types (like style/className/tabIndex on web)
type HapticTabProps = Omit<LinkProps, 'style' | 'className' | 'tabIndex'>;

export function HapticTab({ href, ...rest }: HapticTabProps) {
  return (
    <Link href={href} asChild>
      <Pressable
        onPress={(event) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          if (rest.onPress) {
            rest.onPress(event);
          }
        }}
        {...rest}
      />
    </Link>
  );
}