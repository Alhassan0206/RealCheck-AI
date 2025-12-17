import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function PreviewOutputScreen({ navigation }) {
  const [selectedDesign, setSelectedDesign] = useState(0);

  const designs = [
    { id: 0, color: '#4f46e5' },
    { id: 1, color: '#8b5cf6' },
    { id: 2, color: '#3b82f6' },
    { id: 3, color: '#10b981' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preview</Text>
        <TouchableOpacity>
          <Text style={styles.regenerate}>🔄 Regenerate</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.mainPreview, { backgroundColor: designs[selectedDesign].color }]}>
          <Text style={styles.previewIcon}>🎨</Text>
          <Text style={styles.previewText}>Generated Design {selectedDesign + 1}</Text>
        </View>

        <Text style={styles.variationsLabel}>Variations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.variations}>
          {designs.map((design) => (
            <TouchableOpacity
              key={design.id}
              style={[
                styles.variationCard,
                selectedDesign === design.id && styles.variationCardSelected
              ]}
              onPress={() => setSelectedDesign(design.id)}
            >
              <View style={[styles.variationPreview, { backgroundColor: design.color }]}>
                <Text style={styles.variationIcon}>🎨</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Editor')}>
          <Text style={styles.editText}>Edit Design</Text>
        </TouchableOpacity>
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
  regenerate: {
    fontSize: 12,
    color: '#4f46e5',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  mainPreview: {
    height: 400,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  previewIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  previewText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  variationsLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  variations: {
    flexDirection: 'row',
  },
  variationCard: {
    marginRight: 12,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  variationCardSelected: {
    borderColor: '#4f46e5',
  },
  variationPreview: {
    width: 80,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  variationIcon: {
    fontSize: 24,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  editButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  editText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
