import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function CreateEntryScreen({ navigation }) {
  const [selectedType, setSelectedType] = useState('poster');
  const [selectedRatio, setSelectedRatio] = useState('4:5');

  const types = [
    { id: 'poster', label: 'Poster', icon: '🖼️' },
    { id: 'flyer', label: 'Flyer', icon: '📄' },
  ];

  const ratios = ['1:1', '4:5', '9:16', '16:9'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Design</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Design Type</Text>
          <View style={styles.typeGrid}>
            {types.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[styles.typeCard, selectedType === type.id && styles.typeCardSelected]}
                onPress={() => setSelectedType(type.id)}
              >
                <Text style={styles.typeIcon}>{type.icon}</Text>
                <Text style={styles.typeLabel}>{type.label}</Text>
                {selectedType === type.id && <View style={styles.checkmark}><Text>✓</Text></View>}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aspect Ratio</Text>
          <View style={styles.ratioGrid}>
            {ratios.map((ratio) => (
              <TouchableOpacity
                key={ratio}
                style={[styles.ratioButton, selectedRatio === ratio && styles.ratioButtonSelected]}
                onPress={() => setSelectedRatio(ratio)}
              >
                <Text style={[styles.ratioText, selectedRatio === ratio && styles.ratioTextSelected]}>
                  {ratio}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Output Size</Text>
          <View style={styles.sizeCard}>
            <Text style={styles.sizeValue}>1080 × 1350 px</Text>
            <Text style={styles.sizeLabel}>Optimal for social media</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('TemplateSelection')}>
          <Text style={styles.continueText}>Continue</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  typeGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  typeCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  typeCardSelected: {
    borderColor: '#4f46e5',
    backgroundColor: '#f5f3ff',
  },
  typeIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  typeLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  checkmark: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratioGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  ratioButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  ratioButtonSelected: {
    borderColor: '#4f46e5',
    backgroundColor: '#4f46e5',
  },
  ratioText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
  },
  ratioTextSelected: {
    color: '#ffffff',
  },
  sizeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  sizeValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  sizeLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  continueButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
