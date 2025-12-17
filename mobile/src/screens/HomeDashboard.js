import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function HomeDashboard({ navigation }) {
  const recentActivity = [
    { id: '388', title: 'Scanned Item #388', date: '12/15/2025', status: 'fake', type: 'scan' },
    { id: '166', title: 'Scanned Item #166', date: '12/15/2025', status: 'authentic', type: 'scan' },
    { id: '1', title: 'Summer Sale Flyer', date: 'Design', status: 'draft', type: 'design' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AM</Text>
          </View>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>Alex Morgan</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('HomeSearch')}>
            <Text style={styles.iconText}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Notifications')}>
            <Text style={styles.iconText}>🔔</Text>
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.creditCard}>
          <Text style={styles.creditLabel}>Available Credits</Text>
          <View style={styles.creditAmount}>
            <Text style={styles.creditNumber}>44</Text>
            <Text style={styles.creditText}>credits</Text>
          </View>
          <TouchableOpacity style={styles.topUpButton} onPress={() => navigation.navigate('CreditStatus')}>
            <Text style={styles.topUpIcon}>⚡</Text>
            <Text style={styles.topUpText}>Top up credits</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.promoCard}>
          <View style={styles.promoIcon}>
            <Text>✨</Text>
          </View>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>New AI Model v2.0</Text>
            <Text style={styles.promoSubtitle}>Faster & more accurate scans</Text>
          </View>
          <Text style={styles.promoArrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Scan')}>
            <View style={[styles.actionIcon, { backgroundColor: '#3b82f6' }]}>
              <Text style={styles.actionIconText}>📷</Text>
            </View>
            <Text style={styles.actionTitle}>Scan Item</Text>
            <Text style={styles.actionSubtitle}>Check authenticity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Create')}>
            <View style={[styles.actionIcon, { backgroundColor: '#8b5cf6' }]}>
              <Text style={styles.actionIconText}>➕</Text>
            </View>
            <Text style={styles.actionTitle}>Create Design</Text>
            <Text style={styles.actionSubtitle}>AI Poster Maker</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <Text style={styles.viewAllText}>View All ›</Text>
            </TouchableOpacity>
          </View>

          {recentActivity.map((item) => (
            <TouchableOpacity key={item.id} style={styles.activityItem}>
              <View style={styles.activityThumb}>
                <Text style={styles.activityThumbIcon}>
                  {item.type === 'scan' ? '📄' : '🎨'}
                </Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activityDate}>{item.date}</Text>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#3b82f6',
    fontWeight: '700',
    fontSize: 16,
  },
  welcomeText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  creditCard: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
  },
  creditLabel: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  creditAmount: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  creditNumber: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: '800',
  },
  creditText: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  topUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  topUpIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  topUpText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  promoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4f46e5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  promoIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  promoSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  promoArrow: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 24,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  actionIconText: {
    fontSize: 24,
  },
  actionTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1e293b',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  recentSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  viewAllText: {
    color: '#3b82f6',
    fontWeight: '700',
    fontSize: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  activityThumb: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityThumbIcon: {
    fontSize: 20,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1e293b',
  },
  activityDate: {
    fontSize: 11,
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
