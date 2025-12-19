import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FeatureHighlightsScreen({ navigation }) {
  const features = [
    {
      id: 1,
      title: 'New AI Models',
      description: 'Advanced authenticity detection with 98% accuracy',
      icon: '🤖'
    },
    {
      id: 2,
      title: 'New Templates',
      description: 'Professional poster designs now available',
      icon: '🎨'
    },
    {
      id: 3,
      title: 'Limited Offer',
      description: 'Get 100 extra credits this week only',
      icon: '🎁'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Feature Highlights</Text>
      </View>

      <View style={styles.content}>
        {features.map(feature => (
          <View key={feature.id} style={styles.featureCard}>
            <Text style={styles.icon}>{feature.icon}</Text>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDesc}>{feature.description}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.ctaButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.ctaText}>Got It</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 8
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000'
  },
  content: {
    padding: 16
  },
  featureCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  icon: {
    fontSize: 32,
    marginBottom: 8
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4
  },
  featureDesc: {
    fontSize: 14,
    color: '#666'
  },
  ctaButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center'
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
