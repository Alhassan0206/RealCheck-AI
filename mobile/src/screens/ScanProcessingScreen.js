import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function ScanProcessingScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const isAuthentic = Math.random() > 0.3;
      navigation.replace('ScanResult', { isAuthentic });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4f46e5" />
          <View style={styles.pulseRing} />
        </View>
        
        <Text style={styles.title}>Analyzing Image</Text>
        <Text style={styles.subtitle}>Our AI is checking for authenticity markers...</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>Processing • ETA ~10 seconds</Text>
        </View>

        <View style={styles.providerInfo}>
          <Text style={styles.providerLabel}>Powered by</Text>
          <Text style={styles.providerName}>Hive AI Forensics</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loaderContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  pulseRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'rgba(79, 70, 229, 0.2)',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 48,
  },
  progressBar: {
    width: '80%',
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#4f46e5',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  providerInfo: {
    alignItems: 'center',
  },
  providerLabel: {
    fontSize: 11,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  providerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  cancelButton: {
    paddingVertical: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  cancelText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
});
