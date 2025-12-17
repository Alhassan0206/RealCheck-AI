import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ScanResultScreen({ navigation, route }) {
  const isAuthentic = route?.params?.isAuthentic ?? true;
  const confidence = isAuthentic ? 94 : 23;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ScanUpload')}>
          <Text style={styles.backButton}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Result</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.resultCard, isAuthentic ? styles.authenticCard : styles.fakeCard]}>
          <View style={styles.badgeContainer}>
            <Text style={styles.resultIcon}>{isAuthentic ? '✅' : '⚠️'}</Text>
            <Text style={[styles.resultLabel, isAuthentic ? styles.authenticText : styles.fakeText]}>
              {isAuthentic ? 'AUTHENTIC' : 'FAKE'}
            </Text>
          </View>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Confidence Score</Text>
            <Text style={[styles.scoreValue, isAuthentic ? styles.authenticText : styles.fakeText]}>
              {confidence}%
            </Text>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Analysis Breakdown</Text>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🔍</Text>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Image Integrity</Text>
              <Text style={styles.detailValue}>{isAuthentic ? 'No manipulation detected' : 'Manipulation detected'}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>📊</Text>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>AI Detection</Text>
              <Text style={styles.detailValue}>{isAuthentic ? 'Original content' : 'Synthetic elements found'}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🏷️</Text>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Metadata Check</Text>
              <Text style={styles.detailValue}>{isAuthentic ? 'Valid metadata' : 'Inconsistent metadata'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('ScanUpload')}>
            <Text style={styles.primaryButtonText}>Scan Another Item</Text>
          </TouchableOpacity>
          
          {!isAuthentic && (
            <TouchableOpacity style={styles.reportButton}>
              <Text style={styles.reportButtonText}>Report Item</Text>
            </TouchableOpacity>
          )}
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
  content: {
    flex: 1,
    padding: 24,
  },
  resultCard: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  authenticCard: {
    backgroundColor: '#f0fdf4',
    borderWidth: 2,
    borderColor: '#86efac',
  },
  fakeCard: {
    backgroundColor: '#fef2f2',
    borderWidth: 2,
    borderColor: '#fca5a5',
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
  },
  authenticText: {
    color: '#16a34a',
  },
  fakeText: {
    color: '#dc2626',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '800',
  },
  detailsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  detailIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 13,
    color: '#64748b',
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  reportButton: {
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  reportButtonText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '700',
  },
});
