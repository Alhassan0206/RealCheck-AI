import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function PromptBrandInputScreen({ navigation }) {
  const [prompt, setPrompt] = useState('');
  const [selectedBrandKit, setSelectedBrandKit] = useState(null);

  const brandKits = [
    { id: '1', name: 'My Business', colors: ['#4f46e5', '#8b5cf6'] },
    { id: '2', name: 'Summer Theme', colors: ['#f59e0b', '#ef4444'] },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Design Details</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Describe Your Design</Text>
          <TextInput
            style={styles.promptInput}
            placeholder="E.g., A summer sale poster with beach vibes and bold typography..."
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brand Kit (Optional)</Text>
          <View style={styles.brandKitList}>
            {brandKits.map((kit) => (
              <TouchableOpacity
                key={kit.id}
                style={[styles.brandKitCard, selectedBrandKit === kit.id && styles.brandKitCardSelected]}
                onPress={() => setSelectedBrandKit(selectedBrandKit === kit.id ? null : kit.id)}
              >
                <View style={styles.colorSwatches}>
                  {kit.colors.map((color, i) => (
                    <View key={i} style={[styles.swatch, { backgroundColor: color }]} />
                  ))}
                </View>
                <Text style={styles.brandKitName}>{kit.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.creditInfo}>
          <Text style={styles.creditIcon}>⚡</Text>
          <Text style={styles.creditText}>5 credits per generation</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.generateButton, !prompt && styles.generateButtonDisabled]}
          onPress={() => prompt && navigation.navigate('GenerationProcessing')}
          disabled={!prompt}
        >
          <Text style={styles.generateText}>Generate Design</Text>
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
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  promptInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  brandKitList: {
    gap: 12,
  },
  brandKitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  brandKitCardSelected: {
    borderColor: '#4f46e5',
    backgroundColor: '#f5f3ff',
  },
  colorSwatches: {
    flexDirection: 'row',
    marginRight: 12,
  },
  swatch: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginRight: 4,
  },
  brandKitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
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
  footer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  generateButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  generateButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  generateText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
