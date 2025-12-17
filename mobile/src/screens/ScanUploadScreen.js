import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ScanUploadScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Scan Item</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.uploadArea}>
          <Text style={styles.uploadIcon}>📷</Text>
          <Text style={styles.uploadTitle}>Upload Image</Text>
          <Text style={styles.uploadSubtitle}>Take a photo or choose from gallery</Text>
        </View>

        <View style={styles.options}>
          <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('ScanProcessing')}>
            <Text style={styles.optionIcon}>📸</Text>
            <Text style={styles.optionText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('ScanProcessing')}>
            <Text style={styles.optionIcon}>🖼️</Text>
            <Text style={styles.optionText}>Gallery</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Supported Formats</Text>
          <Text style={styles.infoText}>JPG, PNG, HEIC (max 10MB)</Text>
        </View>

        <View style={styles.creditInfo}>
          <Text style={styles.creditIcon}>⚡</Text>
          <Text style={styles.creditText}>1 credit per scan</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fc',
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  uploadArea: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    padding: 48,
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  options: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#4f46e5',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  optionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#64748b',
  },
  creditInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 12,
  },
  creditIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  creditText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
  },
});
