import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ScanDetailScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Detail</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageIcon}>📄</Text>
          </View>
        </View>

        <View style={styles.resultBadge}>
          <Text style={styles.badgeIcon}>✅</Text>
          <Text style={styles.badgeText}>Authentic</Text>
        </View>

        <View style={styles.metadataSection}>
          <Text style={styles.sectionTitle}>Scan Details</Text>
          
          <View style={styles.metadataRow}>
            <Text style={styles.metadataLabel}>Scan ID</Text>
            <Text style={styles.metadataValue}>#166</Text>
          </View>
          
          <View style={styles.metadataRow}>
            <Text style={styles.metadataLabel}>Date</Text>
            <Text style={styles.metadataValue}>Dec 15, 2025</Text>
          </View>
          
          <View style={styles.metadataRow}>
            <Text style={styles.metadataLabel}>Confidence</Text>
            <Text style={styles.metadataValue}>94%</Text>
          </View>
          
          <View style={styles.metadataRow}>
            <Text style={styles.metadataLabel}>Category</Text>
            <Text style={styles.metadataValue}>Document</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.rescanButton}>
          <Text style={styles.rescanIcon}>🔄</Text>
          <Text style={styles.rescanText}>Re-run Scan</Text>
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
  content: {
    flex: 1,
    padding: 24,
  },
  imageContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    fontSize: 64,
  },
  resultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#86efac',
  },
  badgeIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#16a34a',
  },
  metadataSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  metadataLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  metadataValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  rescanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 16,
  },
  rescanIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  rescanText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
