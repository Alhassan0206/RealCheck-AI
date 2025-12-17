import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function CreditStatusScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Credit Status</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Credits</Text>
          <Text style={styles.balanceAmount}>44</Text>
          <Text style={styles.planText}>Pro Plan</Text>
        </View>

        <View style={styles.usageSection}>
          <Text style={styles.sectionTitle}>Usage This Month</Text>
          <View style={styles.usageBar}>
            <View style={[styles.usageProgress, { width: '56%' }]} />
          </View>
          <Text style={styles.usageText}>56 of 100 credits used</Text>
        </View>

        <View style={styles.breakdownSection}>
          <Text style={styles.sectionTitle}>Usage Breakdown</Text>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownIcon}>📷</Text>
            <Text style={styles.breakdownLabel}>Scans</Text>
            <Text style={styles.breakdownValue}>23 credits</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownIcon}>🎨</Text>
            <Text style={styles.breakdownLabel}>Designs</Text>
            <Text style={styles.breakdownValue}>28 credits</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownIcon}>🖼️</Text>
            <Text style={styles.breakdownLabel}>Background Removal</Text>
            <Text style={styles.breakdownValue}>5 credits</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy More Credits</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
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
  balanceCard: {
    backgroundColor: '#4f46e5',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  balanceAmount: {
    color: '#ffffff',
    fontSize: 56,
    fontWeight: '800',
    marginVertical: 8,
  },
  planText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  usageSection: {
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
  usageBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginBottom: 8,
  },
  usageProgress: {
    height: 8,
    backgroundColor: '#4f46e5',
    borderRadius: 4,
  },
  usageText: {
    fontSize: 12,
    color: '#64748b',
  },
  breakdownSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  breakdownIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  breakdownLabel: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  buyButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
