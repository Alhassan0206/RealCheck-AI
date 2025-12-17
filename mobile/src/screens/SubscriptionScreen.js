import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function SubscriptionScreen({ navigation }) {
  const plans = [
    { id: 'free', name: 'Free', price: '$0', credits: '10', current: false },
    { id: 'pro', name: 'Pro', price: '$9.99', credits: '100', current: true },
    { id: 'business', name: 'Business', price: '$29.99', credits: 'Unlimited', current: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.currentPlan}>
          <Text style={styles.currentLabel}>Current Plan</Text>
          <Text style={styles.currentName}>Pro</Text>
          <Text style={styles.currentRenewal}>Renews Jan 15, 2025</Text>
        </View>

        <Text style={styles.plansTitle}>All Plans</Text>
        {plans.map((plan) => (
          <View key={plan.id} style={[styles.planCard, plan.current && styles.currentPlanCard]}>
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              {plan.current && <Text style={styles.currentBadge}>Current</Text>}
            </View>
            <Text style={styles.planPrice}>{plan.price}<Text style={styles.planPeriod}>/month</Text></Text>
            <Text style={styles.planCredits}>{plan.credits} credits/month</Text>
            {!plan.current && (
              <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectText}>{plan.id === 'free' ? 'Downgrade' : 'Upgrade'}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentCard}>
            <Text style={styles.cardIcon}>💳</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.cardNumber}>•••• •••• •••• 4242</Text>
              <Text style={styles.cardExpiry}>Expires 12/26</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          </View>
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
  currentPlan: {
    backgroundColor: '#4f46e5',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  currentLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  currentName: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
    marginVertical: 8,
  },
  currentRenewal: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  plansTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  currentPlanCard: {
    borderColor: '#4f46e5',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  currentBadge: {
    backgroundColor: '#dbeafe',
    color: '#3b82f6',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
  },
  planPeriod: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  planCredits: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 16,
  },
  selectButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  selectText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4f46e5',
  },
  paymentSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
  },
  cardIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  cardExpiry: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  editLink: {
    color: '#4f46e5',
    fontSize: 14,
    fontWeight: '600',
  },
});
