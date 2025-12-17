import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function GenerationProcessingScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('PreviewOutput');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#8b5cf6" />
        </View>
        
        <Text style={styles.title}>Creating Your Design</Text>
        <Text style={styles.subtitle}>Our AI is generating multiple variations...</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>Generating • Please wait...</Text>
        </View>

        <View style={styles.providerCard}>
          <Text style={styles.providerLabel}>Powered by</Text>
          <View style={styles.providerRow}>
            <Text style={styles.providerIcon}>🤖</Text>
            <Text style={styles.providerName}>OpenAI GPT-Image</Text>
          </View>
        </View>

        <View style={styles.creditDeduction}>
          <Text style={styles.creditIcon}>⚡</Text>
          <Text style={styles.creditText}>5 credits will be deducted</Text>
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
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
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
    width: '40%',
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  providerCard: {
    backgroundColor: '#f8f9fc',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  providerLabel: {
    fontSize: 11,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  creditDeduction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  creditText: {
    fontSize: 13,
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
