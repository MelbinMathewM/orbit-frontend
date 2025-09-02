import { Image } from 'expo-image';
import { Platform, StyleSheet, Pressable } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function AboutScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E0F2FE', dark: '#1E293B' }}
      headerImage={
        <Image
          source={require('../../assets/images/services-airplane.jpg')}
          style={styles.headerImage}
          contentFit="cover"
        />
      }
    >
      {/* Title */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About ORBIT Travels</ThemedText>
      </ThemedView>

      {/* Intro */}
      <ThemedText style={styles.paragraph}>
        ORBIT Travels is committed to delivering safe, comfortable, and memorable travel
        experiences. From airport pickups to holiday tours, our goal is to make every journey
        seamless and stress-free.
      </ThemedText>

      {/* Collapsible Sections */}
      <Collapsible title="Our Mission">
        <ThemedText style={styles.paragraph}>
          To provide reliable and elegant transportation services tailored to every traveler’s need —
          whether for business, leisure, or spiritual journeys.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Our Vision">
        <ThemedText style={styles.paragraph}>
          To be the most trusted travel partner, known for excellence, innovation, and
          unforgettable experiences.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Why Choose Us">
        <ThemedText style={styles.paragraph}>✔️ Reliable drivers & coordinators</ThemedText>
        <ThemedText style={styles.paragraph}>✔️ Comfortable and well-maintained vehicles</ThemedText>
        <ThemedText style={styles.paragraph}>✔️ Affordable, transparent pricing</ThemedText>
        <ThemedText style={styles.paragraph}>✔️ 24/7 customer support</ThemedText>
      </Collapsible>

      <Collapsible title="Our Services">
        <ThemedText style={styles.paragraph}>
          We offer a wide range of services including airport transportation, wedding rides, holiday
          packages, sightseeing tours, and pilgrimage trips.
        </ThemedText>
      </Collapsible>

      {/* Call-to-Action */}
      <Pressable
        style={styles.ctaButton}
        onPress={() => alert('Contact us to know more!')}
      >
        <ThemedText style={styles.ctaText}>Contact Us</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 220,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 8,
    lineHeight: 20,
  },
  ctaButton: {
    marginTop: 20,
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  ctaText: {
    color: '#fff',
    fontWeight: '600',
  },
});
