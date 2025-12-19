import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

export default function ExportOptionsScreen({ visible, onClose, onSelect }) {
  const options = [
    { id: 'pdf', label: 'PDF', icon: '📄', format: 'PDF' },
    { id: 'png', label: 'PNG', icon: '🖼️', format: 'PNG' },
    { id: 'jpg', label: 'JPG', icon: '🖼️', format: 'JPG' },
    { id: 'email', label: 'Email', icon: '📧', format: 'Email' }
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.bottomSheet}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Export Design</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.optionsContainer}>
            {options.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionButton}
                onPress={() => {
                  onSelect?.(option.format);
                  onClose?.();
                }}
              >
                <Text style={styles.optionIcon}>{option.icon}</Text>
                <View style={styles.optionContent}>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                  <Text style={styles.optionDesc}>
                    {option.id === 'email' ? 'Send via email' : `Export as ${option.format}`}
                  </Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000'
  },
  closeButton: {
    fontSize: 24,
    color: '#999'
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0'
  },
  optionsContainer: {
    paddingHorizontal: 8,
    paddingTop: 8
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 4,
    borderRadius: 12
  },
  optionIcon: {
    fontSize: 28,
    marginRight: 12
  },
  optionContent: {
    flex: 1
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2
  },
  optionDesc: {
    fontSize: 12,
    color: '#999'
  },
  arrow: {
    fontSize: 20,
    color: '#ccc'
  },
  cancelButton: {
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center'
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF'
  }
});
