import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>🛡️</Text>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        <Text style={styles.title}>
          <Text style={styles.titleReal}>Real</Text>
          <Text style={styles.titleCheck}>Check</Text>
        </Text>
        <Text style={styles.subtitle}>Authenticity Scanner</Text>
      </View>
      
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5850EC" />
        <Text style={styles.loadingText}>Initializing AI Core...</Text>
      </View>
      
      <Text style={styles.version}>v2.4.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  iconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ffffff',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 60,
  },
  checkmark: {
    position: 'absolute',
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 8,
  },
  titleReal: {
    color: '#1e293b',
  },
  titleCheck: {
    color: '#5850EC',
  },
  subtitle: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  version: {
    position: 'absolute',
    bottom: 40,
    color: '#d1d5db',
    fontSize: 10,
    fontWeight: '500',
  },
});
