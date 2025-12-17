import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function TemplateSelectionScreen({ navigation }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [aiOnly, setAiOnly] = useState(false);

  const categories = ['All', 'Restaurant', 'Events', 'Sales', 'Social'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const templates = [
    { id: '1', name: 'Modern Sale', color: '#3b82f6' },
    { id: '2', name: 'Event Flyer', color: '#8b5cf6' },
    { id: '3', name: 'Restaurant Menu', color: '#f59e0b' },
    { id: '4', name: 'Social Post', color: '#10b981' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Template</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.aiToggle}>
        <Text style={styles.aiLabel}>AI-Only Mode</Text>
        <TouchableOpacity
          style={[styles.toggle, aiOnly && styles.toggleActive]}
          onPress={() => setAiOnly(!aiOnly)}
        >
          <View style={[styles.toggleThumb, aiOnly && styles.toggleThumbActive]} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryBar}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        <View style={styles.templateGrid}>
          {templates.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={[styles.templateCard, selectedTemplate === template.id && styles.templateCardSelected]}
              onPress={() => setSelectedTemplate(template.id)}
            >
              <View style={[styles.templatePreview, { backgroundColor: template.color }]}>
                <Text style={styles.templateIcon}>🎨</Text>
              </View>
              <Text style={styles.templateName}>{template.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('PromptBrandInput')}>
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
  aiToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  aiLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e2e8f0',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#4f46e5',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },
  categoryBar: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#4f46e5',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  templateCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  templateCardSelected: {
    borderColor: '#4f46e5',
  },
  templatePreview: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  templateIcon: {
    fontSize: 40,
  },
  templateName: {
    padding: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
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
