import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    icon: '📷',
    title: 'Scan Anything',
    description: 'Verify authenticity of products, documents, and images with AI-powered detection.'
  },
  {
    icon: '🎨',
    title: 'Create Designs',
    description: 'Generate stunning posters and flyers using AI or choose from professional templates.'
  },
  {
    icon: '💼',
    title: 'Brand Kits',
    description: 'Save your brand colors, logos, and fonts to apply consistently across all designs.'
  }
];

export default function WelcomeScreen({ onContinue, navigation }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      if (onContinue) {
        onContinue();
      }
      if (navigation) {
        navigation.navigate('SignIn');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.slideContainer}>
        <Text style={styles.icon}>{slides[currentSlide].icon}</Text>
        <Text style={styles.title}>{slides[currentSlide].title}</Text>
        <Text style={styles.description}>{slides[currentSlide].description}</Text>
      </View>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentSlide && styles.activeDot
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
        </Text>
      </TouchableOpacity>

      {currentSlide < slides.length - 1 && (
        <TouchableOpacity onPress={() => {
          if (onContinue) onContinue();
          if (navigation) navigation.navigate('SignIn');
        }}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}
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
  slideContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  icon: {
    fontSize: 80,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 24,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 48,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4f46e5',
    width: 24,
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: width - 48,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  skipText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
});
