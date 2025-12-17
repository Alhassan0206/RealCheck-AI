import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function BrandKitListScreen({ navigation }) {
  const brandKits = [
    { id: '1', name: 'My Business', colors: ['#4f46e5', '#8b5cf6', '#c4b5fd'] },
    { id: '2', name: 'Summer Theme', colors: ['#f59e0b', '#ef4444', '#fbbf24'] },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Brand Kits</Text>
        <TouchableOpacity onPress={() => navigation.navigate('BrandKitEditor')}>
          <Text style={styles.addButton}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {brandKits.map((kit) => (
          <TouchableOpacity
            key={kit.id}
            style={styles.kitCard}
            onPress={() => navigation.navigate('BrandKitEditor')}
          >
            <View style={styles.colorSwatches}>
              {kit.colors.map((color, i) => (
                <View key={i} style={[styles.swatch, { backgroundColor: color }]} />
              ))}
            </View>
            <View style={styles.kitInfo}>
              <Text style={styles.kitName}>{kit.name}</Text>
              <Text style={styles.kitMeta}>{kit.colors.length} colors</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('BrandKitEditor')}>
          <Text style={styles.createIcon}>+</Text>
          <Text style={styles.createText}>Create New Brand Kit</Text>
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
  addButton: {
    color: '#4f46e5',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  kitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  colorSwatches: {
    flexDirection: 'row',
    marginRight: 16,
  },
  swatch: {
    width: 32,
    height: 32,
    borderRadius: 8,
    marginRight: 4,
  },
  kitInfo: {
    flex: 1,
  },
  kitName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  kitMeta: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  arrow: {
    fontSize: 24,
    color: '#94a3b8',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e2e8f0',
  },
  createIcon: {
    fontSize: 24,
    color: '#4f46e5',
    marginRight: 8,
  },
  createText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4f46e5',
  },
});
