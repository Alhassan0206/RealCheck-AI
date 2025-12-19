import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CounterfeitResultScreen({ navigation, route }) {
  const { confidence, metadata } = route?.params || { confidence: 15, metadata: {} };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.badgeContainer}>
        <View style={styles.redBadge}>
          <Text style={styles.badgeText}>⚠️</Text>
          <Text style={styles.badgeLabel}>FAKE</Text>
        </View>
      </View>

      <View style={styles.resultSection}>
        <Text style={styles.confidenceScore}>{confidence}%</Text>
        <Text style={styles.confidenceLabel}>Authenticity Score</Text>
      </View>

      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Counterfeit Detected</Text>
        <Text style={styles.warningText}>
          This item appears to be counterfeit based on our analysis. We recommend caution before making a purchase.
        </Text>
      </View>

      <View style={styles.detailsBox}>
        <Text style={styles.detailsTitle}>Analysis Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Authenticity:</Text>
          <Text style={styles.detailValue}>Low</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Risk Level:</Text>
          <Text style={styles.detailValue}>High</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.reportButton}
        onPress={() => alert('Report submitted')}
      >
        <Text style={styles.reportText}>📢 Report This Item</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('ScanUpload')}
      >
        <Text style={styles.backText}>Scan Another Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  badgeContainer: {
    paddingTop: 60,
    alignItems: 'center'
  },
  redBadge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFE5E5',
    borderWidth: 3,
    borderColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    fontSize: 48,
    marginBottom: 8
  },
  badgeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4444'
  },
  resultSection: {
    alignItems: 'center',
    marginVertical: 24
  },
  confidenceScore: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FF4444'
  },
  confidenceLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },
  warningBox: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#FFF3CD',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
    marginBottom: 16
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  warningText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20
  },
  detailsBox: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 24
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  detailLabel: {
    fontSize: 14,
    color: '#666'
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  reportButton: {
    marginHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12
  },
  reportText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  backButton: {
    marginHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24
  },
  backText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600'
  }
});
