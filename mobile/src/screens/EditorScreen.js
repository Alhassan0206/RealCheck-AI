import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function EditorScreen({ navigation }) {
  const tools = [
    { id: 'text', icon: 'T', label: 'Text' },
    { id: 'image', icon: '🖼️', label: 'Image' },
    { id: 'shape', icon: '⬜', label: 'Shape' },
    { id: 'sticker', icon: '😀', label: 'Sticker' },
    { id: 'remove', icon: '✂️', label: 'Remove BG' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editor</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SaveShare')}>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.canvas}>
        <View style={styles.canvasContent}>
          <Text style={styles.canvasIcon}>🎨</Text>
          <Text style={styles.canvasText}>Your Design</Text>
          <Text style={styles.canvasHint}>Tap elements to edit</Text>
        </View>
      </View>

      <View style={styles.toolbar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.toolbarContent}>
          {tools.map((tool) => (
            <TouchableOpacity key={tool.id} style={styles.toolButton}>
              <Text style={styles.toolIcon}>{tool.icon}</Text>
              <Text style={styles.toolLabel}>{tool.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.layersPanel}>
        <Text style={styles.panelTitle}>Layers</Text>
        <View style={styles.layerItem}>
          <Text style={styles.layerIcon}>📝</Text>
          <Text style={styles.layerName}>Heading Text</Text>
        </View>
        <View style={styles.layerItem}>
          <Text style={styles.layerIcon}>🖼️</Text>
          <Text style={styles.layerName}>Background Image</Text>
        </View>
        <View style={styles.layerItem}>
          <Text style={styles.layerIcon}>⬜</Text>
          <Text style={styles.layerName}>Shape</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e293b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#0f172a',
  },
  closeButton: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  doneButton: {
    color: '#4f46e5',
    fontSize: 16,
    fontWeight: '700',
  },
  canvas: {
    flex: 1,
    margin: 16,
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvasContent: {
    alignItems: 'center',
  },
  canvasIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  canvasText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  canvasHint: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  toolbar: {
    backgroundColor: '#0f172a',
    paddingVertical: 12,
  },
  toolbarContent: {
    paddingHorizontal: 16,
  },
  toolButton: {
    alignItems: 'center',
    marginRight: 20,
    minWidth: 60,
  },
  toolIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  toolLabel: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '500',
  },
  layersPanel: {
    backgroundColor: '#0f172a',
    padding: 16,
    paddingBottom: 40,
  },
  panelTitle: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  layerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  layerIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  layerName: {
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '500',
  },
});
