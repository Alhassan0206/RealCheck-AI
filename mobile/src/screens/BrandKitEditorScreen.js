import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function BrandKitEditorScreen({ navigation }) {
  const [name, setName] = useState('My Brand Kit');
  const colors = ['#4f46e5', '#8b5cf6', '#c4b5fd', '#e2e8f0'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Brand Kit</Text>
        <TouchableOpacity>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Name</Text>
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            placeholder="Brand Kit Name"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Logo</Text>
          <TouchableOpacity style={styles.logoUpload}>
            <Text style={styles.uploadIcon}>📤</Text>
            <Text style={styles.uploadText}>Upload Logo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Colors</Text>
          <View style={styles.colorGrid}>
            {colors.map((color, i) => (
              <TouchableOpacity key={i} style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: color }]} />
                <Text style={styles.colorHex}>{color}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.addColorButton}>
              <Text style={styles.addColorIcon}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fonts</Text>
          <View style={styles.fontItem}>
            <Text style={styles.fontPreview}>Heading</Text>
            <Text style={styles.fontName}>Inter Bold</Text>
          </View>
          <View style={styles.fontItem}>
            <Text style={[styles.fontPreview, { fontWeight: 'normal' }]}>Body text</Text>
            <Text style={styles.fontName}>Inter Regular</Text>
          </View>
        </View>
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
  saveButton: {
    color: '#4f46e5',
    fontSize: 14,
    fontWeight: '700',
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
  nameInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  logoUpload: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e2e8f0',
  },
  uploadIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  colorSwatch: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginBottom: 8,
  },
  colorHex: {
    fontSize: 11,
    color: '#64748b',
    fontFamily: 'monospace',
  },
  addColorButton: {
    width: 72,
    height: 80,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e2e8f0',
  },
  addColorIcon: {
    fontSize: 24,
    color: '#94a3b8',
  },
  fontItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fontPreview: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  fontName: {
    fontSize: 13,
    color: '#64748b',
  },
});
