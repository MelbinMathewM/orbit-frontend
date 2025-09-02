import HomeHero from '@/components/user/home-hero';
import HomeServices from '@/components/user/home-services';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView>
      <HomeHero />
      <HomeServices />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
