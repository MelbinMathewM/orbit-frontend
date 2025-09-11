import HomeExclusive from '@/components/user/home/home-exclusive';
import HomeExplore from '@/components/user/home/home-explore';
import HomeHero from '@/components/user/home/home-hero';
import HomeServices from '@/components/user/home/home-services';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView>
      <HomeHero />
      <HomeServices />
      <HomeExclusive />
      <HomeExplore />
    </ScrollView>
  );
}
