import { useState } from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IconSymbol } from './icon-symbol';

interface SelectOption<T> {
  label: string;
  value: T;
}

interface SelectProps<T> {
  options: SelectOption<T>[];
  selectedValue: T;
  onValueChange: (value: T) => void;
  placeholder?: string;
}

export function Select<T extends string | number>({
  options,
  selectedValue,
  onValueChange,
  placeholder,
}: SelectProps<T>) {
  const [modalVisible, setModalVisible] = useState(false);
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'icon');
  const primaryColor = useThemeColor({}, 'primary');

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const handleSelect = (value: T) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <>
      <Pressable
        style={[styles.selectButton, { backgroundColor: cardColor, borderColor }]}
        onPress={() => setModalVisible(true)}
      >
        <ThemedText style={{ color: textColor }}>
          {selectedOption ? selectedOption.label : placeholder || 'Seleccionar...'}
        </ThemedText>
        <IconSymbol name="chevron.down" size={20} color={iconColor} />
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <Pressable>
            <ThemedView style={[styles.modalContainer, { backgroundColor: cardColor }]}>
              {options.map((option) => (
                <Pressable
                  key={option.value}
                  style={styles.option}
                  onPress={() => handleSelect(option.value)}
                >
                  <ThemedText
                    style={{
                      color: selectedValue === option.value ? primaryColor : textColor,
                      fontWeight: selectedValue === option.value ? 'bold' : 'normal',
                    }}
                  >
                    {option.label}
                  </ThemedText>
                </Pressable>
              ))}
            </ThemedView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    borderRadius: 12,
    padding: 10,
    maxHeight: '60%',
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});