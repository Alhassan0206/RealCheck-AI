import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ScanErrorScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
      </View>

      <Text style={styles.errorTitle}>Analysis Failed</Text>
      <Text style={styles.errorMessage}>
        Could not analyze image. Try again.
      </Text>

      <View style={styles.suggestionBox}>
        <Text style={styles.suggestionTitle}>Tips for better results:</Text>
        <View style={styles.suggestionItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.suggestionText}>Ensure good lighting</Text>
        </View>
        <View style={styles.suggestionItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.suggestionText}>Keep image in focus</Text>
        </View>
        <View style={styles.suggestionItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.suggestionText}>Use high-quality images</Text>
        </View>
        <View style={styles.suggestionItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.suggestionText}>Avoid glare and reflections</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.retryButton}
        onPress={() => navigation.navigate('ScanUpload')}
      >
        <Text style={styles.retryText}>🔄 Retry Scan</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.homeButton}
        onPress={() => navigation.navigate('HomeDashboard')}
      >
        <Text style={styles.homeText}>← Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  iconContainer: {
    paddingTop: 80,
    alignItems: 'center',
    marginBottom: 24
  },
  errorIcon: {
    fontSize: 64
  },
  errorTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 32,
    lineHeight: 22
  },
  suggestionBox: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#EBF5FF',
    borderRadius: 12,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF'
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12
  },
  suggestionItem: {
    flexDirection: 'row',
    marginBottom: 8
  },
  bullet: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 12,
    fontWeight: 'bold'
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
    flex: 1
  },
  retryButton: {
    marginHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  homeButton: {
    marginHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24
  },
  homeText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600'
  }
});
