import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function HistoryOverviewScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('scans');

  const scans = [
    { id: '388', title: 'Scanned Item #388', date: '12/15/2025', status: 'fake' },
    { id: '166', title: 'Scanned Item #166', date: '12/15/2025', status: 'authentic' },
  ];

  const designs = [
    { id: '1', title: 'Summer Sale Flyer', date: '12/14/2025', status: 'draft' },
  ];

  const items = activeTab === 'scans' ? scans : designs;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
        <TouchableOpacity onPress={() => navigation.navigate('BulkActions')}>
          <Text style={styles.selectButton}>Select</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'scans' && styles.activeTab]}
          onPress={() => setActiveTab('scans')}
        >
          <Text style={[styles.tabText, activeTab === 'scans' && styles.activeTabText]}>Scans</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'designs' && styles.activeTab]}
          onPress={() => setActiveTab('designs')}
        >
          <Text style={[styles.tabText, activeTab === 'designs' && styles.activeTabText]}>Designs</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.historyItem}
            onPress={() => navigation.navigate('HistoryDetail')}
          >
            <View style={styles.itemThumb}>
              <Text style={styles.thumbIcon}>{activeTab === 'scans' ? '📄' : '🎨'}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              item.status === 'fake' && styles.fakeBadge,
              item.status === 'authentic' && styles.authenticBadge,
              item.status === 'draft' && styles.draftBadge,
            ]}>
              <Text style={[
                styles.statusText,
                item.status === 'fake' && styles.fakeText,
                item.status === 'authentic' && styles.authenticText,
                item.status === 'draft' && styles.draftText,
              ]}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  selectButton: {
    color: '#4f46e5',
    fontSize: 14,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4f46e5',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  activeTabText: {
    color: '#4f46e5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  itemThumb: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  thumbIcon: {
    fontSize: 20,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1e293b',
  },
  itemDate: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  fakeBadge: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  authenticBadge: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  draftBadge: {
    backgroundColor: '#faf5ff',
    borderWidth: 1,
    borderColor: '#e9d5ff',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  fakeText: {
    color: '#dc2626',
  },
  authenticText: {
    color: '#16a34a',
  },
  draftText: {
    color: '#9333ea',
  },
});
