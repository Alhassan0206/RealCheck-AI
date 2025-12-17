import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function SaveShareScreen({ navigation }) {
  const exportFormats = [
    { id: 'png', label: 'PNG', icon: '🖼️', desc: 'High quality image' },
    { id: 'jpg', label: 'JPG', icon: '📷', desc: 'Compressed image' },
    { id: 'pdf', label: 'PDF', icon: '📄', desc: 'Print-ready format' },
  ];

  const shareOptions = [
    { id: 'instagram', icon: '📸', label: 'Instagram' },
    { id: 'facebook', icon: '📘', label: 'Facebook' },
    { id: 'twitter', icon: '🐦', label: 'Twitter' },
    { id: 'whatsapp', icon: '💬', label: 'WhatsApp' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Save & Share</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.previewCard}>
          <View style={styles.preview}>
            <Text style={styles.previewIcon}>🎨</Text>
          </View>
          <Text style={styles.previewLabel}>Summer Sale Flyer</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Export Format</Text>
          {exportFormats.map((format) => (
            <TouchableOpacity key={format.id} style={styles.formatCard}>
              <Text style={styles.formatIcon}>{format.icon}</Text>
              <View style={styles.formatInfo}>
                <Text style={styles.formatLabel}>{format.label}</Text>
                <Text style={styles.formatDesc}>{format.desc}</Text>
              </View>
              <Text style={styles.downloadIcon}>⬇️</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Share To</Text>
          <View style={styles.shareGrid}>
            {shareOptions.map((option) => (
              <TouchableOpacity key={option.id} style={styles.shareButton}>
                <Text style={styles.shareIcon}>{option.icon}</Text>
                <Text style={styles.shareLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveIcon}>💾</Text>
          <Text style={styles.saveText}>Save to Gallery</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  backButton: {
    color: '#4f46e5',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  previewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  preview: {
    width: 120,
    height: 150,
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  previewIcon: {
    fontSize: 40,
  },
  previewLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  formatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  formatIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  formatInfo: {
    flex: 1,
  },
  formatLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  formatDesc: {
    fontSize: 12,
    color: '#64748b',
  },
  downloadIcon: {
    fontSize: 20,
  },
  shareGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  shareButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '22%',
  },
  shareIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  shareLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748b',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 40,
  },
  saveIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  saveText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
